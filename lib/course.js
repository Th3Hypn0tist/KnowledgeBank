"use strict";
(async function () {
 const mount=document.querySelector("[data-source]");
 if(!mount)return;
 const lang=new URLSearchParams(location.search).get("lang")==="en"?"en":"fi";
 document.documentElement.lang=lang;
 for(const a of document.querySelectorAll("[data-lang]")){if(a.dataset.lang===lang)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");}
 const el=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e;};
 const localized=v=>v?.[lang]??"";
 async function load(url,depth=0){
  if(depth>20)throw Error("Course tree too deep");
  const res=await fetch(url);if(!res.ok)throw Error(res.status+" "+url.pathname);
  const data=await res.json();
  if(!data.title||!Array.isArray(data.children))throw Error("Invalid course node: "+url.pathname);
  const children=await Promise.all(data.children.map(id=>{if(!/^[a-z0-9][a-z0-9-]*$/.test(id))throw Error("Invalid child ID");return load(new URL(id+"/index.json",url),depth+1);}));
  return {data,url,children};
 }
 function blocks(node,target){
  for(const b of node.data.content?.[lang]||[]){
   const section=el("section","kb-content-block");const copy=el("div");
   if(b.title)copy.append(el("h3",null,b.title));
   for(const p of b.paragraphs||[])copy.append(el("p",null,p));section.append(copy);
   if(b.image){section.classList.add("topic");const fig=el("figure");const img=el("img");img.src=new URL(b.image.src,node.url).href;img.alt=b.image.alt||"";img.loading="lazy";fig.append(img);if(b.image.caption)fig.append(el("figcaption",null,b.image.caption));section.append(fig);}
   target.append(section);
  }
 }
 function renderTree(nodes,nav,body,parents=[],nums=[]){
  const list=el("ol","kb-tree");nav.append(list);
  nodes.forEach((node,i)=>{
   const id=node.url.pathname.split("/").at(-2);const path=[...parents,id];const number=[...nums,i+1];const key=path.join("/");
   const li=el("li");list.append(li);const a=el("a",null,number.join(".")+" "+localized(node.data.title));a.href="#"+key;li.append(a);
   const sec=el("section","kb-node");sec.id=key;const heading=el("h"+Math.min(6,number.length+1),null,number.join(".")+" "+localized(node.data.title));sec.append(heading);
   blocks(node,sec);
   if(!node.data.content?.[lang]?.length&&!node.children.length)sec.append(el("p","fine-print",lang==="fi"?"Sisältö valmisteilla.":"Content pending."));
   body.append(sec);if(node.children.length)renderTree(node.children,li,sec,path,number);
  });
 }
 try{
  const root=await load(new URL(mount.dataset.source,location.href));document.title=localized(root.data.title)+" | KnowledgeBank";
  const hero=el("section","hero kb-hero");hero.append(el("span","eyebrow","KNOWLEDGEBANK / COURSE"),el("h1",null,localized(root.data.title)),el("p","lead",localized(root.data.description)));
  mount.replaceChildren(hero);blocks(root,mount);
  const layout=el("div","kb-course-layout"),nav=el("nav","kb-course-nav"),body=el("article","kb-course-content");nav.setAttribute("aria-label",lang==="fi"?"Kurssin sisältö":"Course contents");nav.append(el("h2",null,lang==="fi"?"Kurssin sisältö":"Course contents"));layout.append(nav,body);mount.append(layout);
  renderTree(root.children,nav,body);
  if(location.hash){const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));target?.scrollIntoView();}
 }catch(e){mount.replaceChildren(el("p","empty",(lang==="fi"?"Kurssin lataus epäonnistui: ":"Course loading failed: ")+e.message));}
})();
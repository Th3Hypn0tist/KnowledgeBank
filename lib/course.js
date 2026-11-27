"use strict";
(async function () {
 const mount=document.querySelector("[data-source]");
 if(!mount)return;
 const params=new URLSearchParams(location.search);
 const lang=params.get("lang")==="en"?"en":"fi";
 const course=params.get("course");
 document.documentElement.lang=lang;
 for(const a of document.querySelectorAll("[data-lang]")){const p=new URLSearchParams(location.search);p.set("lang",a.dataset.lang);a.href="?"+p.toString()+location.hash;if(a.dataset.lang===lang)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");}
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
   const section=el("section","kb-content-block");const copy=el("div","kb-card-copy");
   if(b.image){
    const fig=el("figure");const img=el("img");
    img.alt=b.image.alt||b.image.caption||b.title||"";
    img.loading="lazy";
    img.addEventListener("error",()=>{if(b.title&&!copy.querySelector("h3"))copy.prepend(el("h3",null,b.title));},{once:true});
    img.src=new URL(b.image.src,node.url).href;
    fig.append(img);section.append(fig);
    // Course diagrams contain their own visible title; do not repeat it.
   }else if(b.title)copy.append(el("h3",null,b.title));
   for(const p of b.paragraphs||[])copy.append(el("p",null,p));
   section.append(copy);target.append(section);
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
  const catalogueURL=new URL(mount.dataset.source,location.href);
  const response=await fetch(catalogueURL);if(!response.ok)throw Error(response.status+" "+catalogueURL.pathname);
  const catalogue=await response.json();
  if(!Array.isArray(catalogue.courses))throw Error("Invalid catalogue");
  if(!course){
   document.title="KnowledgeBank";
   const hero=el("section","hero kb-hero");hero.append(el("span","eyebrow","AIGM / KNOWLEDGEBANK"),el("h1",null,lang==="fi"?"Koulutukset":"Courses"));
   const list=el("div","directory-list");
   for(const [i,item] of catalogue.courses.entries()){
    if(!/^[a-z0-9][a-z0-9-]*$/.test(item.id))throw Error("Invalid course ID");
    const a=el("a","directory");const p=new URLSearchParams({course:item.id,lang});a.href="?"+p.toString();
    const top=el("div","directory-top");top.append(el("span","directory-number",String(i+1).padStart(2,"0")),el("span","directory-arrow","→"));
    const copy=el("div");copy.append(el("h2","directory-name",localized(item.title)),el("p","directory-summary",localized(item.description)));a.append(top,copy);list.append(a);
   }
   mount.replaceChildren(hero,list);return;
  }
  if(!/^[a-z0-9][a-z0-9-]*$/.test(course)||!catalogue.courses.some(c=>c.id===course))throw Error("Unknown course: "+course);
  const root=await load(new URL(course+"/index.json",catalogueURL));document.title=localized(root.data.title)+" | KnowledgeBank";
  const hero=el("section","hero kb-hero");hero.append(el("span","eyebrow","KNOWLEDGEBANK / COURSE"),el("h1",null,localized(root.data.title)),el("p","lead",localized(root.data.description)));
  mount.replaceChildren(hero);blocks(root,mount);
  const layout=el("div","kb-course-layout"),nav=el("nav","kb-course-nav"),body=el("article","kb-course-content");nav.setAttribute("aria-label",lang==="fi"?"Kurssin sisältö":"Course contents");nav.append(el("h2",null,lang==="fi"?"Kurssin sisältö":"Course contents"));layout.append(nav,body);mount.append(layout);
  renderTree(root.children,nav,body);
  if(location.hash){const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));target?.scrollIntoView();}
 }catch(e){mount.replaceChildren(el("p","empty",(lang==="fi"?"Kurssin lataus epäonnistui: ":"Course loading failed: ")+e.message));}
})();
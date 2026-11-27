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
  const cards=[];
  for(const b of node.data.content?.[lang]||[]){
   const section=el("section","kb-content-block");const copy=el("div","kb-card-copy");
   if(b.image){
    section.classList.add("kb-has-image");
    const fig=el("figure");const img=el("img");
    img.alt=b.image.alt||b.image.caption||b.title||"";
    img.loading="eager";
    img.decoding="async";
    img.addEventListener("error",()=>{fig.hidden=true;section.classList.remove("kb-has-image");if(b.title&&!copy.querySelector("h3"))copy.prepend(el("h3",null,b.title));},{once:true});
    img.src=new URL(b.image.src,node.url).href;
    fig.append(img);section.append(fig);
    // Course diagrams contain their own visible title; do not repeat it.
   }else if(b.title)copy.append(el("h3",null,b.title));
   for(const p of b.paragraphs||[])copy.append(el("p",null,p));
   section.append(copy);target.append(section);cards.push(section);
  }
  return cards;
 }
 // A single selected node is rendered. The tree and thumbnail strip share its route.
 function reader(root){
  const tr=(fi,en)=>lang==="fi"?fi:en;
  const index=new Map(),ordered=[];
  function register(node,parent=null,number=[]){
   const id=parent?node.url.pathname.split("/").at(-2):"";
   const key=parent?(parent.key?parent.key+"/"+id:id):"";
   if(index.has(key))throw Error("Repeated node: "+key);
   const entry={node,key,number,parent,group:null,children:[],order:ordered.length};
   entry.group=parent?(parent.parent?parent.group:entry):entry;
   index.set(key,entry);ordered.push(entry);
   entry.children=node.children.map((child,i)=>register(child,entry,[...number,i+1]));
   return entry;
  }
  const intro=register(root);
  const name=e=>localized(e.node.data.title);
  const label=e=>e===intro?tr("Johdanto","Introduction"):e.number.join(".")+" "+name(e);
  const route=(e,card=null)=>"#"+(e.key||"@intro")+(card===null?"":":"+(card+1));
  function selection(){
   let value="";
   try{value=decodeURIComponent(location.hash.slice(1));}catch(e){if(!(e instanceof URIError))throw e;}
   const match=value.match(/^(.*):([1-9]\d*)$/);
   const key=match?match[1]:value;
   const entry=index.get(key==="@intro"?"":key)||intro;
   const count=entry.node.data.content?.[lang]?.length||0;
   const requested=match?Number(match[2])-1:null;
   return {entry,card:requested!==null&&requested>=0&&requested<count?requested:null};
  }
  const anchor=(e,txt=label(e),card=null,cls=null)=>{
   const a=el("a",cls,txt);a.href=route(e,card);return a;
  };
  const reader=el("div","kb-reader"),bar=el("div","kb-reader-bar");
  const courseTitle=el("a","kb-reader-title",name(intro));courseTitle.href=route(intro);
  const crumb=el("nav","kb-breadcrumb");crumb.setAttribute("aria-label",tr("Sijainti kurssilla","Course location"));
  const actions=el("div","kb-reader-actions");
  const layout=el("div","kb-course-layout");
  const nav=el("nav","kb-course-nav"),body=el("article","kb-course-content"),visual=el("aside","kb-course-visual");
  nav.id="kb-outline";body.id="kb-reading";visual.id="kb-visual";
  nav.setAttribute("aria-label",tr("Kurssin sisältö","Course contents"));
  visual.setAttribute("aria-label",tr("Pääaiheen kuvat","Chapter diagrams"));
  const visualTitle=el("h2","kb-panel-heading");
  const visualList=el("div","kb-visual-list");
  visual.append(visualTitle,visualList);
  const navToggle=el("button","kb-panel-toggle",tr("Sisältö","Contents"));
  const visualToggle=el("button","kb-panel-toggle",tr("Kuvat","Diagrams"));
  for(const [button,id] of [[navToggle,nav.id],[visualToggle,visual.id]]){button.type="button";button.setAttribute("aria-controls",id);}
  actions.append(navToggle,visualToggle);bar.append(courseTitle,crumb,actions);
  layout.append(nav,body,visual);reader.append(bar,layout);
  mount.replaceChildren(reader);
  mount.closest(".shell")?.classList.add("kb-reader-shell");
  document.body.classList.add("kb-reader-active");
  const desktop=matchMedia("(min-width: 1100px)");
  let navOpen=desktop.matches,visualOpen=desktop.matches;
  function panels(){
   reader.classList.toggle("kb-nav-hidden",!navOpen);
   reader.classList.toggle("kb-visual-hidden",!visualOpen);
   navToggle.setAttribute("aria-expanded",String(navOpen));
   visualToggle.setAttribute("aria-expanded",String(visualOpen));
  }
  navToggle.addEventListener("click",()=>{navOpen=!navOpen;if(navOpen&&!desktop.matches)visualOpen=false;panels();});
  visualToggle.addEventListener("click",()=>{visualOpen=!visualOpen;if(visualOpen&&!desktop.matches)navOpen=false;panels();if(visualOpen)markCard(activeCard,true);});
  desktop.addEventListener("change",()=>{navOpen=desktop.matches;visualOpen=desktop.matches;panels();});
  panels();
  const treeLinks=new Map(),branches=new Map();
  nav.append(el("h2","kb-panel-heading",tr("Kurssin sisältö","Course contents")));
  const introLink=anchor(intro,label(intro),null,"kb-intro-link");
  nav.append(introLink);treeLinks.set(intro.key,introLink);
  function renderTree(entries,target){
   const list=el("ol","kb-tree");target.append(list);
   for(const entry of entries){
    const li=el("li"),row=el("div","kb-tree-row"),a=anchor(entry);
    li.append(row);list.append(li);treeLinks.set(entry.key,a);
    if(entry.children.length){
     const toggle=el("button","kb-tree-toggle","▸");toggle.type="button";
     const subtree=el("div","kb-tree-children");subtree.id="kb-branch-"+entry.order;
     toggle.setAttribute("aria-controls",subtree.id);
     const setOpen=open=>{
      subtree.hidden=!open;toggle.textContent=open?"▾":"▸";
      toggle.setAttribute("aria-expanded",String(open));
      toggle.setAttribute("aria-label",(open?tr("Sulje ","Collapse "):tr("Avaa ","Expand "))+name(entry));
     };
     setOpen(false);branches.set(entry.key,setOpen);
     toggle.addEventListener("click",()=>setOpen(subtree.hidden));
     row.append(toggle,a);li.append(subtree);renderTree(entry.children,subtree);
    }else row.append(el("span","kb-tree-spacer"),a);
   }
  }
  renderTree(intro.children,nav);
  let current=null,group=null,cards=[],thumbs=new Map(),activeCard=-1,renderVersion=0,frame=0;
  function reveal(container,item){
   if(!desktop.matches||!item||container.clientHeight===0)return;
   const p=container.getBoundingClientRect(),r=item.getBoundingClientRect();
   if(r.top<p.top+8)container.scrollTop+=r.top-p.top-8;
   else if(r.bottom>p.bottom-8)container.scrollTop+=r.bottom-p.bottom+8;
  }
  function markCard(i,ensure=false){
   const old=current&&thumbs.get(current.key+":"+activeCard);
   old?.removeAttribute("aria-current");
   activeCard=i;
   const a=current&&thumbs.get(current.key+":"+i);
   if(a){a.setAttribute("aria-current","location");if(ensure)reveal(visual,a);}
  }
  function renderVisual(entry){
   visualList.replaceChildren();thumbs=new Map();
   visualTitle.textContent=entry===intro?tr("Johdannon kuvat","Introduction diagrams"):label(entry);
   // Root introduction is its own group, never the whole course.
   const entries=entry===intro?[intro]:ordered.filter(e=>e.group===entry);
   for(const e of entries){
    const imageBlocks=(e.node.data.content?.[lang]||[]).map((b,i)=>({b,i})).filter(x=>x.b.image);
    if(!imageBlocks.length)continue;
    const section=el("section","kb-visual-group");
    if(e!==entry)section.append(el("h3",null,label(e)));
    for(const {b,i} of imageBlocks){
     const a=anchor(e,undefined,i,"kb-thumbnail");a.replaceChildren();
     const description=b.image.alt||b.image.caption||b.title||name(e);
     a.title=label(e)+" — "+description;
     a.setAttribute("aria-label",a.title);
     const img=el("img");img.alt=description;img.loading="lazy";img.decoding="async";
     img.addEventListener("error",()=>a.classList.add("kb-thumb-error"),{once:true});
     img.src=new URL(b.image.src,e.node.url).href;
     a.append(img,el("span","kb-thumb-fallback",description));
     section.append(a);thumbs.set(e.key+":"+i,a);
    }
    visualList.append(section);
   }
   if(!thumbs.size)visualList.append(el("p","fine-print",tr("Ei kuvia.","No diagrams.")));
   visual.scrollTop=0;
  }
  function renderBody(entry){
   body.replaceChildren();
   const section=el("section","kb-node kb-selected-node");
   section.append(el("h1",null,label(entry)));
   if(entry===intro&&localized(entry.node.data.description))section.append(el("p","lead",localized(entry.node.data.description)));
   cards=blocks(entry.node,section);
   if(!cards.length&&!entry.children.length)section.append(el("p","fine-print",tr("Sisältö valmisteilla.","Content pending.")));
   if(entry.children.length){
    const sub=el("div","kb-subtopics");sub.append(el("h2",null,tr("Aliaiheet","Subtopics")));
    for(const child of entry.children)sub.append(anchor(child));
    section.append(sub);
   }
   const pager=el("nav","kb-reader-pager");pager.setAttribute("aria-label",tr("Edellinen ja seuraava aihe","Previous and next topic"));
   const prev=ordered[entry.order-1],next=ordered[entry.order+1];
   pager.append(prev?anchor(prev,"← "+label(prev)):el("span"),next?anchor(next,label(next)+" →"):el("span"));
   section.append(pager);body.append(section);
  }
  function renderCrumb(entry){
   crumb.replaceChildren();const path=[];
   for(let e=entry;e&&e!==intro;e=e.parent)path.unshift(e);
   if(!path.length){crumb.append(el("span",null,label(intro)));return;}
   for(const e of path){
    if(e!==path[0])crumb.append(el("span","kb-crumb-separator","/"));
    if(e===entry){const s=el("span",null,label(e));s.setAttribute("aria-current","page");crumb.append(s);}
    else crumb.append(anchor(e,label(e)));
   }
  }
  function scrollToSelection(card){
   if(card!==null&&cards[card]){
    if(desktop.matches)body.scrollTop+=cards[card].getBoundingClientRect().top-body.getBoundingClientRect().top-12;
    else cards[card].scrollIntoView({block:"start"});
   }else if(desktop.matches)body.scrollTop=0;
   else body.scrollIntoView({block:"start"});
  }
  function show(initial=false){
   const {entry,card}=selection(),changed=entry!==current;
   const version=++renderVersion;
   if(changed){
    if(current)treeLinks.get(current.key)?.removeAttribute("aria-current");
    markCard(-1);
    current=entry;
    for(let e=entry;e&&e!==intro;e=e.parent)branches.get(e.key)?.(true);
    const selected=treeLinks.get(entry.key);selected?.setAttribute("aria-current","page");
    reveal(nav,selected);renderCrumb(entry);renderBody(entry);
    document.title=(entry===intro?name(intro):name(entry)+" | "+name(intro))+" | KnowledgeBank";
   }
   if(group!==entry.group){group=entry.group;renderVisual(group);}
   markCard(card??(cards.length?0:-1),true);
   if(!initial&&!desktop.matches){navOpen=false;visualOpen=false;panels();}
   if(initial&&card===null&&entry===intro)return;
   requestAnimationFrame(()=>{if(version===renderVersion)scrollToSelection(card);});
  }
  // Update only thumbnail selection while reading; do not rewrite browser history on scroll.
  function syncCard(){
   frame=0;if(!cards.length||!current)return;
   const top=desktop.matches?body.getBoundingClientRect().top+24:24;
   const i=cards.findIndex(c=>c.getBoundingClientRect().bottom>top);
   const next=i<0?cards.length-1:i;
   if(next!==activeCard)markCard(next,true);
  }
  function scheduleSync(){if(!frame)frame=requestAnimationFrame(syncCard);}
  body.addEventListener("scroll",scheduleSync,{passive:true});
  window.addEventListener("scroll",scheduleSync,{passive:true});
  reader.addEventListener("click",event=>{
   const a=event.target.closest("a[href^='#']");
   if(a&&a.hash===location.hash&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey&&!event.altKey&&event.button===0){
    event.preventDefault();show();
   }
  });
  window.addEventListener("hashchange",()=>show());
  show(true);
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
  reader(root);
 }catch(e){mount.replaceChildren(el("p","empty",(lang==="fi"?"Kurssin lataus epäonnistui: ":"Course loading failed: ")+e.message));}
})();

"use strict";
// Compact only the flat, generated KnowledgeBank diagram format.
// Move whole elements; never scale text, shapes, arrows or stroke widths.
function compactPair(svgs){
 const attrs=s=>Object.fromEntries([...s.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m=>[m[1],m[2]]));
 const number=v=>{if(v===undefined||!/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(v))throw Error("Unsupported numeric attribute: "+v);return Number(v);};
 function parse(s){
  const m=s.match(/^([\s\S]*?<\/defs>\s*)(<rect\b[^>]*\/>)(\s*<g\b[^>]*>)([\s\S]*?)(<\/g>\s*<\/svg>\s*)$/);
  if(!m)throw Error("Unsupported SVG structure");
  const vb=m[1].match(/viewBox="0 0 (\d+) (\d+)"/);if(!vb)throw Error("Unsupported viewBox");
  const w=+vb[1],h=+vb[2],bg=attrs(m[2]);
  if(number(bg.width)!==w||number(bg.height)!==h||+(bg.x||0)!==0||+(bg.y||0)!==0)throw Error("Unsupported background");
  const re=/<(?:rect|path)\b[^>]*\/>|<text\b[^>]*>[\s\S]*?<\/text>/g;
  const items=[...m[4].matchAll(re)].map(match=>{
   const raw=match[0],tag=raw.match(/^<(\w+)/)[1],a=attrs(raw.slice(0,raw.indexOf(">")+1));
   let lo,hi;
   if(tag==="rect"){const y=number(a.y||"0");lo=y-2;hi=y+number(a.height)+2;}
   else if(tag==="text"){
    const y=number(a.y),size=number(a["font-size"]);let last=y;
    lo=y-size*1.15;hi=y+size*.4;
    for(const span of raw.matchAll(/<tspan\b([^>]*)>/g)){
     const sa=attrs(span[1]);if(sa["font-size"]||sa.transform)throw Error("Unsupported tspan");
     last=sa.y===undefined?last+number(sa.dy||"0"):number(sa.y)+number(sa.dy||"0");
     lo=Math.min(lo,last-size*1.15);hi=Math.max(hi,last+size*.4);
    }
   }else{
    const d=a.d||"",commands=[...d.matchAll(/([MHVLZ])([^MHVLZ]*)/g)];
    if(!commands.length||commands.map(c=>c[0]).join("")!==d)throw Error("Unsupported path: "+d);
    const ys=[];let y=0,start=0;
    for(const c of commands){
     const str=c[2].trim(),nums=str?str.split(/[\s,]+/).map(number):[];
     if(c[1]==="M"||c[1]==="L"){if(nums.length!==2)throw Error("Unsupported path coordinates");y=nums[1];if(c[1]==="M")start=y;ys.push(y);}
     else if(c[1]==="V"){if(nums.length!==1)throw Error("Unsupported V");y=nums[0];ys.push(y);}
     else if(c[1]==="H"){if(nums.length!==1)throw Error("Unsupported H");ys.push(y);}
     else{if(nums.length)throw Error("Unsupported Z");y=start;ys.push(y);}
    }
    if(!ys.length)throw Error("Empty path");
    const pad=a["marker-start"]||a["marker-end"]?14:3;lo=Math.min(...ys)-pad;hi=Math.max(...ys)+pad;
   }
   let offset=0;
   if(a.transform){const tr=a.transform.match(/^translate\(0 (-?\d+)\)$/);if(!tr)throw Error("Unsupported transform");offset=+tr[1];}
   return {raw,lo:lo+offset,hi:hi+offset,offset};
  });
  if(!items.length||m[4].replace(re,"").trim())throw Error("Unparsed SVG body");
  return {m,w,h,items};
 }
 const parsed=svgs.map(parse);const {w,h}=parsed[0];
 if(parsed.some(p=>p.w!==w||p.h!==h))throw Error("Language dimensions differ");
 const ranges=parsed.flatMap(p=>p.items.map(e=>[e.lo,e.hi])).sort((a,b)=>a[0]-b[0]);
 const merged=[];
 for(const r of ranges){const last=merged.at(-1);if(last&&r[0]<=last[1])last[1]=Math.max(last[1],r[1]);else merged.push([...r]);}
 const gaps=[];
 for(let i=1;i<merged.length;i++){const cut=Math.floor(merged[i][0]-merged[i-1][1]-22);if(cut>0)gaps.push({at:merged[i][0],cut});}
 const removed=gaps.reduce((sum,g)=>sum+g.cut,0);
 const height=Math.min(h,Math.ceil(merged.at(-1)[1]-removed+18));
 if(height>=h)return {svgs,oldHeight:h,height:h};
 function render(p){
  const {m}=p;
  const body=p.items.map(e=>{
   const shift=gaps.filter(g=>e.lo>=g.at).reduce((sum,g)=>sum+g.cut,0);
   if(!shift)return e.raw;
   const offset=e.offset-shift;
   const raw=e.raw.replace(/ transform="translate\(0 -?\d+\)"/,"");
   return raw.replace(/^<(\w+)/,'<$1 transform="translate(0 '+offset+')"');
  }).join("");
  return m[1].replace(/viewBox="0 0 \d+ \d+"/,'viewBox="0 0 '+w+' '+height+'"')+m[2].replace(/height="\d+"/,'height="'+height+'"')+m[3]+body+m[5];
 }
 return {svgs:parsed.map(render),oldHeight:h,height};
}
if(typeof module!=="undefined"&&require.main===module){
 const fs=require("node:fs"),path=require("node:path");
 const root=path.join(__dirname,"..","bank");
 const groups=new Map();
 function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(/-(fi|en)\.svg$/.test(e.name)){const key=p.replace(/-(fi|en)\.svg$/,"");if(!groups.has(key))groups.set(key,[]);groups.get(key).push(p);}}}
 walk(root);let changed=0,old=0,now=0;const pending=[];
 for(const [key,files] of groups){if(files.length!==2)throw Error("Missing language pair: "+key);const result=compactPair(files.map(p=>fs.readFileSync(p,"utf8")));old+=result.oldHeight;now+=result.height;if(result.height<result.oldHeight){changed+=2;files.forEach((p,i)=>pending.push([p,result.svgs[i]]));}}
 if(process.argv.includes("--write"))for(const [p,s] of pending)fs.writeFileSync(p,s);
 console.log(JSON.stringify({pairs:groups.size,changed,oldHeight:old,newHeight:now,write:process.argv.includes("--write")}));
}

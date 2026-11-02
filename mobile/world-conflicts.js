// world-conflicts on a phone: touch buttons (prev / pause / next / overview), a collapsible dossier sheet, and map
// fits that leave room for the strip at the top and the sheet at the bottom (or right, in landscape).
(()=>{const M=window.M;if(!M||typeof go!=='function')return;const R=document.documentElement,dos=document.getElementById('dos'),its=document.getElementById('items');
 // chip numbers come from CSS (data-n), the name node stays as it is
 [...its.children].forEach((e,i)=>e.dataset.n=String(i+1).padStart(2,'0'));
 [...its.children].forEach(e=>{const d=e.children[1];if(d)d.dataset.n=e.dataset.n});
 // sheet: a tap anywhere on a collapsed sheet opens it; on an open sheet only the top bar closes it
 dos.addEventListener('click',e=>{if(!M.on)return;const open=dos.classList.contains('m-open');
  if(!open){dos.classList.add('m-open');dos.scrollTop=0}else if(e.target.closest('.a')){dos.classList.remove('m-open');dos.scrollTop=0}});
 // keep the active chip in view, mark overview mode (labels show numbers only)
 const so=setOn;setOn=function(i){so(i);if(!M.on)return;R.classList.toggle('m-ov',i<0);if(i<0)return;const c=its.children[i];if(c)its.scrollTo({left:c.offsetLeft-(its.clientWidth-c.offsetWidth)/2,behavior:'smooth'})};
 const prev=()=>go(cur<=-1?T.length-1:cur-1);
 let keyed=false,patched=false;
 // map padding from the phone layout: top below the progress strip, bottom above the sheet (collapsed size), right of it in landscape
 function pads(theatre){const top=document.getElementById('bot').getBoundingClientRect().bottom+12,r=dos.getBoundingClientRect();
  const collapsedH=dos.classList.contains('m-open')?Math.min(r.height,innerHeight*.3):r.height;
  if(M.portrait){const bot=Math.min(innerHeight*.45,collapsedH+(innerHeight-r.bottom))+14;return{paddingTopLeft:[theatre?24:14,top+(theatre?16:0)],paddingBottomRight:[theatre?110:44,bot]}}
  return{paddingTopLeft:[theatre?24:14,top+(theatre?16:0)],paddingBottomRight:[(innerWidth-r.left)+(theatre?100:44),58]}}
 function patch(){if(patched||!map)return;patched=true;const fly=map.flyToBounds.bind(map),fit=map.fitBounds.bind(map);
  map.flyToBounds=(b,o={})=>fly(b,M.on?Object.assign({},o,pads(!!o.maxZoom)):o);map.fitBounds=(b,o={})=>fit(b,M.on?Object.assign({},o,pads(!!o.maxZoom)):o);
  apply(true)}
 function apply(refit){if(!map)return;map.setMinZoom(M.on?1:2);if(!M.on)return;
  // marker labels: wrap the name so the overview can hide it
  marks.forEach(m=>{const l=m.getElement()&&m.getElement().querySelector('.lb');if(l&&!l.querySelector('.m-nm')){const t=l.textContent,k=t.indexOf(' ');l.innerHTML=`${t.slice(0,k)}<span class=m-nm>${t.slice(k)}</span>`}});
  if(refit)go(cur)}
 M.watch(on=>{if(on&&!keyed){keyed=true;M.keys([['◀',prev,'Previous theatre'],['❚❚',b=>{M.key(' ');b.textContent=paused?'PLAY':'❚❚'},'Pause / resume'],['▶',()=>next(),'Next theatre'],['ALL','o','Global overview']])}
  if(!on)dos.classList.remove('m-open');R.classList.toggle('m-ov',on&&cur<0);if(patched)apply(true)});
 (function wait(){if(map)patch();else setTimeout(wait,150)})()})();

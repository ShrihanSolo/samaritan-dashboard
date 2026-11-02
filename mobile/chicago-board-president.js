// chicago-board-president on a phone: px sizes for the panels' inline vh/vw styles, swipe and touch buttons for
// prev / pause / next, a ballot overlay, a collapsible assessment sheet, and the active tab kept in view.
(()=>{const M=window.M;if(!M||typeof go!=='function'||typeof P==='undefined')return;const R=document.documentElement,$$=id=>document.getElementById(id);
 // inline sizes were written for a 1050 px tall screen: fonts keep a readable floor, other lengths shrink
 const fpx=v=>v<=1.1?10.5:v<2?Math.max(11,v*8.6):17+(v-2)*5.5,r1=n=>Math.round(n*10)/10;
 const conv=root=>root.querySelectorAll('[style]').forEach(e=>{const s=e.getAttribute('style');if(!/v[hw]/.test(s))return;
  e.setAttribute('style',s.replace(/(font:\s*(?:\d{3}\s+)?)([\d.]+)vh/g,(m,a,v)=>a+r1(fpx(+v))+'px').replace(/(font-size:\s*)([\d.]+)vh/g,(m,a,v)=>a+r1(fpx(+v))+'px')
   .replace(/([\d.]+)vh/g,(m,v)=>r1(v*7)+'px').replace(/([\d.]+)vw/g,(m,v)=>r1(v*8)+'px'))});
 // every panel: tag #body with the panel index (for the per-panel CSS) and convert its sizes on a phone
 P.forEach((p,i)=>{const d=p.draw;p.draw=function(b){b.className=M.on?'m-p'+i:'';d.call(this,b);if(M.on){conv(b);b.scrollTop=0;b.scrollLeft=0}}});
 const tabs=$$('tabs'),dos=$$('dos'),body=$$('body');
 const g0=go;go=function(i){g0(i);if(!M.on)return;const t=tabs.children[i];if(t)tabs.scrollTo({left:t.offsetLeft-(tabs.clientWidth-t.offsetWidth)/2,behavior:'smooth'})};
 // swipe on the stage: left = next, right = previous (not while the panel itself can scroll sideways, or on the tab strip)
 let sx=0,sy=0,st=0;const stage=$$('stage');
 stage.addEventListener('touchstart',e=>{const t=e.touches[0];sx=t.clientX;sy=t.clientY;st=e.touches.length===1&&!e.target.closest('#tabs')&&!(e.target.closest('#body')&&body.scrollWidth>body.clientWidth+2)},{passive:true});
 stage.addEventListener('touchend',e=>{if(!st||!M.on)return;const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;st=0;
  if(Math.abs(dx)>60&&Math.abs(dx)>2*Math.abs(dy))M.key(dx<0?'ArrowRight':'ArrowLeft')},{passive:true});
 // assessment sheet: tap a collapsed sheet to open it, tap its top bar to close (portrait only)
 dos.addEventListener('click',e=>{if(!M.on||!M.portrait)return;if(!dos.classList.contains('m-open')){dos.classList.add('m-open');dos.scrollTop=0}
  else if(e.target.closest('.a')){dos.classList.remove('m-open');dos.scrollTop=0}});
 // ballot overlay
 let bb=null;const ballot=v=>{R.classList.toggle('m-ballot',v);if(bb)bb.classList.toggle('on',v);if(v)$$('left').scrollTop=0};
 $$('left').querySelector('.a').addEventListener('click',()=>{if(M.on)ballot(false)});
 let keyed=false,leftDone=false,was=false;
 M.watch(on=>{if(on){if(!leftDone){leftDone=true;conv($$('left'))}
   if(!keyed){keyed=true;const bar=M.keys([['◀','ArrowLeft','Previous panel'],['❚❚',b=>{M.key(' ');b.textContent=paused?'PLAY':'❚❚'},'Pause / resume'],['▶','ArrowRight','Next panel'],['BALLOT',()=>ballot(!R.classList.contains('m-ballot')),'Candidates and countdown']]);bb=bar.lastChild}}
  else{ballot(false);dos.classList.remove('m-open')}
  if((on||was)&&cur>=0)go(cur);was=on})})();

/* us-weather on a phone: re-lays the map frame and canvas (the page sizes them from innerWidth/innerHeight), puts the
   panel under the map (portrait) or beside it (landscape), and gives the hover readout a touch path: tap or drag on
   the map. Space (pause the particles) becomes a touch button. Desktop: nothing runs unless M.on. */
(()=>{const Q=window.M,pe=P.el,fr=document.querySelector('.s-frame'),c=cv.c;
 const put=(e,b)=>Object.assign(e.style,{left:b.x+'px',top:b.y+'px',width:b.w+'px',height:b.h+'px'});
 const AR=(LON1-LON0)*K/(LAT1-LAT0);
 function boxes(){const W=innerWidth,H=innerHeight;let m,pn;
  if(Q.portrait){const hh=34;m={x:10,y:hh+30,w:W-20};m.h=Math.round(m.w/AR);pn={left:10,right:10,top:m.y+m.h+16,bottom:58}}
  else{const hh=28,h=H-hh-26-12,w=Math.round(Math.min(W*.6,h*AR));m={x:12,y:hh+26,w,h:Math.round(w/AR)};pn={left:m.x+m.w+18,right:10,top:hh+8,bottom:56}}
  return{m,pn}}
 function lay(){if(!Q.on){pe.style.left=pe.style.right=pe.style.top=pe.style.bottom='';return}
  const {m,pn}=boxes(),d=devicePixelRatio||1;put(fr,m);put(c,m);c.width=m.w*d;c.height=m.h*d;cv.ctx.setTransform(d,0,0,d,0,0);cv.W=m.w;cv.H=m.h;cv.dpr=d;
  base=null;PT=[];for(const k in pn)pe.style[k]=pn[k]+'px'}
 addEventListener('resize',lay);
 let was=false;Q.watch(on=>{if(on){was=true;lay()}else if(was){was=false;lay();dispatchEvent(new Event('resize'))}});
 // city tags near the right edge move inside the narrow map (below their point) instead of running off it
 const tg=S.tag;S.tag=function(ctx,x,y,txt,o={}){if(Q.on){ctx.font=(o.size||11)+'px '+getComputedStyle(document.body).getPropertyValue('--mono');
  const w=ctx.measureText(txt).width+12;if(x+w>cv.W-2){x=Math.max(2,cv.W-w-2);y+=24}}return tg(ctx,x,y,txt,o)};
 // touch readout: tap or drag on the map; the reticle and readout stay after the finger lifts
 c.style.touchAction='none';let held=null;
 const pick=e=>{if(!Q.on||e.pointerType==='mouse')return;const r=c.getBoundingClientRect();held=mouse=[e.clientX-r.left,e.clientY-r.top];readout();
  const it=info.offsetTop,ib=it+info.offsetHeight;if(it<pe.scrollTop||ib>pe.scrollTop+pe.clientHeight)pe.scrollTop=it-10};
 c.addEventListener('pointerdown',pick);c.addEventListener('pointermove',pick);
 c.addEventListener('pointerleave',e=>{if(Q.on&&e.pointerType!=='mouse'&&held)mouse=held});
 // "HOVER THE MAP" -> "TOUCH THE MAP" on a phone (same length, so the text roll is undisturbed)
 const relabel=on=>{const sp=[...info.querySelectorAll('span[data-c]')].slice(0,5),w=on?'TOUCH':'HOVER';
  if(sp.map(s=>s.dataset.c).join('')!==(on?'HOVER':'TOUCH'))return;sp.forEach((s,i)=>{s.dataset.c=w[i];if(s.style.visibility!=='hidden')s.textContent=w[i]})};
 Q.watch(relabel);
 // touch button for the keyboard shortcut (space: pause / run the particles)
 let bar=null;Q.watch(on=>{if(on&&!bar)bar=Q.keys([['❚❚',b=>{Q.key(' ');b.textContent=run?'❚❚':'▶'},'pause / run the wind particles']])});
})();

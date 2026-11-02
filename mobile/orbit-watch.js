/* orbit-watch on a phone: the page sizes its frames from innerWidth/innerHeight (MB, sb), so on a phone this re-lays
   the main map, the four feed thumbnails, the enlarged-feed image and the telemetry panel. Runs after the page's own
   resize handlers, so its boxes win. Desktop: nothing runs unless M.on. */
(()=>{const Q=window.M,pe=P.el,tab=f=>f.querySelector('.tab');
 // short labels for the small feed tabs (the full ones do not fit a thumbnail)
 FEEDS.forEach(f=>{const w=f.name.match(/ (\d+) Å/);tab(f.fe).dataset.s=f.id.replace('FEED_','F')+' '+f.name.split(' · ')[0]+(w?' '+w[1]:'')});
 // the map legend is drawn at a fixed 10px; squeeze it to the canvas width on a narrow phone
 const ft=cv.ctx.fillText;cv.ctx.fillText=function(t,x,y,mw){if(Q.on&&mw===undefined&&/^DASHED WHITE/.test(t))mw=cv.W-2*x;return mw===undefined?ft.call(this,t,x,y):ft.call(this,t,x,y,mw)};
 // tap the enlarged feed to return to the ground track (desktop: click the thumbnail again)
 big.addEventListener('click',()=>{if(Q.on&&view>=0)show(-1)});
 const put=(e,b)=>Object.assign(e.style,{left:b.x+'px',top:b.y+'px',width:b.w+'px',height:b.h+'px'});
 function boxes(){const W=innerWidth,H=innerHeight,hh=Q.portrait?34:28,g=8;let m,fw,fy;
  if(Q.portrait){m={x:10,y:hh+30,w:W-20};m.h=Math.round(m.w/2)}
  else{const w=Math.round(Math.min(W*.55,(H-hh-70)/.75));m={x:12,y:hh+26,w,h:Math.round(w/2)}}
  fw=(m.w-3*g)/4;fy=m.y+m.h+(Q.portrait?30:24);const fh=Q.portrait?fw:Math.min(fw,H-10-fy);
  const fs=FEEDS.map((f,k)=>({x:m.x+k*(fw+g),y:fy,w:fw,h:fh}));
  const pn=Q.portrait?{left:10,right:10,top:fy+fh+14,bottom:58}:{left:m.x+m.w+18,right:10,top:hh+8,bottom:56};return{m,fs,pn}}
 function lay(){if(!Q.on){pe.style.left=pe.style.right=pe.style.top=pe.style.bottom='';return}
  const {m,fs,pn}=boxes(),d=devicePixelRatio||1;
  put(main,m);put(big,m);put(cv.c,m);cv.c.width=m.w*d;cv.c.height=m.h*d;cv.ctx.setTransform(d,0,0,d,0,0);cv.W=m.w;cv.H=m.h;cv.dpr=d;
  FEEDS.forEach((f,k)=>put(f.fe,fs[k]));
  for(const k in pn)pe.style[k]=pn[k]+'px'}
 addEventListener('resize',lay);
 let was=false;Q.watch(on=>{if(on){was=true;lay()}else if(was){was=false;lay();dispatchEvent(new Event('resize'))}});
})();

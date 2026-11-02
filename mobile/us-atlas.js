/* Phone layout and input for us-atlas. Only active in phone mode; on the desktop the page's own fit() runs unchanged.
   - fit() is replaced by a version that puts the map in the phone box (full width at the top in portrait, left of the
     panel in landscape) and publishes where the chip strip starts (--m-cw) for us-atlas.css.
   - Touch buttons for the keys: P (previous layer), SPACE (pause), N (next layer). Chips scroll sideways and tap to pick.
   - A tap on a state or county shows the page's hover readout; it is kept inside the screen. */
(()=>{if(!window.M)return;const R=document.documentElement,pn=document.getElementById('pn'),tip=document.getElementById('tip');
 // safe-area insets (notch, home bar), read from a probe because env() is CSS-only
 const pr=document.createElement('div');pr.style.cssText='position:fixed;visibility:hidden;pointer-events:none;left:env(safe-area-inset-left);right:env(safe-area-inset-right);top:env(safe-area-inset-top);bottom:env(safe-area-inset-bottom)';
 document.body.appendChild(pr);
 const box=()=>{const r=pr.getBoundingClientRect(),sl=r.left,sr=innerWidth-r.right,st=r.top,sb=innerHeight-r.bottom,top=28+st+34;
  if(M.portrait){const x0=14+sl,x1=W-14-sr,y1=top+Math.min((x1-x0)*.625,H*.4);R.style.setProperty('--m-cw',Math.round(y1+30)+'px');return[x0,x1,top,y1]}
  const pw=Math.min(360,W*.42);return[12+sl,W-pw-20-Math.max(8,sr),top,H-Math.max(10,sb)-34-15-30]};
 const _fit=fit;removeEventListener('resize',_fit);
 fit=function(){if(!M.on)return _fit();
  DPR=Math.min(2,devicePixelRatio||1);W=innerWidth;H=innerHeight;cv.width=W*DPR;cv.height=H*DPR;cv.style.width=W+'px';cv.style.height=H+'px';
  const[x0,x1,y0,y1]=box();sc=Math.min((x1-x0)/960,(y1-y0)/600);ox=x0+((x1-x0)-960*sc)/2;oy=y0+((y1-y0)-600*sc)/2;
  base=off();drawBase(base.getContext('2d'));lay=off();restart()};
 addEventListener('resize',fit);
 // a new layer starts at the top of its panel, and an old readout goes away
 const _go=go;go=function(i,keep){_go(i,keep);if(M.on&&!keep){pn.scrollTop=0;tip.style.display='none'}};
 // keep the tap readout on screen (runs after the page's own mousemove handler)
 cv.addEventListener('mousemove',e=>{if(!M.on||tip.style.display==='none')return;const w=tip.offsetWidth,h=tip.offsetHeight;
  let x=e.clientX-w/2,y=e.clientY-h-18;x=Math.max(6,Math.min(innerWidth-w-6,x));if(y<34)y=e.clientY+18;tip.style.left=x+'px';tip.style.top=y+'px'});
 // Legal mosaic (small multiples): at phone scale a law's name and count run into the next panel, so a name that does
 // not fit its panel is drawn on two lines, with the count after the second line
 const law=L.find(l=>l.id==='law');if(law){const f0=law.full,T=new Set(LAW.map(l=>l.t.toUpperCase()));
  law.full=function(g,kx){if(!M.on)return f0.call(this,g,kx);let end=null;
   const fill=(t,x,y)=>{if(T.has(t)){end=null;const room=960*sc/3*.92;if(g.measureText(t+'  00').width<=room)return g.fillText(t,x,y);
     const w=t.split(' '),k=Math.ceil(w.length/2),a=w.slice(0,k).join(' '),b=w.slice(k).join(' '),lh=parseFloat(g.font.match(/(\d+(\.\d+)?)px/)[1])+2;
     g.fillText(a,x,y-lh);g.fillText(b,x,y);end=x+g.measureText(b+'  ').width;return}
    if(end!=null&&/^\d+$/.test(t)){g.fillText(t,end,y);end=null;return}g.fillText(t,x,y)};
   const P=new Proxy(g,{get:(o,k)=>k==='fillText'?fill:typeof o[k]==='function'?o[k].bind(o):o[k],set:(o,k,v)=>(o[k]=v,true)});
   return f0.call(this,P,kx)}}
 const pl=b=>{b.textContent=paused?'▶':'❚❚';b.title=paused?'play':'pause'};
 const bar=M.keys([['◀','p','previous layer'],['❚❚',b=>{M.key(' ');pl(b)},'pause'],['▶','n','next layer']]);
 // refit on entering phone mode and on leaving it (never on a plain desktop load); M.watch also fires on rotation
 let was=false;M.watch(on=>{if(on||was)fit();was=on;pl(bar.children[1])})})();

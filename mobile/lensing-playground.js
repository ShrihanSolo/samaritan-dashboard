/* Phone input for lensing-playground: drag on the sky moves the lens, the top sheet opens with a tap, and touch
   buttons stand in for the keys (arrow up/down mass, L lens, S shear). Only active in phone mode.
   size() is re-run once the phone CSS has given the canvas its CSS size (the first run saw an overflowing canvas). */
(()=>{if(!window.M)return;const R=document.documentElement,P=document.getElementById('p'),K=P.querySelector('.k'),K0=K.innerHTML;
 const touch=e=>{if(!M.on||e.pointerType==='mouse')return;mouse={x:e.clientX*dpr,y:e.clientY*dpr};lastMove=performance.now()};
 c.addEventListener('pointerdown',touch);c.addEventListener('pointermove',touch);
 P.addEventListener('click',()=>{if(M.on)R.classList.toggle('m-open')});
 const bar=M.keys([['−','ArrowDown','less mass'],['+','ArrowUp','more mass'],['LENS','l','lens on/off'],['SHEAR','s','shear field']]);
 // taps on the buttons and the sheet send compat mousemoves to window; keep them from pulling the lens there
 for(const e of [bar,P,document.getElementById('m-back')])if(e)e.addEventListener('mousemove',ev=>{if(M.on)ev.stopPropagation()});
 M.watch(on=>{if(on)size();K.innerHTML=on?'<b>Drag</b> moves the lens (it drifts on its own when idle) · <b>− / +</b> mass · <b>LENS</b> on/off · <b>SHEAR</b> shear field':K0})})();

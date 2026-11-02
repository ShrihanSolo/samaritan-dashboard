/* Phone layer for the Samaritan gallery (GitHub copy only). Sets html.phone on small screens, adds a back button and
   touch buttons that stand in for keyboard shortcuts. Desktop (1920x1050 display) is untouched: nothing here runs
   unless the screen is small. Per-display rules live in mobile/<name>.css / .js and key off html.phone. */
(()=>{const q=matchMedia('(max-width: 820px), (max-height: 520px)'),R=document.documentElement;
 const M=window.M={q,get on(){return q.matches},get portrait(){return innerHeight>innerWidth},cbs:[],
  // run fn(isPhone) now and whenever phone mode or orientation changes
  watch(fn){this.cbs.push(fn);fn(this.on)},
  // send a key to the page as if typed: M.key(' '), M.key('ArrowRight'), M.key('n')
  key(k){const code=k===' '?'Space':k.length===1?'Key'+k.toUpperCase():k,o={key:k,code,bubbles:true,cancelable:true};
   (document.activeElement||document.body).dispatchEvent(new KeyboardEvent('keydown',o));document.dispatchEvent(new KeyboardEvent('keyup',o))},
  // touch buttons: M.keys([['❚❚',' '],['NEXT','n',optional title]]) -> returns the bar element
  keys(list){let b=document.getElementById('m-keys');if(!b){b=document.createElement('div');b.id='m-keys';document.body.appendChild(b)}
   b.innerHTML='';for(const[lab,k,t]of list){const e=document.createElement('button');e.className='m-k';e.textContent=lab;if(t)e.title=t;
    e.addEventListener('click',ev=>{ev.stopPropagation();typeof k==='function'?k(e):M.key(k)});b.appendChild(e)}return b}};
 const set=()=>{R.classList.toggle('phone',q.matches);R.classList.toggle('portrait',innerHeight>innerWidth);M.cbs.forEach(f=>f(q.matches))};
 let last='';const chk=()=>{const s=q.matches+'|'+(innerHeight>innerWidth);if(s!==last){last=s;set()}};
 set();last=q.matches+'|'+(innerHeight>innerWidth);q.addEventListener('change',chk);addEventListener('resize',chk);
 const back=document.createElement('a');back.id='m-back';back.href='../';back.textContent='◀ FEEDS';
 const add=()=>document.body.appendChild(back);document.body?add():addEventListener('DOMContentLoaded',add)})();

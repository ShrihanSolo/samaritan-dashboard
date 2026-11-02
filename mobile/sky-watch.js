/* Phone input and map fit for sky-watch. LIST / FOCUS swaps the bottom slot between the focus card and the observatory
   list, NEXT stands in for the N key, and a tap on a box's title bar folds it. In portrait the world is re-fitted into
   the strip between the header and the bottom slot. Only active in phone mode. */
(()=>{if(!window.M)return;const R=document.documentElement,$=id=>document.getElementById(id),hdr=$('hdr'),card=$('card'),list=$('list'),
 B=[[-58,-175],[72,175]];let showList=false,was=false;
 const refit=()=>{if(!M.on){if(was){was=false;map.invalidateSize();map.fitBounds(B)}return}was=true;
  const hb=hdr.getBoundingClientRect().bottom;R.style.setProperty('--m-hb',Math.round(hb+4)+'px');map.invalidateSize();
  if(M.portrait){const bt=(showList?list:card).getBoundingClientRect().top||innerHeight-60;
   map.fitBounds(B,{paddingTopLeft:[4,hb+14],paddingBottomRight:[4,Math.max(60,innerHeight-bt+8)]})}else map.fitBounds(B)};
 M.keys([['LIST',b=>{showList=!showList;R.classList.toggle('m-list',showList);b.textContent=showList?'FOCUS':'LIST'}],['NEXT','n','next observatory']]);
 for(const e of [card,list])e.querySelector('.t').addEventListener('click',()=>{if(M.on)e.classList.toggle('m-min')});
 let tm;addEventListener('resize',()=>{clearTimeout(tm);tm=setTimeout(refit,250)});
 M.watch(()=>setTimeout(refit,350))})();

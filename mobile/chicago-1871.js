/* chicago-1871 on a phone. Note: the page has its own top-level `const M` (the fire model), so the phone layer is
   reached as window.M here. */
(()=>{const P=window.M,R=document.documentElement,g=id=>document.getElementById(id);
 const hdr=g('hdr'),clk=g('clock'),log=g('log');
 // stack the clock under the header (its desktop top is a fixed offset)
 function place(){if(!P.on){clk.style.top='';return}
  clk.style.top=(hdr.getBoundingClientRect().bottom+6)+'px'}
 // fit the fire district into the part of the map the panels leave free
 function pads(){const W=innerWidth,H=innerHeight,c=clk.getBoundingClientRect(),l=log.getBoundingClientRect();
  return P.portrait?[L.point(12,c.bottom+10),L.point(70,H-l.top+70)]:[L.point(c.right+10,12),L.point(W-l.left+10,12)]}
 function view(){const [tl,br]=pads(),z=gbz(AREA,false,tl.add(br)),off=br.subtract(tl).divideBy(2),
  c=map.unproject(map.project(AREA.getSouthWest(),z).add(map.project(AREA.getNorthEast(),z)).divideBy(2).add(off),z);return [c,z]}
 const gbz=map.getBoundsZoom.bind(map),gc=AREA.getCenter.bind(AREA);
 map.getBoundsZoom=function(b,i,p){return P.on&&b===AREA&&!p?view()[1]:gbz(b,i,p)};
 AREA.getCenter=function(){return P.on?view()[0]:gc()};
 // event log sheet: tap to show all events / only the latest
 log.addEventListener('click',()=>{if(P.on)log.classList.toggle('m-open')});
 // touch buttons for the keyboard shortcuts (space pause, 1-4 speed, click title to replay)
 let bar=null;
 function keys(){bar=P.keys([['❚❚',b=>{P.key(' ');b.textContent=paused?'▶':'❚❚'},'pause / play'],
  ['x1',b=>{P.key(String(speed%4+1));b.textContent='x'+SPEEDS[speed]},'speed'],
  ['↺',()=>{hdr.click();bar.children[1].textContent='x1'},'replay']])}
 let had=false;
 P.watch(on=>{if(!on)return;if(!bar)keys();requestAnimationFrame(()=>{place();map.invalidateSize();
  if(had&&H>=0){const [c,z]=view();map.setView(c,z,{animate:false})}had=true})});
 if(document.fonts)document.fonts.ready.then(place);
})();

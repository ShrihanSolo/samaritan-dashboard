// nyc-tour on a phone: touch buttons for pause / next, and touch stops the tour like a mouse press on the map.
(()=>{const M=window.M;if(!M||typeof map==='undefined'||!map.getContainer)return;let added=false;
 M.watch(on=>{if(!on||added)return;added=true;
  M.keys([['❚❚',b=>{M.key(' ');b.textContent=paused?'PLAY':'❚❚'},'Pause / resume'],['NEXT','n','Next stop']]);
  // Leaflet's drag handler can swallow the compatibility mousedown on touch; stop the tour on any touch on the map
  map.getContainer().addEventListener('touchstart',()=>{if(!stopped)map.fire('mousedown')},{passive:true});
  // there is no cursor on a phone: a tap on the map fills the CURSOR readout instead
  map.on('click',e=>ll.textContent=e.latlng.lat.toFixed(4)+'N '+(-e.latlng.lng).toFixed(4)+'W');
  // replay resets the pause button
  $('hdr').addEventListener('click',()=>{const b=document.querySelector('#m-keys .m-k');if(b)b.textContent='❚❚'})})})();

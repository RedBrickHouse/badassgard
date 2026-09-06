(function(){
  var top=document.getElementById('top'), burger=top.querySelector('.burger'), menu=document.getElementById('menu');
  function onScroll(){top.classList.toggle('scrolled',scrollY>30);}
  onScroll(); addEventListener('scroll',onScroll,{passive:true});
  burger.addEventListener('click',function(){var open=top.classList.toggle('open');burger.setAttribute('aria-expanded',open);});
  menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){top.classList.remove('open');burger.setAttribute('aria-expanded','false');});});
})();
(function(){
  // rope progress follows scroll through the route section; ends at 100%, no perpetual motion
  var fg=document.getElementById('ropeFg'), map=document.querySelector('.route-map'); if(!fg||!map) return;
  var len=fg.getTotalLength(); fg.style.strokeDasharray=len; fg.style.strokeDashoffset=len;
  function upd(){var r=map.getBoundingClientRect(); var vh=innerHeight; var p=(vh*0.7-r.top)/(r.height); p=Math.max(0,Math.min(1,p)); fg.style.strokeDashoffset=len*(1-p);}
  upd(); addEventListener('scroll',upd,{passive:true}); addEventListener('resize',function(){len=fg.getTotalLength();fg.style.strokeDasharray=len;upd();});
})();
(function(){
  var g=document.querySelector('.gate-arch'); if(!g) return;
  if(!('IntersectionObserver' in window)){g.classList.add('open');return;}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){g.classList.add('open');io.disconnect();}})},{threshold:.35});
  io.observe(g); setTimeout(function(){g.classList.add('open');},6000);
})();
(function(){
  var lb=document.getElementById('lightbox'), img=lb.querySelector('img'), cap=lb.querySelector('figcaption');
  var items=[].slice.call(document.querySelectorAll('#grid a')), idx=0;
  function show(i){idx=(i+items.length)%items.length; img.src=items[idx].getAttribute('href'); img.alt=items[idx].dataset.cap||''; cap.textContent=(idx+1)+' / '+items.length+'  '+(items[idx].dataset.cap||''); lb.hidden=false; document.body.style.overflow='hidden';}
  function hide(){lb.hidden=true; document.body.style.overflow='';}
  items.forEach(function(a,i){a.addEventListener('click',function(e){e.preventDefault();show(i);});});
  lb.querySelector('.lb-close').addEventListener('click',hide);
  lb.querySelector('.lb-prev').addEventListener('click',function(){show(idx-1)});
  lb.querySelector('.lb-next').addEventListener('click',function(){show(idx+1)});
  lb.addEventListener('click',function(e){if(e.target===lb)hide();});
  addEventListener('keydown',function(e){if(lb.hidden)return; if(e.key==='Escape')hide(); if(e.key==='ArrowLeft')show(idx-1); if(e.key==='ArrowRight')show(idx+1);});
})();
(function(){
  var vids=document.querySelectorAll('video[autoplay]'); if(!vids.length) return;
  function kick(v){var p=v.play(); if(p&&p.catch) p.catch(function(){});}
  if(!('IntersectionObserver' in window)){vids.forEach(kick);return;}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){ if(x.isIntersecting) kick(x.target); else x.target.pause(); });},{rootMargin:'120px 0px'});
  vids.forEach(function(v){io.observe(v)});
})();

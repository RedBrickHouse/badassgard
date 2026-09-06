(function(){
  var nav=document.getElementById('nav'), burger=nav.querySelector('.burger'), menu=document.getElementById('menu');
  function onScroll(){nav.classList.toggle('scrolled',scrollY>40);}
  onScroll(); addEventListener('scroll',onScroll,{passive:true});
  burger.addEventListener('click',function(){var open=nav.classList.toggle('open');burger.setAttribute('aria-expanded',open);});
  menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');burger.setAttribute('aria-expanded','false');});});
  var links=menu.querySelectorAll('[data-spy]'), secs=[];
  links.forEach(function(a){var s=document.getElementById(a.dataset.spy); if(s) secs.push([s,a]);});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){links.forEach(function(l){l.classList.remove('active')});
      secs.forEach(function(p){if(p[0]===x.target)p[1].classList.add('active');});}});},{rootMargin:'-40% 0px -55% 0px'});
    secs.forEach(function(p){io.observe(p[0]);});
  }
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
  var sel='.about-text,.about-art,.steps li,.feat,.media .wrap,.news .wrap,.alpha-in';
  var els=document.querySelectorAll(sel); els.forEach(function(e){e.classList.add('rv')});
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return;}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}})},{rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(e){io.observe(e)});
})();

(function(){
  var vids=document.querySelectorAll('video[autoplay]'); if(!vids.length) return;
  function kick(v){var p=v.play(); if(p&&p.catch) p.catch(function(){});}
  if(!('IntersectionObserver' in window)){vids.forEach(kick);return;}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){ if(x.isIntersecting) kick(x.target); else x.target.pause(); });},{rootMargin:'120px 0px'});
  vids.forEach(function(v){io.observe(v)});
})();

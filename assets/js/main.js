(function(){
  "use strict";

  // Year
  var yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Header scroll state + progress bar
  var header = document.getElementById('siteHeader');
  var progressBar = document.getElementById('progressBar');
  function onScroll(){
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    if(header) header.classList.toggle('scrolled', scrollTop > 10);
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if(progressBar) progressBar.style.width = pct + '%';
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var navMobile = document.getElementById('navMobile');
  if(navToggle && navMobile){
    navToggle.addEventListener('click', function(){
      var open = navToggle.classList.toggle('open');
      navMobile.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navMobile.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        navToggle.classList.remove('open');
        navMobile.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in-view'); });
  }

  // Work filter
  var filterBtns = document.querySelectorAll('.filter-btn');
  var workCards = document.querySelectorAll('.work-card');
  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      filterBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      workCards.forEach(function(card){
        var cat = card.getAttribute('data-cat');
        var show = filter === 'all' || cat === filter;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  // Lightbox for project screenshots
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  document.querySelectorAll('.work-media img').forEach(function(img){
    img.addEventListener('click', function(e){
      e.preventDefault();
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    });
  });
  function closeLightbox(){ lightbox.classList.remove('open'); lightboxImg.src=''; }
  if(lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if(lightbox){
    lightbox.addEventListener('click', function(e){
      if(e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeLightbox();
  });

})();

(function () {
  'use strict';

  var grid = document.getElementById('allWorkGrid');
  var template = document.getElementById('newProjectsTemplate');
  var count = document.getElementById('projectsCount');
  var filterBtns = document.querySelectorAll('.filter-btn');
  var navToggle = document.getElementById('navToggle');
  var navMobile = document.getElementById('navMobile');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      var open = navToggle.classList.toggle('open');
      navMobile.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('open');
        navMobile.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function addNewProjects(fragment) {
    fragment.appendChild(template.content.cloneNode(true));
  }

  function prepareCards() {
    var cards = grid.querySelectorAll('.work-card');
    cards.forEach(function (card) {
      card.classList.remove('reveal');
      card.classList.add('in-view');

      var img = card.querySelector('.work-media img');
      if (img) {
        img.addEventListener('error', function () {
          var media = img.closest('.work-media');
          img.style.display = 'none';
          if (media) media.classList.add('has-fallback');
        }, { once: true });
      }
    });
    count.textContent = cards.length + ' client websites';
  }

  function applyFilter(filter) {
    var visible = 0;
    grid.querySelectorAll('.work-card').forEach(function (card) {
      var show = filter === 'all' || card.getAttribute('data-cat') === filter;
      card.classList.toggle('is-hidden', !show);
      if (show) visible += 1;
    });
    count.textContent = visible + (visible === 1 ? ' client website' : ' client websites');
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (item) { item.classList.remove('active'); });
      btn.classList.add('active');
      applyFilter(btn.getAttribute('data-filter'));
    });
  });

  fetch('index.html', { cache: 'no-store' })
    .then(function (response) {
      if (!response.ok) throw new Error('Could not load the portfolio page.');
      return response.text();
    })
    .then(function (html) {
      var page = new DOMParser().parseFromString(html, 'text/html');
      var fragment = document.createDocumentFragment();
      page.querySelectorAll('#workGrid .work-card').forEach(function (card) {
        fragment.appendChild(document.importNode(card, true));
      });
      addNewProjects(fragment);
      grid.replaceChildren(fragment);
      prepareCards();
    })
    .catch(function () {
      var fragment = document.createDocumentFragment();
      addNewProjects(fragment);
      grid.replaceChildren(fragment);
      prepareCards();
      count.textContent = 'Showing the newest client websites';
    });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();

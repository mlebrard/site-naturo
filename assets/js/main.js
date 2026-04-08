// ================================================
// MARIE-LAURE EBRARD — NATUROPATHE
// Interactions globales
// ================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Menu mobile ----
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-principale');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const ouvert = toggle.classList.toggle('ouvert');
      nav.classList.toggle('ouverte', ouvert);
      toggle.setAttribute('aria-expanded', ouvert);
    });

    // Fermer au clic sur un lien
    nav.querySelectorAll('a').forEach(lien => {
      lien.addEventListener('click', () => {
        toggle.classList.remove('ouvert');
        nav.classList.remove('ouverte');
        toggle.setAttribute('aria-expanded', false);
      });
    });

    // Fermer au clic extérieur
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        toggle.classList.remove('ouvert');
        nav.classList.remove('ouverte');
      }
    });
  }

  // ---- Header sticky avec ombre ----
  const header = document.querySelector('.site-header');
  if (header) {
    const observer = new IntersectionObserver(
      ([entry]) => header.classList.toggle('scrolled', !entry.isIntersecting),
      { rootMargin: '-70px 0px 0px 0px' }
    );
    const sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:70px;height:1px;width:1px;pointer-events:none';
    document.body.prepend(sentinel);
    observer.observe(sentinel);
  }

  // ---- Lien actif dans la nav ----
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-principale a').forEach(lien => {
    const href = lien.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      lien.classList.add('active');
    }
  });

  // ---- Apparition au scroll (fade-in) ----
  const cibles = document.querySelectorAll('.fade-in');
  if (cibles.length > 0) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    cibles.forEach(el => obs.observe(el));
  }

});

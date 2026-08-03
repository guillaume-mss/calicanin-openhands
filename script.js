/**
 * CALICANIN - Script pour le menu mobile et navigation
 */

document.addEventListener('DOMContentLoaded', function() {
  // === Menu Mobile ===
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    const navLinksItems = navLinks.querySelectorAll('a');
    navLinksItems.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    // Fermer le menu quand on clique en dehors
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }

  // === Gestion du sous-menu sur mobile ===
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  
  if (dropdownToggle) {
    dropdownToggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        const parent = this.parentElement;
        parent.classList.toggle('active');
      }
    });
  }

  // === Highlight de la page active ===
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  const navLinksAll = document.querySelectorAll('.nav-links a');
  
  navLinksAll.forEach(link => {
    const href = link.getAttribute('href');
    
    // Page d'accueil
    if (currentPage === '' || currentPage === 'index.html') {
      if (href === 'index.html' || href === './' || href === '/') {
        link.classList.add('active');
      }
    }
    // Autres pages
    else if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // === Animation au défilement (optionnel) ===
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      } else {
        navbar.style.boxShadow = 'none';
      }
      
      lastScroll = currentScroll;
    });
  }
});

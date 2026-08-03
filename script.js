/**
 * ALIZE TOILETTAGE - Script pour le menu mobile et navigation
 */

document.addEventListener('DOMContentLoaded', function() {
  // Force un ordre cohérent du sous-menu Réalisations sur toutes les pages
  const dropdownMenus = document.querySelectorAll('.nav-item-dropdown .dropdown-menu');

  dropdownMenus.forEach(menu => {
    const items = Array.from(menu.querySelectorAll(':scope > li'));

    const getLabel = li => (li.textContent || '').trim().toLowerCase();
    const getHref = li => {
      const link = li.querySelector('a');
      return (link?.getAttribute('href') || '').toLowerCase();
    };

    const priority = [
      { text: 'avant/apres', href: '#avant-apres' },
      { text: 'avant/après', href: '#avant-apres' },
      { text: 'chiens', href: '#chiens' },
      { text: 'chats', href: '#chats' },
      { text: 'lapins', href: '#lapins' },
      { text: 'nac', href: '#lapins' },
      { text: 'coupes ciseaux', href: '' },
      { text: 'tontes', href: '' }
    ];

    items.sort((a, b) => {
      const labelA = getLabel(a);
      const labelB = getLabel(b);
      const hrefA = getHref(a);
      const hrefB = getHref(b);

      const scoreA = priority.findIndex(rule => labelA.includes(rule.text) || (rule.href && hrefA.includes(rule.href)));
      const scoreB = priority.findIndex(rule => labelB.includes(rule.text) || (rule.href && hrefB.includes(rule.href)));

      const rankA = scoreA === -1 ? Number.MAX_SAFE_INTEGER : scoreA;
      const rankB = scoreB === -1 ? Number.MAX_SAFE_INTEGER : scoreB;

      return rankA - rankB;
    });

    items.forEach(li => menu.appendChild(li));
  });

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

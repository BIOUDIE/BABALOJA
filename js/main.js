/* =============================================
   BABALOJA — MARKET RUNS IBADAN
   Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR SCROLL ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ---- MOBILE HAMBURGER ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---- SCROLL REVEAL ---- */
  const revealEls = document.querySelectorAll(
    '.step-card, .why-card, .service-cat-card, .service-type-card, ' +
    '.market-card, .faq-item, .value-card, .process-step, .brand-img-card'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Staggered delay for grid children
        const siblings = Array.from(entry.target.parentElement.children);
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  /* ---- CONTACT FORM → WHATSAPP ---- */
  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = document.getElementById('fullname').value.trim();
      const phone   = document.getElementById('phone').value.trim();
      const address = document.getElementById('address').value.trim();
      const date    = document.getElementById('delivery_date').value;
      const list    = document.getElementById('shopping_list').value.trim();
      const notes   = document.getElementById('notes').value.trim();

      if (!name || !phone || !address || !list) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      const msg = [
        `🛒 *NEW ORDER — Babaloja Market Runs*`,
        ``,
        `👤 *Name:* ${name}`,
        `📞 *Phone:* ${phone}`,
        `📍 *Delivery Address:* ${address}`,
        date ? `📅 *Preferred Date:* ${date}` : '',
        ``,
        `🧺 *Shopping List:*`,
        list,
        notes ? `\n📝 *Special Instructions:*\n${notes}` : '',
        ``,
        `_Sent via babaloja.com_`
      ].filter(Boolean).join('\n');

      const encoded = encodeURIComponent(msg);
      window.open(`https://wa.me/2348101860929?text=${encoded}`, '_blank');

      showToast('Opening WhatsApp with your order details...', 'success');
    });
  }

  /* ---- TOAST NOTIFICATION ---- */
  function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed; bottom: 5rem; left: 50%; transform: translateX(-50%);
      background: ${type === 'success' ? '#1a4d2e' : '#c0392b'};
      color: #fff; padding: 0.85rem 1.75rem;
      border-radius: 10px; font-size: 0.92rem; font-weight: 500;
      box-shadow: 0 8px 24px rgba(0,0,0,0.18);
      z-index: 9999; white-space: nowrap;
      animation: toastIn 0.3s ease both;
    `;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(12px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
      @keyframes toastOut { from { opacity: 1; } to { opacity: 0; transform: translateX(-50%) translateY(12px); } }
    `;
    document.head.appendChild(style);
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s ease both';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  /* ---- ACTIVE NAV LINK ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- SMOOTH HOVER ON CTA BUTTONS ---- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => btn.style.willChange = 'transform');
    btn.addEventListener('mouseleave', () => btn.style.willChange = 'auto');
  });

});

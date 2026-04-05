// sumthing cute — script.js

// ---- Sticky header shadow on scroll ----
const header = document.getElementById('header');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
};
window.addEventListener('scroll', onScroll, { passive: true });

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

// Close nav when a link is clicked
navLinks.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-label', 'Open menu');
  });
});

// ---- Scroll-in animations ----
const animateOnScroll = () => {
  const targets = document.querySelectorAll(
    '.gallery-card, .service-card, .event-card, .stat, .about__photo-card, .about__copy'
  );

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity .5s ease ${i * 0.06}s, transform .5s ease ${i * 0.06}s`;
    io.observe(el);
  });
};

// Apply .visible class to trigger the transition
const styleTag = document.createElement('style');
styleTag.textContent = '.visible { opacity: 1 !important; transform: none !important; }';
document.head.appendChild(styleTag);

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
  animateOnScroll();
}

// ---- Contact form — show success message ----
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name     = form.querySelector('#name').value.trim();
    const email    = form.querySelector('#email').value.trim();
    const type     = form.querySelector('#orderType').value;
    const message  = form.querySelector('#message').value.trim();
    const emailRe  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !type || !message) {
      showFormError('Please fill in all required fields.');
      return;
    }
    if (!emailRe.test(email)) {
      showFormError('Please enter a valid email address.');
      return;
    }

    // Show success state
    form.hidden = true;
    formSuccess.hidden = false;
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

function showFormError(msg) {
  let err = form.querySelector('.form-error');
  if (!err) {
    err = document.createElement('p');
    err.className = 'form-error';
    err.style.cssText = 'color:#e0295a;font-weight:700;font-size:.88rem;margin-top:-.5rem;';
    form.querySelector('button[type="submit"]').insertAdjacentElement('beforebegin', err);
  }
  err.textContent = msg;
}

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__link:not(.nav__cta)');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-50% 0px -50% 0px' }
);

sections.forEach(s => navObserver.observe(s));

// Add active style via CSS
const activeStyle = document.createElement('style');
activeStyle.textContent = '.nav__link.active { color: var(--aqua-dark); background: var(--aqua-light); }';
document.head.appendChild(activeStyle);

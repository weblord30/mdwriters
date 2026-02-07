// === Hamburger Menu with X icon ===
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const overlay = document.getElementById('menu-overlay');
const body = document.body;

function toggleMenu() {
  const isOpen = nav.classList.toggle('show');
  hamburger.classList.toggle('active');
  overlay.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  nav.setAttribute('aria-hidden', !isOpen);
  body.style.overflow = isOpen ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 992) toggleMenu();
  });
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && nav.classList.contains('show')) toggleMenu();
});

// === Header Scroll Effect ===
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
});

// === Dark Mode ===
const darkToggle = document.getElementById('darkToggle');
const darkIcon = document.getElementById('darkIcon');

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedDark = localStorage.getItem('darkMode');

if (savedDark === 'true' || (savedDark === null && prefersDark)) {
  body.classList.add('dark-mode');
  darkIcon.textContent = '☀️';
}

darkToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDark);
  darkIcon.textContent = isDark ? '☀️' : '🌙';
});

// === Typewriter ===
const typewriterTexts = [
  "Professional Ghostwriting & Publishing Excellence",
  "Cookbooks. Memoirs. Guides. Courses.",
  "Your Vision, Expertly Brought to Life."
];
let twIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function typeWriter() {
  const text = typewriterTexts[twIndex];
  typewriterEl.textContent = text.substring(0, charIndex);

  if (!isDeleting && charIndex < text.length) {
    charIndex++;
    setTimeout(typeWriter, 60);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeWriter, 35);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) twIndex = (twIndex + 1) % typewriterTexts.length;
    setTimeout(typeWriter, isDeleting ? 800 : 1800);
  }
}

setTimeout(typeWriter, 800);

// === Ripple Effect ===
document.querySelectorAll('.ripple').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

// === Flip Cards ===
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.classList.toggle('flipped');
    }
  });
});

// === Fade-in on Scroll ===
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.section').forEach(sec => fadeObserver.observe(sec));

// === Testimonials Slider ===
const track = document.querySelector('.testimonial-track');
const prevBtn = document.querySelector('.testimonial-arrow.prev');
const nextBtn = document.querySelector('.testimonial-arrow.next');
let currentSlide = 0;
const slidesCount = document.querySelectorAll('.testimonial').length;

function goToSlide(index) {
  currentSlide = (index + slidesCount) % slidesCount;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

prevBtn?.addEventListener('click', () => goToSlide(currentSlide - 1));
nextBtn?.addEventListener('click', () => goToSlide(currentSlide + 1));

let autoSlideInterval = setInterval(() => goToSlide(currentSlide + 1), 6000);

const slider = document.querySelector('.testimonial-slider');
slider?.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
slider?.addEventListener('mouseleave', () => {
  autoSlideInterval = setInterval(() => goToSlide(currentSlide + 1), 6000);
});

let touchStartX = 0;
slider?.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
slider?.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 60) {
    goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
  }
});

goToSlide(0);

// === Pricing Modal ===
const modal = document.getElementById('pricingModal');
const openModalBtn = document.getElementById('viewFullPricing');
const closeModalBtn = document.querySelector('.close-modal');

function openModal() {
  modal.classList.add('show');
  body.style.overflow = 'hidden';
  modal.focus();
}

function closeModal() {
  modal.classList.remove('show');
  body.style.overflow = '';
  openModalBtn.focus();
}

openModalBtn?.addEventListener('click', e => {
  e.preventDefault();
  openModal();
});

closeModalBtn?.addEventListener('click', closeModal);
modal?.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
});

// === Contact Form with Formspree ===
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        alert("Message sent successfully! We'll get back to you very soon.");
        contactForm.reset();
      } else {
        alert("Something went wrong. Please try WhatsApp instead or check your connection.");
      }
    } catch (err) {
      alert("Network error — please try again or use WhatsApp.");
    }
  });
}

// Init log
console.log("MD Writers full scripts loaded ✓ All features active.");

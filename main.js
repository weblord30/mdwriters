// Hamburger menu
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('show');
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isOpen);
  nav.setAttribute('aria-hidden', !isOpen);  // Hide nav content when menu is closed
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      nav.classList.remove('show');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', false);
      nav.setAttribute('aria-hidden', true);  // Hide nav content when a link is clicked
    }
  });
});
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    nav.classList.remove('show');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', false);
    hamburger.focus();
    nav.setAttribute('aria-hidden', true);  // Hide nav content when Escape is pressed
  }
});

// Dark mode
const toggle = document.getElementById('darkToggle');
const icon = document.getElementById('darkIcon');
const body = document.body;
if (localStorage.getItem('md-writers-dark') === '1'
  || (localStorage.getItem('md-writers-dark') === null
    && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  body.classList.add('dark-mode');
  icon.textContent = "☀️";
  toggle.setAttribute('aria-label', 'Switch to light mode');
}
toggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const darkOn = body.classList.contains('dark-mode');
  localStorage.setItem('md-writers-dark', darkOn ? '1' : '0');
  icon.textContent = darkOn ? "☀️" : "🌙";
  toggle.setAttribute('aria-label', darkOn ? 'Switch to light mode' : 'Switch to dark mode');
});

// Typewriter
const typewriterTexts = [
  "Professional Ghostwriting & Publishing Support",
  "Manuscripts. Memoirs. Cookbooks. Courses.",
  "We Help You Finish, Polish, and Publish."
];
let twIndex = 0, charIdx = 0, twIsDeleting = false;
const twElement = document.getElementById("typewriter");

function typeWriterStep() {
  let txt = typewriterTexts[twIndex];
  twElement.textContent = txt.substring(0, charIdx);
  if (!twIsDeleting && charIdx < txt.length) {
    charIdx++;
    setTimeout(typeWriterStep, 42);
  } else if (twIsDeleting && charIdx > 0) {
    charIdx--;
    setTimeout(typeWriterStep, 28);
  } else {
    twIsDeleting = !twIsDeleting;
    setTimeout(typeWriterStep, twIsDeleting ? 500 : 1200);
    if (!twIsDeleting) twIndex = (twIndex + 1) % typewriterTexts.length;
  }
}
typeWriterStep();

// Ripple
document.querySelectorAll('.ripple').forEach(btn => {
  btn.addEventListener('click', function (e) {
    let rect = btn.getBoundingClientRect();
    let ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    let size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

// Flip Card
document.querySelectorAll('.flip-card').forEach(card => {
  card.classList.remove('visible');
  card.addEventListener('touchstart', function(e) {
    card.classList.toggle('flipped');
    document.querySelectorAll('.flip-card').forEach(other => {
      if (other !== card) other.classList.remove('flipped');
    });
  });
  card.addEventListener('keydown', function(e) {
    if (e.key === "Enter" || e.key === " ") {
      card.classList.toggle('flipped');
      e.preventDefault();
    }
  });
});
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.13 }
);
document.querySelectorAll('.flip-card').forEach(card => observer.observe(card));

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial');
const track = document.querySelector('.testimonial-track');
const prev = document.querySelector('.testimonial-arrow.prev');
const next = document.querySelector('.testimonial-arrow.next');
let activeTestimonial = 0;

function showTestimonial(idx) {
  activeTestimonial = (idx + testimonials.length) % testimonials.length;
  track.style.transform = `translateX(-${activeTestimonial * 100}%)`;

  // Add 'active' class for visual feedback
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.toggle('active', i === activeTestimonial);
  });
}

prev.addEventListener('click', () => showTestimonial(activeTestimonial - 1));
next.addEventListener('click', () => showTestimonial(activeTestimonial + 1));
let testimonialInterval = setInterval(() => showTestimonial(activeTestimonial + 1), 6500);

track.parentElement.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
track.parentElement.addEventListener('mouseleave', () => {
  testimonialInterval = setInterval(() => showTestimonial(activeTestimonial + 1), 6500);
});

let startX = 0;
track.parentElement.addEventListener('touchstart', e => startX = e.touches[0].clientX);
track.parentElement.addEventListener('touchend', e => {
  let dx = e.changedTouches[0].clientX - startX;
  if (dx > 38) showTestimonial(activeTestimonial - 1);
  else if (dx < -38) showTestimonial(activeTestimonial + 1);
});
showTestimonial(0);

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.closest('.faq-item');
    const isOpen = faqItem.classList.contains('open');

    // Toggle answer visibility
    faqItem.classList.toggle('open', !isOpen);

    // Update aria-expanded attribute
    question.setAttribute('aria-expanded', !isOpen);

    // Change the "+" to "-" on open
    const plusSign = question.querySelector('.faq-plus');
    plusSign.textContent = isOpen ? "+" : "-";
  });
});

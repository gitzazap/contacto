// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    // close mobile menu
    const mobile = document.getElementById('mobile-menu');
    if (!mobile.classList.contains('hidden')) mobile.classList.add('hidden');
    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: 'smooth'
    });
  });
});

// Animate on scroll
function animateOnScroll() {
  document.querySelectorAll('.feature-card, .floating').forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add('fade-in-up');
    }
  });
}

// initial + on scroll
animateOnScroll();
window.addEventListener('scroll', animateOnScroll);

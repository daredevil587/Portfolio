document.addEventListener('DOMContentLoaded', () => {
  /* ===== Typing effect (type + pause + delete, loop) ===== */
  const typingElement = document.getElementById('typing-name');
  const cursorEl = document.querySelector('.typing-cursor');
  const names = ['Uttam Yadav'];
  let nameIndex = 0;
  let charIndex = 0;
  const typingSpeed = 100;  
     // ms per char
  
  const pauseAfterType = 1555; // ms to pause after typing full text
  const pauseAfterDelete = 400;

  function startTypingLoop() {
    const current = names[nameIndex];
    if (charIndex <= current.length) {
      typingElement.textContent = current.slice(0, charIndex);
      charIndex++;
      setTimeout(startTypingLoop, typingSpeed);
      return;
    }
    setTimeout(() => {
      deleteLoop();
    }, pauseAfterType);
  }

  function deleteLoop() {
    const current = names[nameIndex];
    if (charIndex > 0) {
      charIndex--;
      typingElement.textContent = current.slice(0, charIndex);
      setTimeout(deleteLoop, deletingSpeed);
      return;
    }
    nameIndex = (nameIndex + 1) % names.length;
    setTimeout(startTypingLoop, pauseAfterDelete);
  }

  charIndex = 0;
  startTypingLoop();

  cursorEl.style.visibility = 'visible';

  /* ===== Navbar hide on scroll ===== */
  let lastScrollY = window.scrollY;
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      navbar.classList.add("navbar--hidden");
    } else {
      navbar.classList.remove("navbar--hidden");
    }
    lastScrollY = window.scrollY;
  });

  /* ===== Footer year ===== */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ===== Mobile nav toggle ===== */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('show'));
    });
  }

  /* ===== Contact form (Formspree) ===== */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('form-status');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      formStatus.textContent = 'Sending...';
      formStatus.classList.remove('error');

      const formData = new FormData(contactForm);

      try {
        const response = await fetch('https://formspree.io/f/mvgqdwwv', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          formStatus.textContent = 'Thank you! I will contact you soon.';
          contactForm.reset();
        } else {
          const data = await response.json().catch(() => ({}));
          formStatus.textContent = data.error ? `Error: ${data.error}` : 'Oops! Something went wrong.';
          formStatus.classList.add('error');
        }
      } catch (error) {
        formStatus.textContent = 'Network error. Please check your connection and try again.';
        formStatus.classList.add('error');
        console.error('Form submission error:', error);
      }
    });
  }
});

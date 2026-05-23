/* ===================================================
   SKAVIGO LOGISTICS — Interaction Layer
   Pure JS · No Dependencies
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Preloader ──────────────────────────────────
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 1400); // matches the bar-fill animation duration
    });
    // Fallback: hide after 3s no matter what
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 3000);
  }

  // ─── Navbar & Progress Scroll Effect ──────────────
  const navbar = document.querySelector('.navbar');
  const readingProgress = document.getElementById('readingProgress');

  const handleScroll = () => {
    // Navbar glass effect
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Reading Progress Bar
    if (readingProgress) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      readingProgress.style.width = scrolled + '%';
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run on load too

  // ─── Mobile Menu ────────────────────────────────
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.navbar-links');
  const overlay = document.querySelector('.mobile-overlay');

  const closeMenu = () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    menuToggle.classList.add('active');
    navLinks.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close mobile menu on link click — delay to allow navigation
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        closeMenu();
        // Allow menu close transition, then scroll
        setTimeout(() => {
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      } else {
        closeMenu();
      }
    });
  });

  // ─── Hero Carousel (Crossfade) ──────────────────
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.hero-indicator');
  const heroTexts = document.querySelectorAll('.hero-text');
  let currentSlide = 0;
  let slideInterval;

  const goToSlide = (index) => {
    slides.forEach(s => s.classList.remove('active'));
    indicators.forEach(i => i.classList.remove('active'));
    heroTexts.forEach(t => t.classList.remove('active'));

    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    heroTexts[index].classList.add('active');
    currentSlide = index;
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  if (slides.length > 0) {
    slideInterval = setInterval(nextSlide, 5000);

    indicators.forEach((indicator, idx) => {
      indicator.addEventListener('click', () => {
        clearInterval(slideInterval);
        goToSlide(idx);
        slideInterval = setInterval(nextSlide, 5000);
      });
    });
  }

  // ─── Hero Parallax Effect ──────────────────────
  const heroSlides = document.querySelector('.hero-slides');
  if (heroSlides) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroSlides.style.transform = `translateY(${scrolled * 0.35}px)`;
      }
    }, { passive: true });
  }

  // ─── Scroll Reveal Animations (with stagger) ────
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Check if this is a grid container with card children
        const cards = entry.target.querySelectorAll('.card, .service-card, .stat-item, .industry-item');
        if (cards.length > 0) {
          cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            // Trigger stagger after a small delay
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              });
            });
          });
        }
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ─── Stats Counter Animation ────────────────────
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsCounted = false;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2500; // 2.5 seconds
    const startTime = performance.now();
    const chars = '0123456789X$Y@#';

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      // Cybernetic Scramble effect on the last 20% of the target before it locks in
      if (progress < 0.8) {
        let scambled = '';
        const len = current.toString().length;
        for (let i = 0; i < len; i++) {
          scambled += chars[Math.floor(Math.random() * chars.length)];
        }
        el.textContent = scambled;
      } else {
        el.textContent = current.toLocaleString();
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target.toLocaleString(); // lock final
      }
    };

    requestAnimationFrame(updateCounter);
  };

  if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsCounted) {
          statsCounted = true;
          statNumbers.forEach(el => animateCounter(el));
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      statsObserver.observe(statsSection);
    }
  }

  // ─── Back to Top Button ──────────────────────────
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── FAQ Accordion ────────────────────────────────
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      
      // Close all others
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ─── Dynamic Copyright Year ─────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ─── Theme Toggle (Dark Mode) ─────────────────────
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');

  const setTheme = (isDark) => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
      localStorage.setItem('theme', 'light');
    }
  };

  // Check saved theme
  if (localStorage.getItem('theme') === 'dark') {
    setTheme(true);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.hasAttribute('data-theme');
      setTheme(!isDark);
    });
  }

  // ─── Custom Language Selector ─────────────────────
  const langToggle = document.getElementById('langToggle');
  const langDropdown = document.getElementById('langDropdown');
  const langOptions = document.querySelectorAll('.lang-option');
  const langNotification = document.getElementById('langNotification');

  // Helper: trigger Google Translate with retry/polling
  function triggerGoogleTranslate(lang) {
    const maxAttempts = 20;
    let attempt = 0;

    function tryTranslate() {
      const gtCombo = document.querySelector('.goog-te-combo');
      if (gtCombo) {
        gtCombo.value = lang;
        gtCombo.dispatchEvent(new Event('change'));
        // Verify it actually changed
        setTimeout(() => {
          if (gtCombo.value !== lang) {
            gtCombo.value = lang;
            gtCombo.dispatchEvent(new Event('change'));
          }
        }, 300);
      } else if (attempt < maxAttempts) {
        attempt++;
        setTimeout(tryTranslate, 250);
      } else {
        // Last resort: set cookie and reload
        document.cookie = `googtrans=/en/${lang}; path=/;`;
        document.cookie = `googtrans=/en/${lang}; path=/; domain=.${window.location.hostname};`;
        window.location.reload();
      }
    }

    tryTranslate();
  }

  // Helper: Read active language from cookie on page load
  function initLanguageSelection() {
    const match = document.cookie.match(/(^|;) ?googtrans=([^;]*)(;|$)/);
    let currentLang = 'en'; // default
    if (match && match[2]) {
      const parts = match[2].split('/');
      if (parts.length > 2) {
        currentLang = parts[2];
      }
    }

    // Update active class in dropdown based on cookie
    if (langOptions.length > 0) {
      langOptions.forEach(opt => opt.classList.remove('active'));
      const activeOption = Array.from(langOptions).find(opt => opt.getAttribute('data-lang') === currentLang);
      if (activeOption) {
        activeOption.classList.add('active');
      } else {
        // Fallback to English if not found
        const enOption = Array.from(langOptions).find(opt => opt.getAttribute('data-lang') === 'en');
        if (enOption) enOption.classList.add('active');
      }
    }
  }

  initLanguageSelection();

  if (langToggle && langDropdown) {
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('open');
      // Hide notification on first click
      if (langNotification) {
        langNotification.style.display = 'none';
      }
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.lang-selector')) {
        langDropdown.classList.remove('open');
      }
    });

    langOptions.forEach(option => {
      option.addEventListener('click', () => {
        const lang = option.getAttribute('data-lang');

        // Update active state
        langOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        langDropdown.classList.remove('open');

        if (lang === 'en') {
          // 1. Clear Local and Session Storage where Google sometimes caches the lang
          try {
            window.localStorage.removeItem('googtrans');
            window.localStorage.clear(); // Aggressive but safe for this site
            window.sessionStorage.removeItem('googtrans');
            window.sessionStorage.clear();
          } catch(e) {}

          // 2. Clear cookies aggressively across all scopes
          const domains = [
            window.location.hostname,
            '.' + window.location.hostname,
            window.location.hostname.replace(/^www\./, ''),
            '.' + window.location.hostname.replace(/^www\./, ''),
            '' // no domain specified
          ];
          
          const paths = ['/', window.location.pathname, ''];

          domains.forEach(d => {
            paths.forEach(p => {
              const domainStr = d ? `; domain=${d}` : '';
              const pathStr = p ? `; path=${p}` : '';
              // Try to delete it
              document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT${domainStr}${pathStr}`;
              // Force overwrite it to English just in case deletion is blocked by the browser
              document.cookie = `googtrans=/en/en${domainStr}${pathStr}`;
            });
          });

          // 3. Try to use the native combo box to reset
          try {
            const gtCombo = document.querySelector('.goog-te-combo');
            if (gtCombo) {
              gtCombo.value = '';
              gtCombo.dispatchEvent(new Event('change'));
            }
          } catch(e) {}

          // 4. Reload page without any hashes or search params that might trigger translation
          setTimeout(() => {
            window.location.href = window.location.pathname;
          }, 300);
          
          return;
        }

        // Set cookies first
        document.cookie = `googtrans=/en/${lang}; path=/;`;
        document.cookie = `googtrans=/en/${lang}; path=/; domain=.${window.location.hostname};`;

        // Trigger Google Translate
        triggerGoogleTranslate(lang);
      });
    });
  }

  // ─── Magnetic Buttons ─────────────────────────────
  const magnets = document.querySelectorAll('.magnetic');
  magnets.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // pull max 15px
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // ─── 3D Card Tilt ────────────────────────────────
  const tiltCards = document.querySelectorAll('.card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate rotation (max 10 degrees)
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });

  // ─── Global Node Network Canvas ──────────────────
  const canvas = document.getElementById('nodeNetwork');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    const resize = () => {
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
      }
      draw() {
        ctx.fillStyle = 'rgba(1, 152, 99, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      update() {
        if (mouse.x != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = mouse.radius;
          let force = (maxDistance - distance) / maxDistance;
          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;

          if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
          } else {
            if (this.x !== this.baseX) {
              let dx = this.x - this.baseX;
              this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
              let dy = this.y - this.baseY;
              this.y -= dy / 10;
            }
          }
        }
      }
    }

    const initParticles = () => {
      particles = [];
      const numberOfNodes = (width * height) / 15000;
      for (let i = 0; i < numberOfNodes; i++) {
        particles.push(new Particle());
      }
    };

    const connectNodes = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)) +
            ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
          if (distance < (width / 8) * (height / 8)) {
            let opacityValue = 1 - (distance / 15000);
            ctx.strokeStyle = `rgba(1, 152, 99, ${opacityValue})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    const animateNodes = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      connectNodes();
      requestAnimationFrame(animateNodes);
    };

    // Delay init slightly to let CSS grid lay out
    setTimeout(() => {
      resize();
      animateNodes();
    }, 100);
  }

  // ─── Contact Form Handling ───────────────────────
  const contactForm = document.getElementById('skavigoContactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      // If the user hasn't replaced the Formspree ID, prevent actual submission for testing
      if (contactForm.action.includes('YOUR_FORMSPREE_ID')) {
        e.preventDefault();
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerText;

        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerText = originalText;
          submitBtn.disabled = false;
          formStatus.innerText = 'Message sent successfully! (Test Mode)';
          formStatus.style.display = 'block';
          contactForm.reset();

          setTimeout(() => {
            formStatus.style.display = 'none';
          }, 4000);
        }, 1500);
      }
      // Else, let Formspree handle it normally
    });
  }

  // ─── Hero Tracking Form Handling ─────────────────
  const trackingForm = document.getElementById('heroTrackingForm');
  const trackingMsg = document.getElementById('trackingMsg');

  if (trackingForm) {
    trackingForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent page reload

      const trackingInput = trackingForm.querySelector('input');
      const submitBtn = trackingForm.querySelector('button');
      const originalText = submitBtn.innerText;

      submitBtn.innerText = 'Searching...';
      submitBtn.disabled = true;
      trackingMsg.style.display = 'none';

      // Simulate network request
      setTimeout(() => {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;

        const dummyStatuses = [
          "Tracking API Connected — Status: In Transit",
          "Tracking API Connected — Status: Awaiting Customs",
          "Tracking API Connected — Status: Pending Dispatch",
          "Advanced Tracking Portal Coming Soon!"
        ];
        const randomStatus = dummyStatuses[Math.floor(Math.random() * dummyStatuses.length)];
        trackingMsg.innerText = randomStatus;

        // Show the message
        trackingMsg.style.display = 'block';

        // Hide message after 5 seconds
        setTimeout(() => {
          trackingMsg.style.display = 'none';
          trackingInput.value = '';
          trackingMsg.innerText = 'Advanced Tracking Portal Coming Soon!'; // Reset
        }, 5000);
      }, 1200);
    });
  }

});

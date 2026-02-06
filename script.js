
document.addEventListener('DOMContentLoaded', function() {
  // ============================================
  // Reading Progress Indicator
  // ============================================
  const readingProgress = document.querySelector('.reading-progress-fill');

  function updateReadingProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;

    readingProgress.style.width = progress + '%';
    readingProgress.parentElement.setAttribute('aria-valuenow', Math.round(progress));
  }

  window.addEventListener('scroll', updateReadingProgress);
  updateReadingProgress();

  // ============================================
  // Theme Toggle
  // ============================================
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.classList.add("dark-mode");
    updateThemeIcon("dark");
  } else {
    updateThemeIcon("light");
  }

  const themeToggle = document.querySelector('.theme-toggle');
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');

    if (isDark) {
      localStorage.setItem('theme', 'dark');
      updateThemeIcon("dark");
      themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      localStorage.setItem('theme', 'light');
      updateThemeIcon("light");
      themeToggle.setAttribute('aria-pressed', 'false');
    }
  });

  function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-toggle svg');
    const themeToggle = document.querySelector('.theme-toggle');

    if (theme === "dark") {
      themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
      themeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
      themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
      themeToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
      themeToggle.setAttribute('aria-pressed', 'false');
    }
  }
  
  // ============================================
  // Mobile Menu Toggle
  // ============================================
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  menuToggle.addEventListener('click', function() {
    const isOpen = menu.classList.toggle('open');
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  });
  
  // Close menu when clicking a link (mobile)
  const menuLinks = document.querySelectorAll('.menu a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      menu.classList.remove('open');
      menuToggle.classList.remove('active');
    });
  });
  
  // Highlight active menu item based on scroll position
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.menu a');
  
  function updateActiveLink() {
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
  
  // ============================================
  // Project Filters
  // ============================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');

      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Filter projects
      projectCards.forEach(card => {
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else {
          const tags = card.getAttribute('data-tags') || '';
          if (tags.includes(filter)) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        }
      });
    });
  });

  // ============================================
  // Read More Functionality
  // ============================================
  const readMoreButtons = document.querySelectorAll('.read-more-btn');

  readMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const description = this.closest('.project-description');
      const shortText = description.querySelector('.description-short');
      const fullText = description.querySelector('.description-full');

      if (fullText.style.display === 'none') {
        shortText.style.display = 'none';
        fullText.style.display = 'block';
        this.textContent = 'Leer menos';
        this.setAttribute('aria-label', 'Leer menos sobre este proyecto');
      } else {
        shortText.style.display = 'block';
        fullText.style.display = 'none';
        this.textContent = 'Leer más';
        this.setAttribute('aria-label', 'Leer más sobre este proyecto');
      }
    });
  });

  // ============================================
  // Skill Bars Animation
  // ============================================
  const animateElements = document.querySelectorAll('.skill-level');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  animateElements.forEach(element => {
    element.style.animationPlayState = 'paused';
    observer.observe(element);
  });
  
  // ============================================
  // Contact Form Validation & Handling
  // ============================================
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, textarea');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    // Validation rules
    const validationRules = {
      name: {
        required: true,
        minLength: 2,
        message: 'El nombre debe tener al menos 2 caracteres'
      },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Por favor ingresa un email válido'
      },
      subject: {
        required: true,
        minLength: 3,
        message: 'El asunto debe tener al menos 3 caracteres'
      },
      message: {
        required: true,
        minLength: 10,
        message: 'El mensaje debe tener al menos 10 caracteres'
      }
    };

    // Validate single field
    function validateField(field) {
      const fieldName = field.name;
      const fieldValue = field.value.trim();
      const rules = validationRules[fieldName];
      const errorElement = field.nextElementSibling;

      if (!rules) return true;

      // Required check
      if (rules.required && !fieldValue) {
        showError(field, errorElement, 'Este campo es obligatorio');
        return false;
      }

      // Min length check
      if (rules.minLength && fieldValue.length < rules.minLength) {
        showError(field, errorElement, rules.message);
        return false;
      }

      // Pattern check (for email)
      if (rules.pattern && !rules.pattern.test(fieldValue)) {
        showError(field, errorElement, rules.message);
        return false;
      }

      // Field is valid
      showSuccess(field, errorElement);
      return true;
    }

    function showError(field, errorElement, message) {
      field.classList.add('error');
      field.classList.remove('success');
      errorElement.textContent = message;
    }

    function showSuccess(field, errorElement) {
      field.classList.remove('error');
      field.classList.add('success');
      errorElement.textContent = '';
    }

    // Real-time validation
    formInputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });

      input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
          validateField(this);
        }
      });
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Validate all fields
      let isValid = true;
      formInputs.forEach(input => {
        if (!validateField(input)) {
          isValid = false;
        }
      });

      if (!isValid) {
        // Focus first error field
        const firstError = contactForm.querySelector('.error');
        if (firstError) firstError.focus();
        return;
      }

      // Show loading state
      const btnText = submitButton.querySelector('.btn-text');
      const btnLoading = submitButton.querySelector('.btn-loading');
      const successMessage = contactForm.querySelector('.form-success');

      btnText.style.display = 'none';
      btnLoading.style.display = 'flex';
      submitButton.disabled = true;

      // Simulate API call
      setTimeout(() => {
        // Hide loading
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitButton.disabled = false;

        // Show success message
        successMessage.style.display = 'flex';

        // Reset form
        contactForm.reset();
        formInputs.forEach(input => {
          input.classList.remove('success', 'error');
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 5000);
      }, 2000);
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ============================================
  // Image Slider
  // ============================================
  const sliderTrack = document.getElementById('sliderTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const sliderDots = document.getElementById('sliderDots');
  
  if (sliderTrack && prevBtn && nextBtn && sliderDots) {
    const slides = sliderTrack.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    
    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('slider-dot');
      dot.setAttribute('aria-label', `Ir a imagen ${index + 1}`);
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      sliderDots.appendChild(dot);
    });
    
    const dots = sliderDots.querySelectorAll('.slider-dot');
    
    function updateSlider() {
      sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      // Update dots
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }
    
    function goToSlide(index) {
      currentSlide = index;
      updateSlider();
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    }
    
    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
      nextSlide();
    });
    
    prevBtn.addEventListener('click', () => {
      prevSlide();
    });
    
    // Click on slide to advance
    slides.forEach((slide) => {
      slide.style.cursor = 'pointer';
      slide.addEventListener('click', () => {
        nextSlide();
      });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    });
  }
});

  // ============================================
  // Image Modal
  // ============================================
  const galeriaItems = document.querySelectorAll('.galeria-item img');
  
  if (galeriaItems.length > 0) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = '<img src="" alt="">';
    document.body.appendChild(modal);
    
    const modalImg = modal.querySelector('img');
    
    galeriaItems.forEach(img => {
      img.addEventListener('click', function(e) {
        e.stopPropagation();
        modalImg.src = this.src;
        modalImg.alt = this.alt;
        modal.classList.add('active');
      });
    });
    
    modal.addEventListener('click', function() {
      this.classList.remove('active');
    });
  }


// ============================================
// Toggle Dropdown
// ============================================
function toggleDropdown(id) {
  console.log('Toggling dropdown for', id);
  const el = document.getElementById(id);
  if (el) {
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
    console.log('Display set to', el.style.display);
  } else {
    console.log('Element with id', id, 'not found');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // ==== POPUP DESACTIVADO temporalmente (restaurar quitando los comentarios) ====
  // const popup = document.getElementById('first-popup');
  // const popupClose = document.querySelector('.popup-close');
  // const popupImage = document.querySelector('.popup-image');
  //
  // // Function to show popup
  // function showPopup() {
  //   if (popup) {
  //     popup.classList.add('active');
  //     popup.setAttribute('aria-hidden', 'false');
  //   }
  // }
  //
  // // Show popup on page load (remove localStorage check for testing)
  // showPopup();
  //
  // // Close popup functions
  // function closePopup() {
  //   if (popup) {
  //     popup.classList.remove('active');
  //     popup.setAttribute('aria-hidden', 'true');
  //   }
  // }
  //
  // // Close popup when clicking on the link
  // const popupLink = document.querySelector('.popup-link');
  // if (popupLink) {
  //   popupLink.addEventListener('click', function() {
  //     closePopup();
  //   });
  // }
  //
  // // Close on button click
  // if (popupClose) {
  //   popupClose.addEventListener('click', closePopup);
  // }
  //
  // // Close on action button click
  // const popupAction = document.querySelector('.popup-action');
  // if (popupAction) {
  //   popupAction.addEventListener('click', function() {
  //     closePopup();
  //   });
  // }
  //
  // // Close on clicking outside the image
  // if (popup) {
  //   popup.addEventListener('click', function(e) {
  //     if (e.target === popup) {
  //       closePopup();
  //     }
  //   });
  // }
  //
  // // Close on Escape key
  // document.addEventListener('keydown', function(e) {
  //   if (e.key === 'Escape' && popup && popup.classList.contains('active')) {
  //     closePopup();
  //   }
  // });
  //
  // // Also show popup when clicking on INICIO menu link
  // const inicioLink = document.querySelector('a[href="#inicio"]');
  // if (inicioLink) {
  //   inicioLink.addEventListener('click', function(e) {
  //     showPopup();
  //   });
  // }
  // ==== FIN POPUP DESACTIVADO ====

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
  // Publicaciones search + detail view
  const publicacionesGrid = document.getElementById('publicacionesGrid');
  const searchInput = document.getElementById('searchPublicaciones');
  const categoryButtons = document.querySelectorAll('.filter-publicacion');
  const resultCount = document.getElementById('resultCount');
  const resultList = document.getElementById('resultList');
  const modal = document.getElementById('publicacionModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDate = document.getElementById('modalDate');
  const modalImage = document.getElementById('modalImage');
  const modalBody = document.getElementById('modalBody');
  const modalCategory = document.getElementById('modalCategory');
  const closeModalBtn = document.querySelector('.close-modal-btn');

  function updateResultCount() {
    const visibleCards = document.querySelectorAll('.noticias-grid .noticia-card:not(.hidden)');
    const count = visibleCards.length;
    const hasActiveFilter = (document.querySelector('.filter-publicacion.active')?.dataset.filter !== 'all') || (searchInput?.value.trim().length > 0);

    if (resultCount) {
      if (hasActiveFilter) {
        if (count === 0) {
          resultCount.textContent = 'No se encontraron publicaciones';
        } else {
          resultCount.textContent = `${count} publicación${count === 1 ? '' : 'es'} encontrada${count === 1 ? '' : 's'}`;
        }
      } else {
        resultCount.textContent = '';
      }
    }

    if (resultList) {
      if (hasActiveFilter && count > 0) {
        resultList.innerHTML = '';
        visibleCards.forEach(card => {
          const title = card.dataset.title;
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = '#';
          a.textContent = title;
          a.addEventListener('click', function(e) {
            e.preventDefault();
            // Simular clic en el botón de la tarjeta
            const button = card.querySelector('.ver-publicacion');
            if (button) button.click();
          });
          li.appendChild(a);
          resultList.appendChild(li);
        });
        resultList.style.display = 'block';
      } else {
        resultList.style.display = 'none';
      }
    }
  }

  function filterPublicaciones() {
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const activeCategoryButton = document.querySelector('.filter-publicacion.active');
    const category = activeCategoryButton ? activeCategoryButton.dataset.filter : 'all';

    document.querySelectorAll('.noticias-grid .noticia-card').forEach(card => {
      const title = card.dataset.title.toLowerCase();
      const categoryValue = card.dataset.category.toLowerCase();
      const contentText = card.querySelector('.full-content')?.textContent.toLowerCase() || '';
      const matchesSearch = !searchTerm || title.includes(searchTerm) || contentText.includes(searchTerm);
      const matchesCategory = category === 'all' || categoryValue === category;

      if (matchesSearch && matchesCategory) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });

    // Siempre mostrar el grid
    if (publicacionesGrid) {
      publicacionesGrid.style.display = 'grid';
    }

    updateResultCount();
    visibleCount = 4; // Reset paginación al filtrar
    updateVisibleCards(); // Reset paginación después de filtrar
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterPublicaciones);
  }

  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      filterPublicaciones();
    });
  });

  if (publicacionesGrid) {
    publicacionesGrid.addEventListener('click', function(e) {
      const card = e.target.closest('.noticia-card');
      if (!card) return;
      const actionButton = e.target.closest('.ver-publicacion');
      if (!actionButton) return;
      e.preventDefault();

      const image = card.querySelector('.noticia-imagen img');
      const title = card.dataset.title;
      const date = card.querySelector('.noticia-fecha').textContent;
      const category = card.dataset.category;
      const content = card.querySelector('.full-content')?.innerHTML || '';
      const altText = image ? image.alt : title;
      const imageUrl = image ? image.src : '';

      if (modal) {
        modalTitle.textContent = title;
        modalDate.textContent = date;
        modalCategory.textContent = category.replace('-', ' ');
        modalImage.src = imageUrl;
        modalImage.alt = altText;
        modalBody.innerHTML = content;
        modal.classList.remove('hidden');
      }
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', function() {
      modal.classList.add('hidden');
    });
  }

  // Cerrar modal al hacer clic fuera
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });

    // Cerrar con Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        modal.classList.add('hidden');
      }
    });
  }

  filterPublicaciones();

  // ============================================
  // Ver más publicaciones
  const verMasBtn = document.getElementById('verMasBtn');
  let visibleCount = 4; // Inicialmente mostrar 4

  function updateVisibleCards() {
    const allVisibleCards = document.querySelectorAll('.noticias-grid .noticia-card:not(.hidden)');
    allVisibleCards.forEach((card, index) => {
      if (index < visibleCount) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    // Ocultar botón si ya se mostraron todas las visibles
    if (verMasBtn) {
      verMasBtn.style.display = visibleCount >= allVisibleCards.length ? 'none' : 'block';
    }
  }

  if (verMasBtn) {
    verMasBtn.addEventListener('click', function() {
      visibleCount += 4; // Mostrar 4 más
      updateVisibleCards();
    });
  }

  // Inicializar mostrando solo las primeras 4
  updateVisibleCards();
  
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
  // Toggle Section Visibility (noticia1-8)
  // ============================================
  const toggleSections = ['noticia1', 'noticia2', 'noticia3', 'noticia4', 'noticia5', 'noticia6', 'noticia7', 'noticia8'];
  
  toggleSections.forEach(sectionId => {
    const toggleLink = document.querySelector(`a[href="#${sectionId}"]`);
    const section = document.querySelector(`#${sectionId}`);
    
    if (toggleLink && section) {
      // Get the close button that exists in the HTML
      const closeBtn = section.querySelector('.close-noticia-btn');
      
      // Hide the section initially
      section.style.display = 'none';
      
      // Toggle on link click
      toggleLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (section.style.display === 'none') {
          // Hide all other toggle sections first
          toggleSections.forEach(id => {
            const otherSection = document.querySelector(`#${id}`);
            if (otherSection && otherSection !== section) {
              otherSection.style.display = 'none';
            }
          });
          
          section.style.display = 'block';
          // Scroll to the section
          window.scrollTo({
            top: section.offsetTop - 70,
            behavior: 'smooth'
          });
        } else {
          section.style.display = 'none';
        }
      });
      
      // Close on button click
      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          section.style.display = 'none';
        });
      }
    }
  });

  // Generic handler for all smart-card dropdowns
  function toggleSmartCardDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const btn = document.querySelector(`[data-dropdown="${dropdownId}"]`);
    if (!dropdown) return;
    const isOpen = dropdown.style.display === 'none' || dropdown.style.display === '';
    dropdown.style.display = isOpen ? 'block' : 'none';
    if (btn) {
      btn.classList.toggle('open', isOpen);
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
  }

  // Wire up all dropdown buttons
  document.querySelectorAll('[data-dropdown]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      toggleSmartCardDropdown(this.getAttribute('data-dropdown'));
    });
  });

  // Wire up all toggle images
  document.querySelectorAll('img[data-toggle]').forEach(function(img) {
    img.addEventListener('click', function() {
      toggleSmartCardDropdown(this.getAttribute('data-toggle'));
    });
  });

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

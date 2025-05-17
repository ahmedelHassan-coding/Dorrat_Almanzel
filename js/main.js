// Main JavaScript for CleanQatar Website

// DOM Elements
const header = document.getElementById('header');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const langToggle = document.getElementById('langToggle');
const mobileLangToggle = document.getElementById('mobileLangToggle');
const testimonialContainer = document.getElementById('testimonials-container');
const prevBtn = document.querySelector('.testimonial-btn.prev');
const nextBtn = document.querySelector('.testimonial-btn.next');
const accordionItems = document.querySelectorAll('.accordion-item');
const modalCloseButtons = document.querySelectorAll('.close-modal, .modal-btn');
const modals = document.querySelectorAll('.modal');

// Variables
let currentSlide = 0;
const totalSlides = testimonialContainer ? testimonialContainer.children.length : 0;
let isArabic = false;

// Initialize Animation on Scroll functionality
function initAOS() {
  const aosElements = document.querySelectorAll('[data-aos]');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  aosElements.forEach(element => {
    observer.observe(element);
    
    // Apply delay if specified
    if (element.dataset.aosDelay) {
      element.style.transitionDelay = `${parseInt(element.dataset.aosDelay) / 1000}s`;
    }
  });
}

// Header Scroll Effect
function handleScroll() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  mobileMenu.classList.toggle('open');
  
  // Toggle hamburger menu icon
  const spans = mobileMenuToggle.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
}

// Language Toggle
function toggleLanguage() {
  isArabic = !isArabic;
  if (isArabic) {
    document.body.style.direction = 'rtl';
    langToggle.textContent = 'English';
    mobileLangToggle.textContent = 'English';
    // Here you would load Arabic translations
  } else {
    document.body.style.direction = 'ltr';
    langToggle.textContent = 'العربية';
    mobileLangToggle.textContent = 'العربية';
  }
}

// Testimonial Slider
function showTestimonial(index) {
  if (!testimonialContainer) return;
  
  if (index >= totalSlides) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = totalSlides - 1;
  } else {
    currentSlide = index;
  }
  
  testimonialContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextTestimonial() {
  showTestimonial(currentSlide + 1);
}

function prevTestimonial() {
  showTestimonial(currentSlide - 1);
}

// Auto-play testimonials
let testimonialInterval;
function startTestimonialAutoplay() {
  if (!testimonialContainer) return;
  testimonialInterval = setInterval(() => {
    nextTestimonial();
  }, 5000);
}

function stopTestimonialAutoplay() {
  clearInterval(testimonialInterval);
}

// Accordion functionality
function toggleAccordion() {
  const parent = this.parentElement;
  
  // Close all other accordions
  accordionItems.forEach(item => {
    if (item !== parent && item.classList.contains('active')) {
      item.classList.remove('active');
    }
  });
  
  // Toggle current accordion
  parent.classList.toggle('active');
}

// Handle URL parameters for page loads
function handleUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  
  // Handle service selection on booking page
  const serviceParam = urlParams.get('service');
  const serviceSelect = document.getElementById('service');
  if (serviceParam && serviceSelect) {
    serviceSelect.value = serviceParam;
  }
  
  // Handle package selection on booking page
  const packageParam = urlParams.get('package');
  const packageSelect = document.getElementById('package');
  if (packageParam && packageSelect) {
    packageSelect.value = packageParam;
  }
}

// Modal functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
}

function closeModal() {
  modals.forEach(modal => {
    modal.classList.remove('open');
  });
  document.body.style.overflow = ''; // Re-enable scrolling
}

// Process checkout form submission
function processFormSubmit(event, formId, successModalId) {
  event.preventDefault();
  
  // Get form data
  const form = document.getElementById(formId);
  if (!form) return;
  
  const formData = new FormData(form);
  const formObject = {};
  
  formData.forEach((value, key) => {
    formObject[key] = value;
  });
  
  // Here you would typically send the data to a server
  console.log('Form Submitted:', formObject);
  
  // Show success modal
  openModal(successModalId);
  
  // Reset form
  form.reset();
  
  // For demo purposes, we're just simulating success
  return false;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  initAOS();
  
  // Start testimonial autoplay
  startTestimonialAutoplay();
  
  // Handle URL parameters
  handleUrlParams();
  
  // Scroll event
  window.addEventListener('scroll', handleScroll);
  
  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }
  
  // Language toggle
  if (langToggle) {
    langToggle.addEventListener('click', toggleLanguage);
  }
  
  if (mobileLangToggle) {
    mobileLangToggle.addEventListener('click', toggleLanguage);
  }
  
  // Testimonial slider buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevTestimonial();
      stopTestimonialAutoplay();
      startTestimonialAutoplay();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextTestimonial();
      stopTestimonialAutoplay();
      startTestimonialAutoplay();
    });
  }
  
  // Accordion
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', toggleAccordion);
    }
  });
  
  // Modal close buttons
  modalCloseButtons.forEach(button => {
    button.addEventListener('click', closeModal);
  });
  
  // Close modal when clicking outside
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  });
  
  // Escape key to close modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});

// Export for use in other modules
export { processFormSubmit, openModal };
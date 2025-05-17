// Contact page functionality

import { processFormSubmit } from './main.js';

// DOM Elements
const contactForm = document.getElementById('contactForm');

// Handle contact form submission
function handleContactSubmit(e) {
  return processFormSubmit(e, 'contactForm', 'successModal');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
});
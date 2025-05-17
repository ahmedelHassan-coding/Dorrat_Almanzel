// Booking page functionality

import { processFormSubmit } from './main.js';

// DOM Elements
const bookingForm = document.getElementById('bookingForm');
const dateInput = document.getElementById('date');
const serviceSelect = document.getElementById('service');
const packageSelect = document.getElementById('package');

// Set minimum date for booking to tomorrow
function setMinDate() {
  if (!dateInput) return;
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Format date as YYYY-MM-DD
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  
  dateInput.min = `${year}-${month}-${day}`;
}

// Handle form submission
function handleBookingSubmit(e) {
  return processFormSubmit(e, 'bookingForm', 'successModal');
}

// Handle service selection changes
function handleServiceChange() {
  if (!packageSelect) return;
  
  // Reset package select when service changes
  packageSelect.value = '';
  
  // Could potentially update available packages based on the service
  // For example, showing only relevant packages for the selected service
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Set minimum date for booking
  setMinDate();
  
  // Booking form submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', handleBookingSubmit);
  }
  
  // Service selection change
  if (serviceSelect) {
    serviceSelect.addEventListener('change', handleServiceChange);
  }
});
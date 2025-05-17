// Reviews page functionality

import { processFormSubmit, openModal } from './main.js';

// DOM Elements
const reviewForm = document.getElementById('reviewForm');
const filterButtons = document.querySelectorAll('.filter-btn');
const reviewCards = document.querySelectorAll('.review-card');
const paginationButtons = document.querySelectorAll('.pagination-btn');

// Handle review form submission
function handleReviewSubmit(e) {
  return processFormSubmit(e, 'reviewForm', 'successModal');
}

// Filter reviews by category
function filterReviews(category) {
  reviewCards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Handle star rating interaction
function initStarRating() {
  const stars = document.querySelectorAll('.star-rating input');
  const starLabels = document.querySelectorAll('.star-rating label');
  
  stars.forEach((star, index) => {
    star.addEventListener('change', () => {
      const rating = star.value;
      console.log('Selected rating:', rating);
    });
  });
  
  // Reset stars on form reset
  if (reviewForm) {
    reviewForm.addEventListener('reset', () => {
      stars.forEach(star => {
        star.checked = false;
      });
    });
  }
}

// Initialize photo upload preview
function initPhotoUpload() {
  const photoInput = document.querySelector('input[type="file"]');
  if (!photoInput) return;
  
  photoInput.addEventListener('change', (e) => {
    const files = e.target.files;
    if (files.length > 3) {
      alert('You can upload a maximum of 3 photos');
      e.target.value = '';
    } else {
      console.log(`${files.length} photos selected`);
      // Here you would typically implement a preview functionality
    }
  });
}

// Handle pagination
function handlePagination(pageNum) {
  // Highlight active page button
  paginationButtons.forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Set clicked button as active
  this.classList.add('active');
  
  // Here you would typically fetch and display reviews for the selected page
  console.log(`Loading page ${pageNum || this.textContent}`);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Review form submission
  if (reviewForm) {
    reviewForm.addEventListener('submit', handleReviewSubmit);
  }
  
  // Filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      this.classList.add('active');
      
      // Filter reviews
      const category = this.dataset.filter;
      filterReviews(category);
    });
  });
  
  // Pagination buttons
  paginationButtons.forEach(button => {
    button.addEventListener('click', handlePagination);
  });
  
  // Initialize star rating
  initStarRating();
  
  // Initialize photo upload
  initPhotoUpload();
});
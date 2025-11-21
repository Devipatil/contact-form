// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get form and input elements
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  // Error message containers
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  // Success message container
  const successMessage = document.getElementById('success-message');

  // Email regex pattern (simple and effective)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  // Helper function to check if string contains digits
  function containsDigits(str) {
    return /\d/.test(str);
  }

  // Clears error message and styling for inputs
  function clearError(inputEl, errorEl) {
    inputEl.classList.remove('invalid');
    errorEl.textContent = '';
  }

  // Shows error message and adds red border
  function showError(inputEl, errorEl, message) {
    inputEl.classList.add('invalid');
    errorEl.textContent = message;
  }

  // Validate form fields based on rules
  function validateForm() {
    let valid = true;

    // Validate Name (not empty & no digits)
    if (nameInput.value.trim() === '') {
      showError(nameInput, nameError, 'Name cannot be empty.');
      valid = false;
    } else if (containsDigits(nameInput.value.trim())) {
      showError(nameInput, nameError, 'Name cannot contain numbers.');
      valid = false;
    } else {
      clearError(nameInput, nameError);
    }

    // Validate Email (not empty & matches regex)
    const emailVal = emailInput.value.trim();
    if (emailVal === '') {
      showError(emailInput, emailError, 'Email cannot be empty.');
      valid = false;
    } else if (!emailRegex.test(emailVal)) {
      showError(emailInput, emailError, 'Please enter a valid email address.');
      valid = false;
    } else {
      clearError(emailInput, emailError);
    }

    // Validate Message (not empty)
    if (messageInput.value.trim() === '') {
      showError(messageInput, messageError, 'Message cannot be empty.');
      valid = false;
    } else {
      clearError(messageInput, messageError);
    }

    return valid;
  }

  // On form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submit action

    // Hide previous success message
    successMessage.style.display = 'none';
    successMessage.textContent = '';

    if (validateForm()) {
      // If all validations pass

      // Show success message
      successMessage.textContent = 'Message sent successfully!';
      successMessage.style.display = 'block';

      // Clear input fields
      form.reset();

      // Remove error styles if any left
      [nameInput, emailInput, messageInput].forEach(input => input.classList.remove('invalid'));
      [nameError, emailError, messageError].forEach(errorEl => (errorEl.textContent = ''));

      // Hide success message after 3.5 seconds
      setTimeout(() => {
        successMessage.style.display = 'none';
        successMessage.textContent = '';
      }, 3500);
    }
  });

  // Remove error message on input to improve UX
  [nameInput, emailInput, messageInput].forEach((inputEl, index) => {
    inputEl.addEventListener('input', () => {
      switch (index) {
        case 0: clearError(nameInput, nameError); break;
        case 1: clearError(emailInput, emailError); break;
        case 2: clearError(messageInput, messageError); break;
      }
    });
  });
});

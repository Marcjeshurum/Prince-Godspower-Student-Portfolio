/**
 * COS 106 – Introduction to Web Technologies | Practical Term Project
 * Student: Prince Chimenem Godspower
 * File: js/contact.js
 * Description: Client-side contact form validation with inline error messaging,
 * regex evaluation, accessibility feedback, and animated confirmation dispatch.
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const phoneInput = document.getElementById('contact-phone');
  const messageInput = document.getElementById('contact-message');
  const successBanner = document.getElementById('contact-success-banner');

  // Regex patterns
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Phone: allows optional leading + for international code, followed strictly by digits (7 to 15 digits)
  const phoneRegex = /^\+?[0-9]{7,15}$/;

  // Form submit handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isValid = true;

    // 1. Validate Name (Not empty, minimum 2 characters)
    const nameVal = nameInput.value.trim();
    if (!nameVal) {
      showError(nameInput, 'Full name is required.');
      isValid = false;
    } else if (nameVal.length < 2) {
      showError(nameInput, 'Name must be at least 2 characters.');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // 2. Validate Email (Not empty and valid email format)
    const emailVal = emailInput.value.trim();
    if (!emailVal) {
      showError(emailInput, 'Email address is required.');
      isValid = false;
    } else if (!emailRegex.test(emailVal)) {
      showError(emailInput, 'Please enter a valid email format (e.g., name@domain.com).');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // 3. Validate Phone Number (Not empty and contains only digits)
    const phoneVal = phoneInput.value.trim().replace(/[\s-]/g, ''); // strip optional spaces/hyphens for test
    if (!phoneVal) {
      showError(phoneInput, 'Phone number is required.');
      isValid = false;
    } else if (!phoneRegex.test(phoneVal)) {
      showError(phoneInput, 'Phone number must contain only numbers (e.g. +2349169263029 or 08012345678).');
      isValid = false;
    } else {
      clearError(phoneInput);
    }

    // 4. Validate Message (Not empty, minimum 10 characters)
    const messageVal = messageInput.value.trim();
    if (!messageVal) {
      showError(messageInput, 'Message cannot be empty.');
      isValid = false;
    } else if (messageVal.length < 10) {
      showError(messageInput, 'Please provide at least 10 characters for your inquiry.');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    // If validation fails, halt execution
    if (!isValid) return;

    // Web3Forms API Submission
    const submitBtn = document.getElementById('contact-submit-btn') || form.querySelector('button[type="submit"]');
    const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '<span>Dispatch Message</span>';
    
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        <span>Sending Message...</span>
      `;
    }

    try {
      const formData = new FormData(form);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (successBanner) {
          successBanner.style.display = 'block';
          successBanner.style.backgroundColor = 'rgba(16, 185, 129, 0.12)';
          successBanner.style.borderColor = 'var(--color-success)';
          successBanner.style.color = 'var(--color-success)';
          successBanner.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; margin-top: 2px;">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <div>
                <strong>Message Dispatched!</strong> Thank you, <em>${escapeHTML(nameVal)}</em>. Your inquiry has been sent to <strong>p.godspower9045@miva.edu.ng</strong>. Prince will respond shortly.
              </div>
            </div>
          `;
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        form.reset();

        setTimeout(() => {
          if (successBanner) successBanner.style.display = 'none';
        }, 8000);
      } else {
        throw new Error(data.message || 'Transmission failed. Please verify your connection.');
      }
    } catch (err) {
      if (successBanner) {
        successBanner.style.display = 'block';
        successBanner.style.backgroundColor = 'rgba(239, 68, 68, 0.12)';
        successBanner.style.borderColor = 'var(--color-danger)';
        successBanner.style.color = 'var(--color-danger)';
        successBanner.innerHTML = `
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <div>
              <strong>Dispatch Issue:</strong> ${escapeHTML(err.message || 'Something went wrong. Please try again or email directly.')}
            </div>
          </div>
        `;
        successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
      }
    }
  });

  // Attach live input listeners to clear errors on user edit
  [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
      if (input.value.trim()) {
        clearError(input);
      }
    });
  });

  function showError(inputEl, message) {
    const group = inputEl.closest('.form-group');
    if (!group) return;
    group.classList.add('has-error');
    const errorMsgEl = group.querySelector('.form-error-msg');
    if (errorMsgEl) {
      errorMsgEl.textContent = message;
    }
  }

  function clearError(inputEl) {
    const group = inputEl.closest('.form-group');
    if (!group) return;
    group.classList.remove('has-error');
  }

  function escapeHTML(str) {
    return String(str).replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }
}

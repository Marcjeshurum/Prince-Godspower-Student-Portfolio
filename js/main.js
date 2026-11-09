/**
 * COS 106 – Introduction to Web Technologies | Practical Term Project
 * Student: Prince Chimenem Godspower
 * File: js/main.js
 * Description: Core vanilla JavaScript library handling global interactions,
 * theme management, responsive navigation, preloader, typewriter animation,
 * intersection observer scroll reveals, number counters, and project filters.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme (Dark / Light Mode)
  initTheme();

  // 2. Initialize Navigation and Mobile Drawer
  initNavigation();

  // 3. Initialize Scroll Progress and Back-to-Top Button
  initScrollIndicators();

  // 4. Initialize Preloader
  initPreloader();

  // 5. Initialize Typewriter / Rotating Text in Hero
  initTypewriter();

  // 6. Initialize IntersectionObserver for Scroll Reveals
  initScrollReveal();

  // 7. Initialize Animated Metric Counters
  initNumberCounters();

  // 8. Initialize Skill Bars Animation
  initSkillBars();

  // 9. Initialize Custom Cursor & Magnetic Hover (Desktop)
  initCustomCursor();

  // 10. Initialize 3D Card Tilt Effect
  initCardTilt();

  // 11. Initialize Project Category Filtering
  initProjectFiltering();

  // 12. Initialize Dashboard Lightbox Modal
  initDashboardLightbox();

  // 13. Initialize Project Image Uploader
  initProjectImageUploader();

  // 14. Initialize Executive Voice Studio
  initVoiceStudio();
});

/**
 * ----------------------------------------------------------------------
 * 1. Theme Management (Dark / Light mode with localStorage persistence)
 * ----------------------------------------------------------------------
 */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('pcg_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Determine initial theme: stored preference > system preference > dark default
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  // Attach click listener to all theme toggle buttons (desktop & mobile)
  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('pcg_theme', newTheme);
    });
  });

  // Listen for OS system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('pcg_theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

/**
 * ----------------------------------------------------------------------
 * 2. Responsive Navigation & Mobile Drawer
 * ----------------------------------------------------------------------
 */
function initNavigation() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');

  if (!mobileMenuBtn || !mobileDrawer) return;

  // Toggle drawer open/close
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // Close drawer when clicking outside or clicking any nav link
  document.addEventListener('click', (e) => {
    if (
      mobileDrawer.classList.contains('open') &&
      !mobileDrawer.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      closeDrawer();
    }
  });

  const drawerLinks = mobileDrawer.querySelectorAll('.mobile-nav-link');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  function openDrawer() {
    mobileDrawer.classList.add('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    mobileMenuBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    `;
  }
}

/**
 * ----------------------------------------------------------------------
 * 3. Scroll Progress Indicator & Back to Top Button
 * ----------------------------------------------------------------------
 */
function initScrollIndicators() {
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Update progress bar width
    if (progressBar && scrollHeight > 0) {
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = `${scrollPercent}%`;
    }

    // Toggle back to top button visibility
    if (backToTopBtn) {
      if (scrollTop > 380) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * ----------------------------------------------------------------------
 * 4. Page Preloader
 * ----------------------------------------------------------------------
 */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 350);
  });

  // Safety fallback: dismiss preloader after 2.5 seconds regardless
  setTimeout(() => {
    if (!preloader.classList.contains('fade-out')) {
      preloader.classList.add('fade-out');
    }
  }, 2500);
}

/**
 * ----------------------------------------------------------------------
 * 5. Hero Rotating / Typewriter Effect
 * ----------------------------------------------------------------------
 */
function initTypewriter() {
  const targetElement = document.querySelector('.hero-typewriter');
  if (!targetElement) return;

  const roles = [
    'Data Analyst',
    'BI Developer',
    'SQL Educator',
    'Data Storyteller'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 95;
  const deletingSpeed = 45;
  const pauseEnd = 1600;

  function typeStep() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      targetElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      targetElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let nextDelay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      nextDelay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      nextDelay = 350;
    }

    setTimeout(typeStep, nextDelay);
  }

  // Start typing loop
  setTimeout(typeStep, 600);
}

/**
 * ----------------------------------------------------------------------
 * 6. Scroll Reveal Observer
 * ----------------------------------------------------------------------
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-stagger');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/**
 * ----------------------------------------------------------------------
 * 7. Animated Number Counters
 * ----------------------------------------------------------------------
 */
function initNumberCounters() {
  const counters = document.querySelectorAll('[data-counter-target]');
  if (!counters.length) return;

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-counter-target'));
        const prefix = el.getAttribute('data-counter-prefix') || '';
        const suffix = el.getAttribute('data-counter-suffix') || '';
        const isDecimal = target % 1 !== 0;
        
        animateCounter(el, target, prefix, suffix, isDecimal);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target, prefix, suffix, isDecimal) {
  const duration = 1800; // ms
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);
  let frame = 0;

  const timer = setInterval(() => {
    frame++;
    // Ease-out cubic progress
    const progress = 1 - Math.pow(1 - (frame / totalFrames), 3);
    const currentValue = progress * target;

    if (frame >= totalFrames) {
      clearInterval(timer);
      element.textContent = `${prefix}${isDecimal ? target.toFixed(1) : Math.round(target).toLocaleString()}${suffix}`;
    } else {
      element.textContent = `${prefix}${isDecimal ? currentValue.toFixed(1) : Math.round(currentValue).toLocaleString()}${suffix}`;
    }
  }, frameRate);
}

/**
 * ----------------------------------------------------------------------
 * 8. Skill Progress Bars Animation on Scroll
 * ----------------------------------------------------------------------
 */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress-fill');
  if (!skillBars.length) return;

  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-skill-level') || '0%';
        bar.style.width = targetWidth;
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.25 });

  skillBars.forEach(bar => skillObserver.observe(bar));
}

/**
 * ----------------------------------------------------------------------
 * 9. Custom Cursor & Interactive Glow (Desktop Pointer Only)
 * ----------------------------------------------------------------------
 */
function initCustomCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = -100;
  let mouseY = -100;
  let followerX = -100;
  let followerY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  // Smooth trailing loop for follower
  function loop() {
    followerX += (mouseX - followerX) * 0.16;
    followerY += (mouseY - followerY) * 0.16;
    follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  // Hover states on clickable elements
  const clickables = document.querySelectorAll('a, button, input, textarea, select, .project-card, .service-card');
  clickables.forEach(item => {
    item.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    item.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/**
 * ----------------------------------------------------------------------
 * 10. 3D Card Tilt Effect on Hover
 * ----------------------------------------------------------------------
 */
function initCardTilt() {
  const cards = document.querySelectorAll('.project-card');
  if (!cards.length || window.matchMedia('(pointer: coarse)').matches) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/**
 * ----------------------------------------------------------------------
 * 11. Project Category Filtering (projects.html)
 * ----------------------------------------------------------------------
 */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCategory = btn.getAttribute('data-filter');

      // Filter project cards with fade transition
      projectCards.forEach(card => {
        const cardCategories = (card.getAttribute('data-category') || '').split(' ');

        if (selectedCategory === 'all' || cardCategories.includes(selectedCategory)) {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          card.style.display = 'flex';
          
          setTimeout(() => {
            card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/**
 * ----------------------------------------------------------------------
 * 12. Dashboard Lightbox Preview
 * ----------------------------------------------------------------------
 */
function initDashboardLightbox() {
  const lightbox = document.getElementById('dashboard-lightbox');
  if (!lightbox) return;

  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const closeBtn = document.getElementById('lightbox-close-btn');

  document.querySelectorAll('.dashboard-clickable, .dashboard-zoom-badge, .dashboard-zoom-btn').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      let targetImgEl = null;

      if (trigger.classList.contains('dashboard-clickable')) {
        targetImgEl = trigger;
      } else {
        const targetId = trigger.getAttribute('data-target-img');
        targetImgEl = document.getElementById(targetId);
      }

      if (!targetImgEl) return;

      const imgSrc = targetImgEl.getAttribute('data-full-img') || targetImgEl.src;
      const title = targetImgEl.getAttribute('data-title') || 'Power BI Dashboard Preview';

      lightboxImg.src = imgSrc;
      lightboxTitle.textContent = title;
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/**
 * ----------------------------------------------------------------------
 * 13. Project Dashboard Image Uploader & Persistence
 * ----------------------------------------------------------------------
 */
function initProjectImageUploader() {
  const uploaders = document.querySelectorAll('.project-img-uploader');
  const triggers = document.querySelectorAll('.upload-dashboard-trigger');

  // Trigger file picker when user clicks "Upload Your Dashboard" button
  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const inputId = btn.getAttribute('data-input-id');
      const input = document.getElementById(inputId);
      if (input) input.click();
    });
  });

  // Restore saved custom dashboard images from localStorage if any
  uploaders.forEach(el => {
    const key = el.getAttribute('data-storage-key');
    const targetId = el.getAttribute('data-target-id');
    if (key && targetId) {
      try {
        const savedData = localStorage.getItem(key);
        if (savedData) {
          const img = document.getElementById(targetId);
          if (img) {
            img.src = savedData;
            img.setAttribute('data-full-img', savedData);
          }
        }
      } catch (err) {
        console.warn('LocalStorage error', err);
      }
    }
  });

  uploaders.forEach(uploader => {
    uploader.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const targetId = uploader.getAttribute('data-target-id');
      const storageKey = uploader.getAttribute('data-storage-key');
      const targetImg = document.getElementById(targetId);

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target.result;
        if (targetImg) {
          targetImg.src = base64Url;
          targetImg.setAttribute('data-full-img', base64Url);
        }
        if (storageKey) {
          try {
            localStorage.setItem(storageKey, base64Url);
          } catch (err) {
            console.warn('Storage limit reached, preview active in session', err);
          }
        }

        // Show confirmation badge on the card
        const parentCard = uploader.closest('.project-card');
        if (parentCard) {
          const metaLine = parentCard.querySelector('.project-meta-line');
          if (metaLine && !parentCard.querySelector('.custom-badge-pill')) {
            const span = document.createElement('span');
            span.className = 'custom-badge-pill';
            span.style.cssText = 'color: var(--color-success); font-weight: 700; margin-left: 0.5rem;';
            span.textContent = '· Custom Dashboard Uploaded';
            metaLine.appendChild(span);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  });
}

/**
 * ----------------------------------------------------------------------
 * 14. Executive Voice Studio (Record & Audio Upload on about.html)
 * ----------------------------------------------------------------------
 */
function initVoiceStudio() {
  const audioPlayer = document.getElementById('portfolio-audio-player');
  if (!audioPlayer) return;

  const recordBtn = document.getElementById('record-voice-btn');
  const uploadBtn = document.getElementById('upload-voice-btn');
  const resetBtn = document.getElementById('reset-voice-btn');
  const fileInput = document.getElementById('voice-file-input');
  const statusText = document.getElementById('voice-status-text');
  const statusDot = document.getElementById('voice-indicator-dot');
  const timerDisplay = document.getElementById('voice-timer');
  const warningBox = document.getElementById('voice-mic-warning');

  const STORAGE_KEY = 'pcg_custom_voice_audio';
  let mediaRecorder = null;
  let audioChunks = [];
  let isRecording = false;
  let timerInterval = null;
  let secondsElapsed = 0;

  // Restore saved custom voice note
  try {
    const savedAudio = localStorage.getItem(STORAGE_KEY);
    if (savedAudio) {
      audioPlayer.src = savedAudio;
    }
  } catch (err) {
    console.warn('LocalStorage access', err);
  }

  function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  // 1. Microphone Voice Recording
  if (recordBtn) {
    recordBtn.addEventListener('click', async () => {
      if (!isRecording) {
        if (warningBox) warningBox.style.display = 'none';

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          if (warningBox) {
            warningBox.style.display = 'block';
            warningBox.innerHTML = '<strong style="color: var(--color-danger); display: block; margin-bottom: 0.25rem;">Microphone API Not Available</strong>' +
              'Your current browser context does not provide direct microphone access. You can record a voice note on your phone (Voice Memos / WhatsApp) and click <strong>Upload Audio</strong> to use it!';
          }
          return;
        }

        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

          // Pick best supported MIME type
          let chosenType = '';
          const testTypes = [
            'audio/webm;codecs=opus',
            'audio/webm',
            'audio/ogg;codecs=opus',
            'audio/mp4'
          ];
          for (const t of testTypes) {
            if (window.MediaRecorder && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t)) {
              chosenType = t;
              break;
            }
          }

          mediaRecorder = chosenType ? new MediaRecorder(stream, { mimeType: chosenType }) : new MediaRecorder(stream);
          audioChunks = [];

          mediaRecorder.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) audioChunks.push(e.data);
          };

          mediaRecorder.onstop = () => {
            clearInterval(timerInterval);
            if (timerDisplay) timerDisplay.style.display = 'none';

            const mime = mediaRecorder.mimeType || chosenType || 'audio/webm';
            const audioBlob = new Blob(audioChunks, { type: mime });
            const blobUrl = URL.createObjectURL(audioBlob);
            
            // Set immediate blob playback
            audioPlayer.src = blobUrl;
            audioPlayer.load();
            audioPlayer.play().catch(() => {});

            if (statusText) statusText.textContent = 'Recorded Voice Saved!';

            // Convert to base64 for persistent storage across page loads
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64Data = reader.result;
              try {
                localStorage.setItem(STORAGE_KEY, base64Data);
              } catch (err) {
                console.warn('LocalStorage limit for audio, active in session', err);
              }
            };
            reader.readAsDataURL(audioBlob);

            // Release microphone hardware tracks
            stream.getTracks().forEach(track => track.stop());
          };

          mediaRecorder.start(200);
          isRecording = true;
          secondsElapsed = 0;

          recordBtn.classList.add('recording');
          recordBtn.innerHTML = '<span>Stop & Save</span>';
          if (statusDot) statusDot.classList.add('recording');
          if (statusText) statusText.textContent = 'Recording Now...';
          
          if (timerDisplay) {
            timerDisplay.textContent = '00:00';
            timerDisplay.style.display = 'inline-block';
            timerInterval = setInterval(() => {
              secondsElapsed++;
              timerDisplay.textContent = formatTime(secondsElapsed);
            }, 1000);
          }
        } catch (err) {
          console.error('Microphone access error', err);
          if (warningBox) {
            warningBox.style.display = 'block';
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
              warningBox.innerHTML = '<strong style="color: var(--color-danger); display: block; margin-bottom: 0.25rem;">Microphone Permission Blocked</strong>' +
                'Click the lock or site settings icon in your browser address bar and set <em>Microphone</em> to <strong>Allow</strong>. Alternatively, record on your phone and click <strong>Upload Audio</strong> above!';
            } else {
              warningBox.innerHTML = '<strong style="color: var(--color-danger); display: block; margin-bottom: 0.25rem;">Microphone Unavailable</strong>' +
                'Unable to capture audio from your device (' + (err.message || 'Permission denied') + '). Please use the <strong>Upload Audio</strong> button to select your recorded audio file!';
            }
          }
        }
      } else {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
        }
        isRecording = false;
        clearInterval(timerInterval);
        recordBtn.classList.remove('recording');
        recordBtn.innerHTML = '<span>Record Voice</span>';
        if (statusDot) statusDot.classList.remove('recording');
      }
    });
  }

  // 2. Audio File Upload
  if (uploadBtn && fileInput) {
    uploadBtn.addEventListener('click', () => {
      if (warningBox) warningBox.style.display = 'none';
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const blobUrl = URL.createObjectURL(file);
      audioPlayer.src = blobUrl;
      audioPlayer.load();
      audioPlayer.play().catch(() => {});

      if (statusText) statusText.textContent = 'Voice Note Uploaded!';

      const reader = new FileReader();
      reader.onload = (event) => {
        const audioUrl = event.target.result;
        try {
          localStorage.setItem(STORAGE_KEY, audioUrl);
        } catch (err) {
          console.warn('Storage quota', err);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // 3. Reset to original sample
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      audioPlayer.src = 'media/audio-intro.mp3';
      audioPlayer.load();
      if (statusText) statusText.textContent = 'Default Sample';
      if (warningBox) warningBox.style.display = 'none';
      if (timerDisplay) timerDisplay.style.display = 'none';
    });
  }
}


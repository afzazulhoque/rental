document.addEventListener('DOMContentLoaded', () => {
  (function () {
    const modalContainerId = 'registerModal';
    const registerPartialPath = './register.html';
    console.log("Fetching register partial from:", registerPartialPath);

    function domReady(fn) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn);
      } else {
        fn();
      }
    }

    domReady(() => {
      const container = document.getElementById(modalContainerId);
      if (!container) return;

      fetch(registerPartialPath)
        .then(res => {
          if (!res.ok) throw new Error('Failed to load ' + registerPartialPath);
          return res.text();
        })
        .then(html => {
          container.innerHTML = html;

          const overlay = document.getElementById('registerOverlay');
          const openBtn = document.getElementById('registerBtn');
          const closeBtn = document.getElementById('closeRegister');
          const goToLogin = document.getElementById('goToLogin');
          const form = overlay.querySelector('form');

          if (!openBtn) return;

          // Open popup
          openBtn.addEventListener('click', e => {
            e.preventDefault();
            overlay.style.display = 'flex';
          });

          // Close popup
          closeBtn.addEventListener('click', () => {
            overlay.style.display = 'none';
          });

          // Close when clicking outside
          window.addEventListener('click', e => {
            if (e.target === overlay) overlay.style.display = 'none';
          });

          // Switch to login popup
          if (goToLogin) {
            goToLogin.addEventListener('click', e => {
              e.preventDefault();
              overlay.style.display = 'none';
              const loginOverlay = document.getElementById('loginOverlay');
              if (loginOverlay) loginOverlay.style.display = 'flex';
            });
          }

          // === Form Validation ===
          form.addEventListener('submit', e => {
            e.preventDefault();

            // Clear previous errors
            form.querySelectorAll('.error-msg').forEach(el => el.remove());

            const name = form.querySelector('input[type="text"]');
            const email = form.querySelector('input[type="email"]');
            const pass = form.querySelectorAll('input[type="password"]')[0];
            const confirm = form.querySelectorAll('input[type="password"]')[1];
            const userType = form.querySelector('select');

            let valid = true;

            const showError = (input, msg) => {
              const span = document.createElement('span');
              span.className = 'error-msg';
              span.textContent = msg;
              span.style.color = 'crimson';
              span.style.fontSize = '13px';
              span.style.marginTop = '-5px';
              input.insertAdjacentElement('afterend', span);
            };

            if (name.value.trim() === '') {
              showError(name, 'Full name is required.');
              valid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
              showError(email, 'Enter a valid email address.');
              valid = false;
            }

            if (pass.value.length < 6) {
              showError(pass, 'Password must be at least 6 characters.');
              valid = false;
            }

            if (pass.value !== confirm.value) {
              showError(confirm, 'Passwords do not match.');
              valid = false;
            }

            if (!userType.value) {
              showError(userType, 'Please select your user type.');
              valid = false;
            }

            if (!valid) return;

            alert('Registration successful!');
            form.reset();
            overlay.style.display = 'none';
          });
        })
        .catch(err => console.error('Error loading register partial:', err));
    });
  })();
});

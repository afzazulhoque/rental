(function () {
  const modalContainerId = 'loginModal';
  const loginPartialPath = './login.html'; // correct path for GitHub Pages
  console.log("Fetching login partial from:", loginPartialPath); // ✅ moved here

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

    fetch(loginPartialPath)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load ' + loginPartialPath);
        return res.text();
      })
      .then(html => {
        container.innerHTML = html;

        const overlay = document.getElementById('loginOverlay');
        const openBtn = document.getElementById('loginBtn');
        const closeBtn = document.getElementById('closeLogin');

        if (!openBtn) return;

        // Open modal
        openBtn.addEventListener('click', e => {
          e.preventDefault();
          overlay.style.display = 'flex';
        });

        // Close modal
        closeBtn.addEventListener('click', () => {
          overlay.style.display = 'none';
        });

        // Close on outside click
        window.addEventListener('click', e => {
          if (e.target === overlay) overlay.style.display = 'none';
        });
      })
      .catch(err => console.error('Error loading login partial:', err));
  });
})();

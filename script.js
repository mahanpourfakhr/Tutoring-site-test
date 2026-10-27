// Get the toggle button and the root <html> element
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const menuToggle = document.querySelector('.menu-toggle');
const navGroup = document.getElementById('site-navigation');

// Check if the user has a saved preference, otherwise default to light
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateButtonIcon(savedTheme);

// Listen for clicks on the toggle button
themeToggle?.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateButtonIcon(newTheme);
});

// Update the button's icon based on the current theme
function updateButtonIcon(theme) {
  if (themeToggle) themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function setMenuOpen(isOpen) {
  if (!menuToggle || !navGroup) return;
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  navGroup.classList.toggle('is-open', isOpen);
}

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  setMenuOpen(!isOpen);
});

navGroup?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('click', (event) => {
  if (navGroup?.classList.contains('is-open') &&
      !navGroup.contains(event.target) &&
      !menuToggle?.contains(event.target)) {
    setMenuOpen(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navGroup?.classList.contains('is-open')) {
    setMenuOpen(false);
    menuToggle?.focus();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) setMenuOpen(false);
});

const consultationForm = document.getElementById('consultation-form');
consultationForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const submitButton = consultationForm.querySelector('button[type="submit"]');
  const status = document.getElementById('form-status');
  if (!submitButton || !status) return;

  submitButton.disabled = true;
  status.textContent = 'Sending your request…';

  try {
    const response = await fetch(consultationForm.action, {
      method: 'POST',
      body: new FormData(consultationForm),
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) throw new Error('Form submission failed');
    window.location.assign('thank-you.html');
  } catch {
    status.textContent = 'We couldn’t confirm that your request was sent. Please try again.';
    submitButton.disabled = false;
  }
});

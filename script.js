// Get the toggle button and the root <html> element
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check if the user has a saved preference, otherwise default to light
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateButtonIcon(savedTheme);

// Listen for clicks on the toggle button
themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateButtonIcon(newTheme);
});

// Update the button's icon based on the current theme
function updateButtonIcon(theme) {
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}
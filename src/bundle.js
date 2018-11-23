import './bundle.css';

const customPropertiesSupports = window.CSS && window.CSS.supports('--test-property', 0);
const themeToggler = document.querySelector('.js-theme-toggler');
const themeTogglerCheckbox = themeToggler.querySelector('.js-checkbox');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const defaultTheme = themeMeta.content;
const LOCAL_STORAGE_KEY = 'dark_theme';
const isDarkThemeEnabled = localStorage[LOCAL_STORAGE_KEY] === 'Y';

document.addEventListener('DOMContentLoaded', function () {
  if (window.localStorage && isDarkThemeEnabled) {
    document.documentElement.classList.add('theme-dark');
    themeTogglerCheckbox.checked = true;
  }

  // Включаем transition'ы после того как передвинули toggler в нужное положение
  setTimeout(() => themeToggler.classList.remove('theme-switcher--animation-off'), 0);
});

themeTogglerCheckbox.addEventListener('change', function () {
  document.documentElement.classList.toggle('theme-dark');

  const blackTheme = customPropertiesSupports
    ? getComputedStyle(document.documentElement).getPropertyValue('--theme-background')
    : '';

  themeMeta.content = this.checked ? blackTheme : defaultTheme;

  if (window.localStorage) {
    localStorage[LOCAL_STORAGE_KEY] = this.checked ? 'Y' : 'N';
  }
});

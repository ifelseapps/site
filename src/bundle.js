import './bundle.css';

const customPropertiesSupports = window.CSS && window.CSS.supports('--test-property', 0);
const themeToggler = document.querySelector('.js-theme-toggler');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const defaultTheme = themeMeta.content;

themeToggler.addEventListener('change', function () {
  document.documentElement.classList.toggle('theme-dark');

  const blackTheme = customPropertiesSupports
    ? getComputedStyle(document.documentElement).getPropertyValue('--theme-background')
    : '';

  themeMeta.content = this.checked ? blackTheme : defaultTheme;

  // TODO: сохранять значение в LocalStorage
});

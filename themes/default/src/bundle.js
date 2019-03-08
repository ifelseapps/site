import './bundle.css';
import FontsLoader from './fonts';

const page = document.querySelector('.js-page');

initFonts();

const customPropertiesSupports = window.CSS && window.CSS.supports('--test-property', 0);
const themeToggler = document.querySelector('.js-theme-toggler');
const themeTogglerCheckbox = themeToggler.querySelector('.js-checkbox');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const defaultTheme = themeMeta.content;
const LOCAL_STORAGE_KEY = 'dark_theme';
const isDarkThemeEnabled = localStorage[LOCAL_STORAGE_KEY] === 'Y';
// TODO: создать themeManager для удобного управления темами

themeTogglerCheckbox.addEventListener('change', function () {
  document.documentElement.classList.toggle('theme-dark');

  // После переключения темы не нужно оставлять выделение данного контролла
  this.blur();

  const blackTheme = customPropertiesSupports
    ? getComputedStyle(document.documentElement).getPropertyValue('--theme-background')
    : '';

  themeMeta.content = this.checked ? blackTheme : defaultTheme;

  if (window.localStorage) {
    localStorage[LOCAL_STORAGE_KEY] = this.checked ? 'Y' : 'N';
  }
});

document.addEventListener('DOMContentLoaded', function () {
  if (window.localStorage && isDarkThemeEnabled) {
    themeTogglerCheckbox.click();
  }

  // Включаем transition'ы после того как передвинули toggler в нужное положение
  setTimeout(() => themeToggler.classList.remove('theme-switcher--animation-off'), 0);
});

function initFonts() {
  if (typeof Promise === 'undefined') {
    page.classList.remove('page--loading');
    page.classList.add('page--visible');
    return;
  }

  FontsLoader(
    {
      'PT Sans': {
        400: ['normal', 'italic'],
        700: 'normal'
      },
      'Fira Sans': {
        400: 'normal',
        900: 'normal'
      }
    },
    () => {
      page.classList.remove('page--loading');
      const handler = () => {
        page.classList.add('page--visible');
        page.removeEventListener('transitionend', handler);
      };
      page.addEventListener('transitionend', handler);
    }
  );
}

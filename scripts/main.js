// import '../pages/index.css';
import checkScroll from './scroll.js';
import Select from './select.js';
import Menu from './menu.js';

console.log('Stable verison 2.0 (layout and scripts update)');

document.addEventListener('scroll', () => {
    checkScroll('.header', 'header_scrolled');
});

new Select('#js-select-class', '.select__container', '.select__options', 'select__options_active', '.select__option', '.select__label')
.setEventListners();
new Select('#js-select-absent', '.select__container', '.select__options', 'select__options_active', '.select__option', '.select__label')
.setEventListners();
new Select('#js-select-repeats', '.select__container', '.select__options', 'select__options_active', '.select__option', '.select__label')
.setEventListners();
new Select('#js-select-speed', '.select__container', '.select__options', 'select__options_active', '.select__option', '.select__label')
.setEventListners();
new Menu('.header__button', 'header__button_active', '.popup', 'popup_active', 'js-close-button', '#js-save-button')
.setEventListeners();
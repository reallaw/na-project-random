import checkScroll from './scroll.js';
import Select from './select.js';
import Random from './random.js';
import Menus from './menus.js';

console.log('Pre-release ver. 1.25 (code and design edits - release)');

localStorage.clear('list', '');
localStorage.clear('listSkip', '');

const timeSpan = document.querySelector('.result-container__span');
const SelectClass = new Select('#js-select-class', '.select__container', '.select__options', 'select__options_active', '.select__option', '.select__label', '#absent');
const SelectAbsent = new Select('#js-select-absent', '.select__container', '.select__options', 'select__options_active', '.select__option', '.select__label', '#absent');
const SelectRepeats = new Select('#js-select-repeats', '.select__container', '.select__options', 'select__options_active', '.select__option', '.select__label', '#absent');
const SelectSpeed = new Select('#js-select-speed', '.select__container', '.select__options', 'select__options_active', '.select__option', '.select__label', '#absent');
const getResultButton = document.querySelector('.settings__button');

SelectClass.setEventListeners();
SelectAbsent.setEventListeners();
SelectRepeats.setEventListeners();
SelectSpeed.setEventListeners();
new Menus('settings__link', ['settings', 'result-container'])
.setEventListener();
new Random('.settings__button', ['#js-select-class', '#js-select-absent', '#js-select-repeats', '#js-select-speed'], '.result-container__result', '.select__input')
.setEventListener();

const updateTime = () => {
    const localTime = new Date();       
    
    if (localTime.getHours() < 10) {
        var localHours = 0 + '' + localTime.getHours();
    } else {
        var localHours = localTime.getHours();
    };

    if (localTime.getMinutes() < 10) {
        var localMinutes = 0 + '' + localTime.getMinutes();
    } else {
        var localMinutes = localTime.getMinutes();
    };

    if (localTime.getSeconds() < 10) {
        var localSeconds = 0 + '' + localTime.getSeconds();
    } else {
        var localSeconds = localTime.getSeconds();
    };
    
    // dunno change var to let or const due to visibility js areas

    return localHours + ':' + localMinutes + ':' + localSeconds; // if we returning localTime.get...() and etc. we can get time 8:8:8 and others
};

timeSpan.textContent = updateTime();

setInterval(() => {
    timeSpan.textContent = updateTime();
}, 1000); // change timeSpan

document.addEventListener('scroll', () => {
    checkScroll('.header', 'header_scrolled');
});
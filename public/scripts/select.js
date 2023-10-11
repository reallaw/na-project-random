export default class Select { // защищено GNU AFFERO GENERAL PUBLIC LICENSE
    constructor(select, spanContainer, options, activeOptions, optionClass, labelClass, optionTemplate) {
        this._select = document.querySelector(select);
        this._spanContainer = this._select.querySelector(spanContainer);
        this._options = this._select.querySelector(options);
        this._activeOptions = activeOptions;
        this._optionClass = optionClass;
        this._optionsList = Array.from(this._select.querySelectorAll(optionClass));
        this._labelClass = labelClass;
        this._optionTemplate = optionTemplate;
    };

    _toggleStatus(options, activeOptions) {
        if (options.classList.contains(activeOptions)) {
            this._closeAll(options, activeOptions);
        } else {
            this._closeAll(options, activeOptions);
            options.classList.add(activeOptions);
        }
    };

    _closeAll(options, activeOptions) {
        const allSelects = document.querySelectorAll('.' + options.classList[0]);
        allSelects.forEach((child) => {
            child.classList.remove(activeOptions);
        });
    }

    _changeOption(evt, spanContainer, labelClass, options, activeOptions, optionTemplate, optionClass) {
        const evtTarget = evt.target;
        const victimItem = evtTarget.parentNode.querySelector(labelClass);
        const span = spanContainer.querySelector('.select__span');

        if (evtTarget.type == 'radio') {
            options.querySelectorAll('.select__input').forEach((item) => {
                item.checked = false;
            });
            evtTarget.checked = true;

            span.textContent = victimItem.textContent;

            this._toggleStatus(options, activeOptions);
        } else {
            const thisOption = evtTarget.parentNode;
            const thisOptions = thisOption.parentNode;
            const thisSpan = thisOptions.parentNode.querySelector('.select__span');

            if (!evtTarget.checked) {
                evtTarget.removeAttribute('checked', '');
                evtTarget.parentNode.classList.remove('select__option_active');
            } else {
                evtTarget.setAttribute('checked', 'true');
                evtTarget.parentNode.classList.add('select__option_active');
            };

            const thisOptionsActive = Array.from(thisOptions.querySelectorAll('.select__option_active')); // do not change location due to classlist edits

            let spanText = thisOptionsActive.map((item, index) => {
                return item.innerText.replace(/[^a-zа-яё\s]/gi, '') + '.';
            });

            if (thisOptionsActive.length > 0) {
                thisSpan.textContent = spanText.join(', ');
            } else {
                thisSpan.textContent = 'Нет отсутствующих'
            }
        }
        if (evtTarget.id.includes('list')) {
            const thisClass = evtTarget.parentNode.querySelector('.select__label').textContent;
            document.querySelector('.main__title').textContent = 'Рандом' + ' ' + thisClass;
            this._loadOptions(evtTarget.id, optionTemplate, optionClass);
        };
        if (victimItem == null) {
            throw new Error('Unexpected error due to null 🦣');
        };
    };

    async _loadOptions(id, optionTemplate, optionClass) {
        const list = await fetch('https://secure.math-natavan.com/students/' + id + '.json').then((response) => {
            return response.json();
        }).then((body) => {
            return body;
        });

        document.querySelector('div#js-select-absent ul.select__options').innerHTML = ``;

        var elId = 0;

        const createOption = (optionTemplate, optionClass, item, onClick) => {
            const newOption = document.querySelector(optionTemplate).content.querySelector(optionClass).cloneNode(true);

            elId++;

            const uid = this._rusToLatin(item.surname.toString().toLowerCase() + item.name.toString()); // generating id and for

            newOption.querySelector('.select__input').id = this._rusToLatin(uid + '-' + elId);
            newOption.querySelector('.select__label').setAttribute('for', uid + '-' + elId);
            newOption.querySelector('.select__label').textContent = elId + '. ' + item.surname + ' ' + item.name[0] + '.';

            newOption.addEventListener('click', (evt) => {
                this._changeOption(evt, this._spanContainer, this._labelClass, this._options, this._activeOptions, this._optionTemplate, this._optionClass);
            });

            document.querySelector('div#js-select-absent ul.select__options').append(newOption);
        };

        list.forEach((item) => {
            createOption(optionTemplate, optionClass, item);
        });
    };

    _rusToLatin(str) {
        const ru = new Map([
            ['а', 'a'], ['б', 'b'], ['в', 'v'], ['г', 'g'], ['д', 'd'], ['е', 'e'],
            ['є', 'e'], ['ё', 'e'], ['ж', 'j'], ['з', 'z'], ['и', 'i'], ['ї', 'yi'], ['й', 'i'],
            ['к', 'k'], ['л', 'l'], ['м', 'm'], ['н', 'n'], ['о', 'o'], ['п', 'p'], ['р', 'r'],
            ['с', 's'], ['т', 't'], ['у', 'ou'], ['ф', 'f'], ['х', 'h'], ['ц', 'c'], ['ч', 'ch'],
            ['ш', 'sh'], ['щ', 'shch'], ['ы', 'y'], ['э', 'e'], ['ю', 'u'], ['я', 'ya']
        ]);
    
        str = str.replace(/[ъь]+/g, '');
    
        return Array.from(str).reduce((s, l) => s + (ru.get(l) || ru.get(l.toLowerCase()) === undefined && l || ru.get(l.toLowerCase()).toUpperCase()), '');
    };
    
    setEventListeners() {
        this._spanContainer.addEventListener('click', () => {
            this._toggleStatus(this._options, this._activeOptions);
        });
        this._optionsList.forEach((item) => {
            item.addEventListener('click', evt => {
                this._changeOption(evt, this._spanContainer, this._labelClass, this._options, this._activeOptions, this._optionTemplate, this._optionClass);
            });
        });
    };
};
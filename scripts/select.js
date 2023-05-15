export default class Select {
    constructor(select, spanContainer, options, activeOptions, optionClass, labelClass) {
        this._select = document.querySelector(select);
        this._spanContainer = this._select.querySelector(spanContainer);
        this._options = this._select.querySelector(options);
        this._activeOptions = activeOptions;
        this._optionsList = Array.from(this._select.querySelectorAll(optionClass));
        this._labelClass = labelClass;
    };

    _toggleStatus(options, activeOptions) {
        options.classList.toggle(activeOptions);
    };

    _changeOption(evt, spanContainer, labelClass, options, activeOptions) {
        const evtTarget = evt.target;
        const victimItem = evtTarget.parentNode.querySelector(labelClass);
        const span = spanContainer.querySelector('.select__span');
        span.textContent = victimItem.textContent;
        this._toggleStatus(options, activeOptions);
        if (victimItem == null) {
            throw new Error('Unexpected error due to null 🦣');
        } else {
            console.log(victimItem);
        };
    };

    setEventListners() {
        this._spanContainer.addEventListener('click', () => {
            this._toggleStatus(this._options, this._activeOptions);
        });
        this._optionsList.forEach((item) => {
            item.addEventListener('click', evt => {
                this._changeOption(evt, this._spanContainer, this._labelClass, this._options, this._activeOptions);
            });
        });
    };
};
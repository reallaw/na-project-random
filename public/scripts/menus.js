export default class Menus { // защищено GNU AFFERO GENERAL PUBLIC LICENSE
    constructor(button, menusArray) {
        this._buttonList = document.querySelectorAll('.' + button);
        this._menusArray = menusArray;
    };

    _toggleStatus(options, activeOptions) {
        if (options.classList.contains(activeOptions)) {
            this._closeAll(options, activeOptions);
        } else {
            this._closeAll(options, activeOptions);
            options.classList.add(activeOptions);
        }
    };

    setEventListener() {
        this._buttonList.forEach((item) => {
            item.addEventListener('click', () => {
                item.classList.toggle(item.classList[0] + '_inverted')
    
                document.querySelector('.' + this._menusArray[0]).classList.toggle(this._menusArray[0] + '_active');
                document.querySelector('.' + this._menusArray[1]).classList.toggle(this._menusArray[1] + '_active');
            });
        });
    };
};
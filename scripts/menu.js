export default class Menu {
    constructor(listener, activeListener, menu, activeMenu, closeButton, saveButton) {
        this._listener = document.querySelector(listener);
        this._activeListener = activeListener;
        this._menu = document.querySelector(menu);
        this._activeMenu = activeMenu;
        this._closeButton = closeButton;
        this._saveButton = document.querySelector(saveButton);
    };

    _toggleMenu(menu, activeMenu, listener, activeListener) {
        if (menu.classList.contains(activeMenu)) {
            menu.classList.toggle(activeMenu);
            listener.classList.toggle(activeListener);
        } else {
            menu.classList.toggle(activeMenu);
            listener.classList.toggle(activeListener);
        }
    };

    _saveSettings() {
        throw new Error('Uncaught error 🦣');
    };

    setEventListeners() {
        this._listener.addEventListener('click', () => {
            this._toggleMenu(this._menu, this._activeMenu, this._listener, this._activeListener);
        });
        this._menu.addEventListener('click', (evt) => {
            if (evt.target.classList.contains(this._activeMenu) || evt.target.id == this._closeButton) {
                this._toggleMenu(this._menu, this._activeMenu, this._listener, this._activeListener);
            };
        });
        this._saveButton.addEventListener('click', () => {
            this._saveSettings();
        });
    };
};
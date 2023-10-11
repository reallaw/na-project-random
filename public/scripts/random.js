export default class Random { // защищено GNU AFFERO GENERAL PUBLIC LICENSE
    constructor(activityButtonClass, selectsList, resultSpan, optionInput) {
        this._button = document.querySelector(activityButtonClass);
        this._selectClass = selectsList[0];
        this._selectAbsents = selectsList[1];
        this._selectRepeats = selectsList[2];
        this._selectSpeed = selectsList[3];
        this._resultSpan = resultSpan;
        this._optionInput = optionInput;
    };

    _checkActiveOptions(select, optionInput) {
        const activeOptions = document.querySelector(select).querySelectorAll(optionInput + ":checked");

        return activeOptions;
    };

    async _startGenerating(button, selectClass, selectAbsents, selectRepeats, selectSpeed, resultSpan, optionInput) {
        let student;
        const btn = button;
        const preloader = document.querySelector('.preloader');
        const resultEl = document.querySelector(resultSpan);
        const settingsContainer = document.querySelector('.settings');
        const resultContainer = document.querySelector('.result-container');
        const resultPicture = resultContainer.querySelector('.result-container__picture');
        const selectedClass = Array.from(this._checkActiveOptions(selectClass, optionInput));
        const selectedAbsents = Array.from(this._checkActiveOptions(selectAbsents, optionInput));
        const selectedRepeats = Array.from(this._checkActiveOptions(selectRepeats, optionInput))[0].id;
        const selectedSpeed = Array.from(this._checkActiveOptions(selectSpeed, optionInput))[0].id;
        const list = await fetch('https://secure.math-natavan.com/students/' + selectedClass[0].id + '.json').then((response) => {
            return response.json();
        }).then((body) => {
            return body;
        }).catch((err) => {console.error('🦣 Critical trouble in module: failed to fetch.')})

        resultPicture.classList.remove(resultPicture.classList[0] + '_active');

        const ignoreId = selectedAbsents.map((item, index) => {
            const numberItem = Number(item.id.replace(/[^0-9]/g, ""));
            return (numberItem - 1).toString();
        });

        if (!resultContainer.classList.contains('result-container_active')) {
            resultContainer.classList.add('result-container_active');
            settingsContainer.classList.add('settings_active');
        };

        var listAbsent = [];

        if (selectedRepeats == 'do-repeat' && localStorage.getItem('listSkip') != null) {
            var listAbsent = localStorage.getItem('listSkip').split(',');
        } else {
            // nothing
        };
        if (selectedSpeed == 'slow') {
            var speedMs = 80;
        } else if (selectedSpeed == 'normal') {
            var speedMs = 60;
        } else {
            var speedMs = 40;
        };

        const newList = list.filter((item, index) => {
            let thisIndex = index.toString(); // index >= 1

            if (ignoreId.includes(thisIndex) || listAbsent.includes(thisIndex) && selectedRepeats == 'do-repeat') {
                return false;
            } else {
                return item;
            };
        });

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }; // await sleep(ms)

        function typeText(text, el) {
            btn.setAttribute('disabled', '');
            let line = 0;
            let count = 0;
            let isSpace = 0;
            let space = '';
            let elem = el;
        
            function typeLine(text) {
                let interval = setTimeout(async function () {
                    space += text[line][count];
                    elem.textContent = space;
                    count ++;
                    if (count >= text[line].length) {
                        count = 0;
                        line++;
                        if (text[line] == ' ' && isSpace == 0) {
                            await sleep(speedMs * 10);
                            isSpace = 1;
                        };
                        if (line == text.length) {
                            btn.removeAttribute('disabled', '');
                            clearTimeout(interval);
                            elem.textContent = space;
                            return true;
                        }
                    }
                    typeLine(text);
                }, speedMs);
            };
            typeLine(text);
        }; // typeline function

        let randex = Math.floor(Math.random() * newList.length); // random index
        let path;

        if (newList.length != 0) {
            randex = list.findIndex(item => item.surname === newList[randex].surname && item.name === newList[randex].name);
            student = list[randex];
            if (speedMs > 50) {
                preloader.classList.add('preloader_active');
                path = `url('https://secure.math-natavan.com/assets/${student.path}')`;
                await sleep(500);
                resultPicture.setAttribute('style', 'background-image: ' + path);
                resultPicture.classList.add(resultPicture.classList[0] + '_active');
                preloader.classList.remove('preloader_active');
            };
            typeText(student.name + ' ' + student.surname, resultEl); // type thisRandom human
            localStorage.setItem('list', selectedClass[0].id);
            localStorage.setItem('listSkip', listAbsent);
            listAbsent.push(randex);
            localStorage.setItem('listSkip', listAbsent);
        } else {
            if (preloader.classList.contains('preloader_active')) {
                preloader.classList.remove('preloader_active');
            };
            typeText('Никого нет в списке! :)', resultEl); // type thisRandom human
            btn.setAttribute('disabled', '');
        };
    };

    setEventListener() {
        this._button.addEventListener('click', () => {
            this._startGenerating(this._button, this._selectClass, this._selectAbsents, this._selectRepeats, this._selectSpeed, this._resultSpan, this._optionInput);
        });
    };
};
import './style.css';

const header = document.querySelector('header');
const headerTitle = document.querySelector('.header__title');
const headerIcons = document.querySelector('.header__icon--github svg');

const bodyElement = document.querySelector('body');

window.addEventListener('load', () => {
    setInitialValueLS();

    const checkElement = document.querySelector('#toggle--dark');
    checkElement.checked = isUsingDarkMode();

    checkElement.addEventListener('change', () => {
        if(checkElement.checked) {
            bodyElement.classList.remove('force-light');
            setDarkModeValueFromLS('dark');
            return bodyElement.classList.add('force-dark');
        }
        bodyElement.classList.remove('force-dark');
        setDarkModeValueFromLS('light');
        return bodyElement.classList.add('force-light');
    })
})

function setInitialValueLS() {
    const savedValue = getDarkModeValueFromLS();
    if(!savedValue) return;

    if(savedValue === 'light') bodyElement.className = 'force-light';
}

function getDarkModeValueFromLS() {
    if(!window.localStorage) return;
    return window.localStorage.getItem('color--scheme');
}

function setDarkModeValueFromLS(value) {
    if(!window.localStorage) return;
    return window.localStorage.setItem('color--scheme', value);
}

function isUsingDarkMode() {
    const blackColor = getComputedStyle(bodyElement).getPropertyValue('--dark').trim();
    const bodyBg = getComputedStyle(bodyElement).backgroundColor;
    return blackColor === rgb2hex(bodyBg);
}

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return ("#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3])).toUpperCase();
}


export { header, headerTitle, headerIcons };

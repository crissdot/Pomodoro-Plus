import './style.css';
import Timer from './CountTimer.js';
import TimerUp from './CountUpTimer.js';
import TimerDown from './CountDownTimer.js';

const soundCheckElement = document.querySelector('#toggle--sound');
const volumeOn = document.querySelector('.timer__volume-on');
const volumeOff = document.querySelector('.timer__volume-off');

window.addEventListener('load', () => {
    setInitialValueLS();
    soundCheckElement.checked = isAudioOff();

    soundCheckElement.addEventListener('change', () => {
        if(soundCheckElement.checked) {
            volumeOff.style.opacity = 0;
            setAudioToLS('on');
            volumeOn.style.opacity = 1;
        } else {
            volumeOn.style.opacity = 0;
            setAudioToLS('off');
            volumeOff.style.opacity = 1;
        }
    })
})

function setInitialValueLS() {
    const savedValue = getAudioFromLS();
    if(!savedValue) return;

    if(savedValue === 'on') {
        volumeOff.style.opacity = 0;
        volumeOn.style.opacity = 1;
    }
}

function isAudioOff() {
    return getAudioFromLS() === 'off';
}

function getAudioFromLS() {
    if(!window.localStorage) return;
    return window.localStorage.getItem('audio');
}

function setAudioToLS(value) {
    if(!window.localStorage) return;
    return window.localStorage.setItem('audio', value);
}

function makeTimerUp() {
    const countUpTimer = {
        time: {
            minutes: 0,
            seconds: 0,
        },
    }

    const timerUp = new TimerUp(countUpTimer);
    return timerUp;
}

function makeTimerDown(minutes, seconds) {
    const countDownTimer = {
        time: {
            minutes,
            seconds,
        },
    }

    const timerDown = new TimerDown(countDownTimer);
    return timerDown;
}

function renderTimer(minutes, seconds) {
    Timer.render(minutes, seconds);
}

export { makeTimerUp, makeTimerDown, renderTimer };

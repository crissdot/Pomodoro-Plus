import './style.css';
import Timer from './CountTimer.js';
import TimerUp from './CountUpTimer.js';
import TimerDown from './CountDownTimer.js';

const soundCheckElement = document.querySelector('#toggle--sound');
const volumeOn = document.querySelector('.timer__volume-on');
const volumeOff = document.querySelector('.timer__volume-off');

soundCheckElement.addEventListener('change', () => {
    if(soundCheckElement.checked) {
        volumeOff.style.opacity = 0;
        volumeOn.style.opacity = 1;
    } else {
        volumeOn.style.opacity = 0;
        volumeOff.style.opacity = 1;
    }
})

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

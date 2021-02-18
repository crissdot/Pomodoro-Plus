import './style.css';
import TimerUp from './CountUpTimer.js';
import TimerDown from './CountDownTimer.js';

const displayTimer = document.querySelector('.timer__counter');

function makeTimerUp() {
    const countUpTimer = {
        timer: displayTimer,
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
        timer: displayTimer,
        time: {
            minutes,
            seconds,
        },
    }

    const timerDown = new TimerDown(countDownTimer);
    return timerDown;
}

export { makeTimerUp, makeTimerDown };

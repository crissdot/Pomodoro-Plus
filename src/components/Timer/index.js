import './style.css';
import Timer from './CountTimer.js';
import TimerUp from './CountUpTimer.js';
import TimerDown from './CountDownTimer.js';


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

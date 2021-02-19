import './components/Header';
import { makeTimerUp, makeTimerDown } from './components/Timer';
import { addFocusTime } from './components/FocusTime';

import { getTimeFromSeconds } from './utils/getTimeFromSeconds.js';
import { disabledStart, disabledPause, disabledFinish, handleDisabledButtons } from './utils/handleDisabledButtons.js';

const btnStart = document.getElementById('start');
const btnPause = document.getElementById('pause');
const btnFinish = document.getElementById('finish');
const buttons = {
    btnStart,
    btnPause,
    btnFinish,
};

let isFocusing = true;
let isRunning = false;

const timerUp = makeTimerUp();
let timerDown;
let time = {
    minutes: 0,
    seconds: 0,
};


btnStart.addEventListener('click', () => {
    if(isFocusing && !isRunning) {
        isFocusing = timerUp.start();
        isRunning = true;
    }
    if(!isFocusing && !isRunning) {
        timerDown = makeTimerDown(time.minutes, time.seconds);
        isFocusing = timerDown.start();
        isRunning = true;
    }

    handleDisabledButtons(buttons, disabledStart);
});

btnPause.addEventListener('click', () => {
    if(isFocusing && isRunning) {
        timerUp.pause();
        isRunning = false;
    }
    if(!isFocusing && isRunning) {
        timerDown.pause();
        isRunning = false;
    }

    handleDisabledButtons(buttons, disabledPause);
});

btnFinish.addEventListener('click', () => {
    if(!isFocusing) {
        const [ , , isFocus] = timerDown.finish();
        isFocusing = isFocus;
        isRunning = false;
    }
    if(isFocusing) {
        const [minutes, seconds, isFocus] = timerUp.finish();
        time = makeRestTime(minutes);
        addFocusTime(minutes, seconds);
        isFocusing = isFocus;
        isRunning = false;
    }

    handleDisabledButtons(buttons, disabledFinish);
});


function makeRestTime(totalMinutes) {
    let secondsToRest = 0;
    for(let i = 0; i < totalMinutes; i++) secondsToRest += 10;
    secondsToRest += parseInt(totalMinutes / 5) * 10;
    const [minutes, seconds] = getTimeFromSeconds(secondsToRest);
    return {minutes, seconds};
}

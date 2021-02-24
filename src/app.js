import './components/Header';
import { makeTimerUp, makeTimerDown, renderTimer } from './components/Timer';
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
    if(!isRunning) {
        if(isFocusing) isFocusing = timerUp.start();
        else isFocusing = timerDown.start();

        isRunning = true;
    }

    handleDisabledButtons(buttons, disabledStart);
});

btnPause.addEventListener('click', () => {
    if(isRunning) {
        if(isFocusing) timerUp.pause();
        else timerDown.pause();

        isRunning = false;
    }

    handleDisabledButtons(buttons, disabledPause);
});

btnFinish.addEventListener('click', () => {
    if(isFocusing) {
        const [minutes, seconds, isFocus] = timerUp.finish();
        time = makeRestTime(minutes);
        addFocusTime(minutes, seconds);
        isFocusing = isFocus;

        if(minutes >= 5) {
            renderTimer(time.minutes, time.seconds);
            timerDown = makeTimerDown(time.minutes, time.seconds);
            timerDown.start();
            isRunning = true;
            return;
        }
    } else {
        const [ , , isFocus] = timerDown.finish();
        isFocusing = isFocus;
    }

    isRunning = false;
    handleDisabledButtons(buttons, disabledFinish);
});


function makeRestTime(totalMinutes) {
    let secondsToRest = 0;
    for(let i = 0; i < totalMinutes; i++) secondsToRest += 10;
    secondsToRest += parseInt(totalMinutes / 5) * 10;
    const [minutes, seconds] = getTimeFromSeconds(secondsToRest);
    return {minutes, seconds};
}

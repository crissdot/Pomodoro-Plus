import { header, headerTitle, headerIcons } from './components/Header';
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
let restTime = {
    minutes: 0,
    seconds: 0,
};
let restTimeout;
let restTimeRemaining;
let restTimeStart;


btnStart.addEventListener('click', () => {
    if(!isRunning) {
        if(isFocusing) {
            isFocusing = timerUp.start();
            headerTitle.innerHTML = 'FOCUSING';
        }
        else {
            isFocusing = timerDown.start();
            timeoutFinishRestTime(restTimeRemaining);
        }

        isRunning = true;
    }

    handleDisabledButtons(buttons, disabledStart);
});

btnPause.addEventListener('click', () => {
    if(isRunning) {
        if(isFocusing) timerUp.pause();
        else {
            timerDown.pause();
            clearTimeout(restTimeout);
            restTimeRemaining -= Date.now() - restTimeStart;
        }

        isRunning = false;
    }

    handleDisabledButtons(buttons, disabledPause);
});

btnFinish.addEventListener('click', () => {
    if(isFocusing) {
        const [minutes, seconds, isFocus] = timerUp.finish();
        isFocusing = isFocus;
        restTime = makeRestTime(minutes);
        addFocusTime(minutes, seconds);

        if(minutes >= 5) {
            headerTitle.innerHTML = 'RESTING';
            header.classList.add('header--rest');
            headerIcons[0].classList.add('header__svg--rest');
            headerIcons[1].classList.add('header__svg--rest');
            const {minutes, seconds} = restTime;
            renderTimer(minutes, seconds);
            timerDown = makeTimerDown(minutes, seconds);
            timerDown.start();
            isRunning = true;
            restTimeRemaining = (minutes * 60 + seconds) * 1000;
            timeoutFinishRestTime(restTimeRemaining);
            return;
        }
    } else {
        finishRestTime();
        clearTimeout(restTimeout);
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

function timeoutFinishRestTime(milliseconds) {
    restTimeout = setTimeout(() => {
        finishRestTime();
        isRunning = false;
        handleDisabledButtons(buttons, disabledFinish);
    }, milliseconds);
    restTimeStart = Date.now();
}

function finishRestTime() {
    headerTitle.innerHTML = 'POMODORO PLUS';
    header.classList.remove('header--rest');
    headerIcons[0].classList.remove('header__svg--rest');
    headerIcons[1].classList.remove('header__svg--rest');
    const [ , , isFocus] = timerDown.finish();
    isFocusing = isFocus;
}

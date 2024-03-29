import { header, headerTitle, headerIcons } from './components/Header';
import { makeTimerUp, makeTimerDown, renderTimer } from './components/Timer';
import { addFocusTime } from './components/FocusTime';

import { getTimeFromSeconds } from './utils/getTimeFromSeconds.js';
import { disabledStart, disabledPause, disabledFinish, handleDisabledButtons } from './utils/handleDisabledButtons.js';

const favicon = document.getElementById('favicon');
import pomodoroFavicon from './images/pomodoro.png';
import redFavicon from './images/red.png';
import orangeFavicon from './images/orange.png';
import greenFavicon from './images/green.png';

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
            favicon.setAttribute('href', redFavicon);
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
        if(isFocusing) {
            timerUp.pause();
            favicon.setAttribute('href', orangeFavicon);
        }
        else {
            timerDown.pause();
            clearTimeout(restTimeout);
            restTimeRemaining -= Date.now() - restTimeStart;
            restTimeRemaining = Math.ceil(restTimeRemaining / 1000) * 1000;
        }

        isRunning = false;
    }

    handleDisabledButtons(buttons, disabledPause);
});

btnFinish.addEventListener('click', () => {
    if(isFocusing) {
        const [mins, secs, isFocus] = timerUp.finish();
        isFocusing = isFocus;

        if(mins >= 5) {
            restTime = makeRestTime(mins);
            addFocusTime(mins, secs);
            headerTitle.innerHTML = 'RESTING';
            header.classList.add('header--rest');
            headerIcons.classList.add('header__svg--rest');
            if(window.matchMedia('(min-width: 600px)').matches) {
                btnStart.parentElement.parentElement.classList.add('scrollbar--rest');
            }
            const {minutes, seconds} = restTime;
            renderTimer(minutes, seconds);
            timerDown = makeTimerDown(minutes, seconds);
            timerDown.start();
            isRunning = true;
            restTimeRemaining = (minutes * 60 + seconds) * 1000;
            timeoutFinishRestTime(restTimeRemaining);
            btnFinish.blur();

            favicon.setAttribute('href', greenFavicon);
            return;
        } else {
            headerTitle.innerHTML = 'POMODORO PLUS';
            favicon.setAttribute('href', pomodoroFavicon);
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
    headerIcons.classList.remove('header__svg--rest');
    if(window.matchMedia('(min-width: 600px)').matches) {
        btnStart.parentElement.parentElement.classList.remove('scrollbar--rest');
    }
    const [ , , isFocus] = timerDown.finish();
    isFocusing = isFocus;

    favicon.setAttribute('href', pomodoroFavicon);
}

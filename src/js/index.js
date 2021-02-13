import '../css/index.css';

import Timer from './Timer.js';

const displayTimer = document.querySelector('.timer__counter');
const btnStart = document.querySelector('.timer__btn--start');
const btnPause = document.querySelector('.timer__btn--stop');
const btnFinish = document.querySelector('.timer__btn--again');
const productivityTime = document.querySelector('.productivity__time');
const productivityTotal = document.querySelector('.productivity__total');

const timerCounter = {
    timer: displayTimer,
    time: {
        hours: 0,
        minutes: 0,
        seconds: 0,
    },
    productivityTime,
    productivityTotal,
}

const timer = new Timer(timerCounter);

btnStart.addEventListener('click', startHandler);

btnFinish.addEventListener('click', () => {
    btnStart.addEventListener('click', startHandler);
    timer.finish();
    btnStart.style.opacity = 1;
    btnStart.disabled = false;
    btnPause.style.opacity = 0;
    btnPause.disabled = true;
    btnFinish.style.opacity = 0;
    btnFinish.disabled = true;
});

btnPause.addEventListener('click', () => {
    btnStart.addEventListener('click', startHandler);
    timer.pause();
    btnStart.style.opacity = 1;
    btnStart.disabled = false;
    btnPause.style.opacity = 0;
    btnPause.disabled = true;
});

function startHandler() {
    btnStart.removeEventListener('click', startHandler);
    timer.start();
    btnStart.style.opacity = 0;
    btnStart.disabled = true;
    btnPause.style.opacity = 1;
    btnPause.disabled = false;
    btnFinish.style.opacity = 1;
    btnFinish.disabled = false;
}

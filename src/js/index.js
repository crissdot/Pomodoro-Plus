import Timer from './Timer.js';

const displayTimer = document.querySelector('.timer__counter');
const btnStart = document.querySelector('.timer__btn--start');
const btnAgain = document.querySelector('.timer__btn--again');
const btnStop = document.querySelector('.timer__btn--stop');
const productivityTime = document.querySelector('.productivity__time');
const productivityTotal = document.querySelector('.productivity__total');

const timerCounter = {
    timer: displayTimer,
    time: {
        hours: 0,
        minutes: 4,
        seconds: 58,
    },
    productivityTime,
    productivityTotal,
}

const timer = new Timer(timerCounter);

btnStart.addEventListener('click', () => {
    timer.start();
});

btnAgain.addEventListener('click', () => {
    timer.finish();
})

btnStop.addEventListener('click', () => {
    timer.pause();
});

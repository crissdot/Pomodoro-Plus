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

    // TODO refactor this
    // const allTime = document.querySelectorAll('.productivity__time > p');
    // let totalTime = 0;
    // allTime.forEach(p => {
    //     const time = p.innerHTML.split(':');
    //     totalTime += time[0]*60 + parseInt(time[1]);
    // });
    // for(var i = 0; totalTime >= 60; i++) {
    //     totalTime -= 60;
    // }
    // let min = i;
    // total.innerHTML = `Total: ${min}:${totalTime}`;
})

btnStop.addEventListener('click', () => {
    clearInterval(runTimer);
});

function setTimer({minutes, seconds}) {
    if(seconds === 59) {
        minutes++;
        seconds = 0;
    } else seconds++;

    return {minutes, seconds};
}

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
        minutes: 0,
        seconds: 0,
    },
    productivityTime,
    productivityTotal,
}

const timer = new Timer(timerCounter);

let runTimer;
// let timer = {
//     minutes: 0,
//     seconds: 0,
// };

btnStart.addEventListener('click', () => {
    // runTimer = setInterval(() => {
    //     timer = setTimer(timer);
    //     const {minutes, seconds} = timer;
    //     displayTimer.innerHTML = `${minutes}:${seconds}`;
    //     if(timer.minutes === 25) {
    //         displayTimer.classList.add('timer__counter--rest');
    //     }
    // }, 1000);
    timer.start();
});

btnAgain.addEventListener('click', () => {
    // clearInterval(runTimer);
    // if(timer.minutes >= 5) {
    //     const p = document.createElement('p');
    //     const text = document.createTextNode(`${timer.minutes}:${timer.seconds}`);
    //     p.appendChild(text);
    //     productivityTime.appendChild(p);
    // }
    // timer = {
    //     minutes: 0,
    //     seconds: 0,
    // };
    // displayTimer.classList.remove('timer__counter--rest');
    // displayTimer.innerHTML = '0:0';

    timer.finish();

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

const displayTimer = document.querySelector('.timer');
const btnStart = document.querySelector('.start');
const btnAgain = document.querySelector('.again');
const btnStop = document.querySelector('.stop');
const productivityTime = document.querySelector('.productivity-time');
const total = document.querySelector('.total');

let runTimer;
let timer = {
    minutes: 0,
    seconds: 0,
};

btnStart.addEventListener('click', () => {
    runTimer = setInterval(() => {
        timer = setTimer(timer);
        const {minutes, seconds} = timer;
        displayTimer.innerHTML = `${minutes}:${seconds}`;
        if(timer.minutes === 25) {
            displayTimer.classList.add('rest-time');
        }
    }, 1000);
});

btnAgain.addEventListener('click', () => {
    clearInterval(runTimer);
    if(timer.minutes >= 5) {
        const p = document.createElement('p');
        const text = document.createTextNode(`${timer.minutes}:${timer.seconds}`);
        p.appendChild(text);
        productivityTime.appendChild(p);
    }
    timer = {
        minutes: 0,
        seconds: 0,
    };
    displayTimer.classList.remove('rest-time');
    displayTimer.innerHTML = '0:0';

    const allTime = document.querySelectorAll('.productivity-time > p');
    let totalTime = 0;
    allTime.forEach(p => {
        const time = p.innerHTML.split(':');
        totalTime += time[0]*60 + parseInt(time[1]);
    });
    for(var i = 0; totalTime >= 60; i++) {
        totalTime -= 60;
    }
    let min = i;
    total.innerHTML = `Total: ${min}:${totalTime}`;
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

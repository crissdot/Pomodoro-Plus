import './style.css';
import Timer from './CountUpTimer.js';

const displayTimer = document.querySelector('.timer__counter');
const btnStart = document.getElementById('start');
const btnPause = document.getElementById('pause');
const btnFinish = document.getElementById('finish');
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

btnStart.addEventListener('click', () => {
    timer.start();
    handleDisabled({
        isStartDisabled: true,
        isPauseDisabled: false,
        isFinishDisabled: false,
    });
});

btnPause.addEventListener('click', () => {
    timer.pause();
    handleDisabled({
        isStartDisabled: false,
        isPauseDisabled: true,
    });
});

btnFinish.addEventListener('click', () => {
    timer.finish();
    handleDisabled({
        isStartDisabled: false,
        isPauseDisabled: true,
        isFinishDisabled: true,
    });
});


function handleDisabled({isStartDisabled, isPauseDisabled, isFinishDisabled=false}) {
    btnStart.disabled = isStartDisabled;
    isStartDisabled ? btnStart.classList.add('timer__btn--disabled') : btnStart.classList.remove('timer__btn--disabled');
    btnPause.disabled = isPauseDisabled;
    isPauseDisabled ? btnPause.classList.add('timer__btn--disabled') : btnPause.classList.remove('timer__btn--disabled');
    btnFinish.disabled = isFinishDisabled;
    isFinishDisabled ? btnFinish.classList.add('timer__btn--disabled') : btnFinish.classList.remove('timer__btn--disabled');
}

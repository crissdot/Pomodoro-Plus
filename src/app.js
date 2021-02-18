import './components/Header';
import { makeTimerUp, makeTimerDown } from './components/Timer';
import { addFocusTime } from './components/FocusTime';

const btnStart = document.getElementById('start');
const btnPause = document.getElementById('pause');
const btnFinish = document.getElementById('finish');

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
    handleDisabled({
        isStartDisabled: true,
        isPauseDisabled: false,
        isFinishDisabled: false,
    });
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
    handleDisabled({
        isStartDisabled: false,
        isPauseDisabled: true,
    });
});

btnFinish.addEventListener('click', () => {
    if(!isFocusing) {
        const [ , , isFocus] = timerDown.finish();
        isFocusing = isFocus;
        isRunning = false;
    }
    if(isFocusing) {
        const [minutes, seconds, isFocus] = timerUp.finish();
        time.minutes = minutes;
        time.seconds = seconds;
        addFocusTime(minutes, seconds);
        isFocusing = isFocus;
        isRunning = false;
    }
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

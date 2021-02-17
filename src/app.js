import './components/Header';
import timer from './components/Timer';
import { addFocusTime } from './components/FocusTime';

const btnStart = document.getElementById('start');
const btnPause = document.getElementById('pause');
const btnFinish = document.getElementById('finish');


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
    const [minutes, seconds] = timer.finish();
    addFocusTime(minutes, seconds);
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
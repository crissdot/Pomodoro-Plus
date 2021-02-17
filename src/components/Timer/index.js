import './style.css';
import TimerUp from './CountUpTimer.js';

const displayTimer = document.querySelector('.timer__counter');

const timerCounter = {
    timer: displayTimer,
    time: {
        minutes: 0,
        seconds: 0,
    },
}

const timer = new TimerUp(timerCounter);

export default timer;

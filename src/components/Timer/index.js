import './style.css';
import Timer from './CountUpTimer.js';

const displayTimer = document.querySelector('.timer__counter');

const timerCounter = {
    timer: displayTimer,
    time: {
        minutes: 0,
        seconds: 0,
    },
}

const timer = new Timer(timerCounter);

export default timer;

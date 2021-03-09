const displayTimer = document.querySelector('.timer__counter');

import { makeFormat } from '../../utils/makeTimerFormat.js';

class Timer {
    static isFocusing = true;
    static timerCounter = displayTimer;

    constructor({time}) {
        this.minutes = time.minutes;
        this.seconds = time.seconds;
        this.interval = null;
    }

    start() {
        if(this.interval) return;
        Timer.timerCounter.style.opacity = '1';
        this.interval = setInterval(() => {
            this._formatTimer();
            Timer.render(this.minutes, this.seconds);
        }, 1000);
        return Timer.isFocusing;
    }

    pause() {
        if(!this.interval) return;
        Timer.timerCounter.style.opacity = '0.5';
        clearInterval(this.interval);
        this.interval = null;
    }

    finish() {
        clearInterval(this.interval);
        Timer.timerCounter.style.opacity = '1';
        this.interval = null;
        const [minutes, seconds, isFocusing] = this._resetTimer();
        if(!(isFocusing && minutes < 5)) Timer.isFocusing = !Timer.isFocusing;
        return [minutes, seconds, Timer.isFocusing];
    }

    _formatTimer() {}

    static render(minutes, seconds) {
        minutes = makeFormat(minutes);
        seconds = makeFormat(seconds);
        Timer.timerCounter.innerHTML = `${minutes}:${seconds}`;
    }

    _resetTimer() {}

}

export default Timer;

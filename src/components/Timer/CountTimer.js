const displayTimer = document.querySelector('.timer__counter');

import { makeFormat } from '../../utils/makeTimerFormat.js';

class Timer {
    static isFocusing = true;
    static timerCounter = displayTimer;

    constructor({time}) {
        this.minutes = time.minutes;
        this.seconds = time.seconds;
        this.interval = null;

        this._handlerVisibilityChange = this._handlerVisibilityChange.bind(this);
    }

    start() {
        if(this.interval) return;
        document.addEventListener('visibilitychange', this._handlerVisibilityChange);
        Timer.timerCounter.style.opacity = '1';
        this.interval = setInterval(() => {
            this._formatTimer();
            this._handlerVisibilityChange();
        }, 1000);
        return Timer.isFocusing;
    }

    pause() {
        if(!this.interval) return;
        clearInterval(this.interval);
        Timer.timerCounter.style.opacity = '0.5';
        this.interval = null;
        document.removeEventListener('visibilitychange', this._handlerVisibilityChange);
    }

    finish() {
        clearInterval(this.interval);
        Timer.timerCounter.style.opacity = '1';
        this.interval = null;
        document.removeEventListener('visibilitychange', this._handlerVisibilityChange);
        const [minutes, seconds, isFocusing] = this._resetTimer();
        if(!(isFocusing && minutes < 5)) Timer.isFocusing = !Timer.isFocusing;
        return [minutes, seconds, Timer.isFocusing];
    }

    _handlerVisibilityChange() {
        const isVisible = document.visibilityState === 'visible';

        if(isVisible) Timer.render(this.minutes, this.seconds);
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

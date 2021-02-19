import { makeFormat } from '../../utils/makeTimerFormat.js';
class Timer {
    static isFocusing;

    constructor(timer) {
        this.timerCounter = timer.timer;
        this.minutes = timer.time.minutes || 0;
        this.seconds = timer.time.seconds || 0;
        this.interval = null;
    }

    start() {
        if(this.interval) return;
        this.interval = setInterval(() => {
            this._formatTimer();
            const minutes = makeFormat(this.minutes);
            const seconds = makeFormat(this.seconds);
            this.timerCounter.innerHTML = `${minutes}:${seconds}`;
        }, 1000);
        return this.isFocusing;
    }

    pause() {
        if(!this.interval) return;
        clearInterval(this.interval);
        this.interval = null;
    }

    finish() {
        clearInterval(this.interval);
        this.interval = null;
        this.isFocusing = !this.isFocusing;
        const [minutes, seconds] = this._resetTimer();
        return [minutes, seconds, this.isFocusing];
    }

    _resetTimer() {}

    _formatTimer() {}

}

export default Timer;

class Timer {
    constructor(timer) {
        this.timerCounter = timer.timer;
        this.minutes = timer.time.minutes || 0;
        this.seconds = timer.time.seconds || 0;
        this.interval;
    }

    start() {
        this.interval = setInterval(() => {
            this._formatTimer();
            this.timerCounter.innerHTML = `${this.minutes}:${this.seconds}`;
        }, 1000);
    }

    pause() {
        clearInterval(this.interval);
    }

    finish() {
        clearInterval(this.interval);
        const [minutes, seconds] = this._resetTimer();
        return [minutes, seconds];
    }

    _resetTimer() {}

    _formatTimer() {}

}

export default Timer;

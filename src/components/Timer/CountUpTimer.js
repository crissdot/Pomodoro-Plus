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
        this._resetTimer();
    }

    _resetTimer() {
        this.minutes = 0;
        this.seconds = 0;
        this.timerCounter.classList.remove('timer__counter--rest');
        this.timerCounter.innerHTML = '00:00';
    }

    _formatTimer() {
        if(this.seconds === 59) {
            this.minutes++;
            this.seconds = 0;
        } else this.seconds++;
        if(this.minutes === 25 && this.seconds === 0) this.timerCounter.classList.add('timer__counter--rest');
    }

}

export default Timer;

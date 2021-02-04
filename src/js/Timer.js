class Timer {
    constructor(timer) {
        this.timerCounter = timer.timer;
        this.hours = timer.time.hours || 0;
        this.minutes = timer.time.minutes || 0;
        this.seconds = timer.time.seconds || 0;
    }

    start() {
        setInterval(() => {
            this._formatTimer();
            this.timerCounter.innerHTML = `${this.minutes}:${this.seconds}`;
        }, 1000);
    }

    _formatTimer() {
        if(this.seconds === 59) {
            this.minutes++;
            this.seconds = 0;
        } else this.seconds++;
    }
}

export default Timer;

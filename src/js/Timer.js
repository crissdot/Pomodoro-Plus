class Timer {
    constructor(timer) {
        this.timerCounter = timer.timer;
        this.hours = timer.time.hours || 0;
        this.minutes = timer.time.minutes || 0;
        this.seconds = timer.time.seconds || 0;
        this.interval;
        this.productivityTime = timer.productivityTime;
        this.productivityTotal = timer.productivityTotal;
    }

    start() {
        this.interval = setInterval(() => {
            this._formatTimer();
            this.timerCounter.innerHTML = `${this.minutes}:${this.seconds}`; // TODO add rest class
        }, 1000);
    }

    finish() {
        clearInterval(this.interval);
        this._addProductivityTime();
        this._resetTimer();
    }

    _resetTimer() {
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0; // TODO remove rest class
        this.timerCounter.innerHTML = '0:0';
    }

    _formatTimer() {
        if(this.seconds === 1) {
            this.minutes++;
            this.seconds = 0;
        } else this.seconds++;
    }

    _addProductivityTime() {
        if(this.minutes >= 5 || this.hours > 0) {
            const productivityTime = document.createElement('p');
            productivityTime.append(`${this.minutes}:${this.seconds}`.toString());
            this.productivityTime.appendChild(productivityTime);
        }
    }
}

export default Timer;

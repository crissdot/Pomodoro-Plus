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
            this.timerCounter.innerHTML = `${this.minutes}:${this.seconds}`;
        }, 1000);
    }

    finish() {
        clearInterval(this.interval);
        this._addProductivityTime();
        this._resetTimer();
    }

    pause() {
        clearInterval(this.interval);
    }

    _resetTimer() {
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.timerCounter.classList.remove('timer__counter--rest');
        this.timerCounter.innerHTML = '0:0';
    }

    _formatTimer() {
        if(this.seconds === 59) {
            this.minutes++;
            this.seconds = 0;
        } else this.seconds++;
        if(this.minutes === 5 && this.seconds === 0) this.timerCounter.classList.add('timer__counter--rest');
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

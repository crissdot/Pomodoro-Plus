class Timer {
    constructor(timer) {
        this.header = timer.header;
        this.headerTitle = timer.headerTitle;
        this.timerCounter = timer.timer;
        this.hours = timer.time.hours || 0;
        this.minutes = timer.time.minutes || 0;
        this.seconds = timer.time.seconds || 0;
        this.interval;
        this.productivityTime = timer.productivityTime;
        this.productivityTotal = timer.productivityTotal;
        this.isStarted = false;
        this.isRestTime = false;
    }

    start() {
        if(this.isStarted) return;
        this.interval = setInterval(() => {
            this._formatTimer();
            this.timerCounter.innerHTML = `${this.minutes}:${this.seconds}`;
        }, 1000);
        this.isStarted = true;
        if(!this.isRestTime) this.headerTitle.innerHTML = 'WORKING';
    }

    finish() {
        clearInterval(this.interval);
        if (this.isRestTime) {
            this._resetTimer();
            this.isRestTime = false;
            this.timerCounter.classList.remove('timer__counter--rest');
            this.isStarted = false;
            this.header.classList.remove('header--rest');
            this.headerTitle.innerHTML = 'POMODORO PLUS';
            return
        }
        this._addProductivityTime();
        this._resetTimer();
        this.timerCounter.classList.add('timer__counter--rest');
        const totalTime  = this._makeSumOfProductivityTime();
        this.productivityTotal.innerHTML = `Total: ${totalTime}`
        this.isStarted = false;
        this.start();
        this.header.classList.add('header--rest');
        this.headerTitle.innerHTML = 'RESTING';
    }

    pause() {
        clearInterval(this.interval);
        this.isStarted = false;
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
        if(this.minutes === 25 && this.seconds === 0) this.timerCounter.classList.add('timer__counter--rest');
    }

    _addProductivityTime() {
        if(this.minutes >= 0 || this.hours > 0) {
            const productivityTime = document.createElement('p');
            productivityTime.append(`${this.minutes}:${this.seconds}`.toString());
            this.productivityTime.appendChild(productivityTime);
            this.isRestTime = true;
        }
    }

    _makeSumOfProductivityTime() {
        const allTimeNodeList = this.productivityTime.querySelectorAll('p');
        const allTimeElement = [...allTimeNodeList];
        const allTime = allTimeElement.map(timeElement => timeElement.innerText);

        const totalTimeInSeconds = allTime.reduce((totalTime, timeText) => {
            const time = timeText.split(':');
            const timeInSeconds = this._getTimeFromFormatTime(time);
            return totalTime + timeInSeconds;
        }, 0);
        const totalTime = this._getFormatTimeFromTime(totalTimeInSeconds);
        return totalTime;
    }

    _getTimeFromFormatTime(time) {
        const minutes = parseInt(time[0]) * 60;
        const seconds = parseInt(time[1]);
        return minutes + seconds;
    }

    _getFormatTimeFromTime(totalTimeInSeconds) {
        let i;
        for(i = 0; totalTimeInSeconds >= 60; i++) {
            totalTimeInSeconds -= 60;
        }
        const min = i;
        return `${min}:${totalTimeInSeconds}`;
    }
}

export default Timer;

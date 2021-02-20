import Timer from './CountTimer.js';

class TimerDown extends Timer {
    constructor(timer) {
        super(timer);
        this.timerCounter.classList.add('timer__counter--rest');
    }

    _resetTimer() {
        this.minutes = 0;
        this.seconds = 0;
        this.timerCounter.innerHTML = '00:00';
        return [0, 0];
    }

    _formatTimer() {
        if(this.seconds === 0) {
            this.minutes--;
            this.seconds = 59;
        } else this.seconds--;
        if(this.minutes === 0 && this.seconds === 0) {
            this.timerCounter.classList.remove('timer__counter--rest');
            clearInterval(this.interval);
        }
    }

}

export default TimerDown;

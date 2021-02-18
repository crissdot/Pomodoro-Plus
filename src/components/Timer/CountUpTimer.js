import Timer from './CountTimer.js';

class TimerUp extends Timer {
    constructor(timer) {
        super(timer);
        this.isFocusing = true;
        this.timerCounter.classList.remove('timer__counter--rest');
    }

    _resetTimer() {
        const [minutes, seconds] = [this.minutes, this.seconds];
        this.minutes = 0;
        this.seconds = 0;
        this.timerCounter.classList.remove('timer__counter--rest');
        this.timerCounter.innerHTML = '00:00';
        return [minutes, seconds];
    }

    _formatTimer() {
        if(this.seconds === 59) {
            this.minutes++;
            this.seconds = 0;
        } else this.seconds++;
        if(this.minutes === 25 && this.seconds === 0) this.timerCounter.classList.add('timer__counter--rest');
    }

}

export default TimerUp;

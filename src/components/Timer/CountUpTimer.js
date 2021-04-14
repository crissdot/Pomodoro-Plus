import Timer from './CountTimer.js';
const timerLegend = document.querySelector('.timer__legend');

const favicon = document.getElementById('favicon');
import greenFavicon from '../../images/green.png';

const checkElement = document.querySelector('#toggle--sound');
import finishTimeSoundFile from '../../sounds/finishFocusTime.mp3';
const finishTimeSound = new Audio(finishTimeSoundFile);

class TimerUp extends Timer {
    constructor(timer) {
        super(timer);
        this.isFocusing = true;
        Timer.timerCounter.classList.remove('timer__counter--rest');
    }

    _resetTimer() {
        const [minutes, seconds] = [this.minutes, this.seconds];
        this.minutes = 0;
        this.seconds = 0;
        Timer.timerCounter.classList.remove('timer__counter--rest');
        timerLegend.style.opacity = 0;
        Timer.timerCounter.innerHTML = '00:00';
        return [minutes, seconds, this.isFocusing];
    }

    _formatTimer() {
        if(this.seconds === 59) {
            this.minutes++;
            this.seconds = 0;
        } else this.seconds++;
        if(this.minutes === 25 && this.seconds === 0) {
            Timer.timerCounter.classList.add('timer__counter--rest');
            timerLegend.style.opacity = 1;

            favicon.setAttribute('href', greenFavicon);

            if(checkElement.checked) finishTimeSound.play();
        }
    }

}

export default TimerUp;

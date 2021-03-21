import './style.css';

import { makeFormat } from '../../utils/makeTimerFormat.js';
import { getTimeFromSeconds } from '../../utils/getTimeFromSeconds.js';

const focusTimeContainer = document.querySelector('.focus__time');
const focusTotal = document.querySelector('.focus__total');
const btnCleanTime = document.querySelector('.focus__btn');

const initialLengthFocusTime = localStorage.getItem('length');
if(initialLengthFocusTime > 0) {
    for(let i = 0; i < initialLengthFocusTime; i++) {
        const focusTimeP = document.createElement('p');
        const focusTime = localStorage.getItem(i);
        focusTimeP.append(focusTime);
        focusTimeContainer.appendChild(focusTimeP);
    }
    makeSumOfFocusTime();
} else {
    disableBtnCleanTime();
}

btnCleanTime.addEventListener('click', () => {
    const allTimeNodeList = focusTimeContainer.querySelectorAll('p');
    const allTimeElement = [...allTimeNodeList];
    allTimeElement.forEach(timeElement => {
        focusTimeContainer.removeChild(timeElement);
    });

    focusTotal.innerHTML = 'Total: 00:00';
    btnCleanTime.blur();

    localStorage.clear();
    localStorage.setItem('length', 0);

    disableBtnCleanTime();
});

function disableBtnCleanTime() {
    btnCleanTime.style.opacity = 0;
    btnCleanTime.style.cursor = 'auto';
    btnCleanTime.disabled = true;
}

function addFocusTime(minutes, seconds) {
    if(minutes >= 5) {
        const focusTime = document.createElement('p');
        minutes = makeFormat(minutes);
        seconds = makeFormat(seconds);
        focusTime.append(`${minutes}:${seconds}`.toString());
        focusTimeContainer.appendChild(focusTime);

        const lengthFocusTime = localStorage.getItem('length');
        if(lengthFocusTime == 0) {
            btnCleanTime.style.opacity = 1;
            btnCleanTime.style.cursor = 'pointer';
            btnCleanTime.disabled = false;
        }
        localStorage.setItem('length', lengthFocusTime-1+2);
        localStorage.setItem(lengthFocusTime, `${minutes}:${seconds}`);
        makeSumOfFocusTime();
    }
}

function makeSumOfFocusTime() {
    const allTimeNodeList = focusTimeContainer.querySelectorAll('p');
    const allTimeElement = [...allTimeNodeList];
    const allTime = allTimeElement.map(timeElement => timeElement.innerText);

    const totalTimeInSeconds = allTime.reduce((totalTime, timeText) => {
        const time = timeText.split(':');
        const timeInSeconds = getTimeFromFormatTime(time);
        return totalTime + timeInSeconds;
    }, 0);
    const [min, sec] = getTimeFromSeconds(totalTimeInSeconds)
    const minutes = makeFormat(min);
    const seconds = makeFormat(sec);
    const totalTime = `${minutes}:${seconds}`;
    focusTotal.innerHTML = `Total: ${totalTime}`;
}

function getTimeFromFormatTime(time) {
    const minutes = parseInt(time[0]) * 60;
    const seconds = parseInt(time[1]);
    return minutes + seconds;
}

export { addFocusTime };
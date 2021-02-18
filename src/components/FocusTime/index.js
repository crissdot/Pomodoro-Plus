import './style.css';

import { getTimeFromSeconds } from '../../utils/getTimeFromSeconds.js';

const focusTimeContainer = document.querySelector('.focus__time');
const focusTotal = document.querySelector('.focus__total');

function addFocusTime(minutes, seconds) {
    if(minutes >= 5) {
        const focusTime = document.createElement('p');
        focusTime.append(`${minutes}:${seconds}`.toString());
        focusTimeContainer.appendChild(focusTime);
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
    const [minutes, seconds] = getTimeFromSeconds(totalTimeInSeconds)
    const totalTime = `${minutes}:${seconds}`;
    focusTotal.innerHTML = `Total: ${totalTime}`;
}

function getTimeFromFormatTime(time) {
    const minutes = parseInt(time[0]) * 60;
    const seconds = parseInt(time[1]);
    return minutes + seconds;
}

export { addFocusTime };
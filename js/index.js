/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	}();
/******/ 	
/************************************************************************/

;// CONCATENATED MODULE: ./src/components/Header/index.js

const header = document.querySelector('header');
const headerTitle = document.querySelector('.header__title');
const headerIcons = document.querySelector('.header__icon--github svg');
const bodyElement = document.querySelector('body');
window.addEventListener('load', () => {
  setInitialValueLS();
  const checkElement = document.querySelector('#toggle--dark');
  checkElement.checked = isUsingDarkMode();
  checkElement.addEventListener('change', () => {
    if (checkElement.checked) {
      bodyElement.classList.remove('force-light');
      setDarkModeValueFromLS('dark');
      return bodyElement.classList.add('force-dark');
    }

    bodyElement.classList.remove('force-dark');
    setDarkModeValueFromLS('light');
    return bodyElement.classList.add('force-light');
  });
});

function setInitialValueLS() {
  const savedValue = getDarkModeValueFromLS();
  if (!savedValue) return;
  if (savedValue === 'light') bodyElement.className = 'force-light';
}

function getDarkModeValueFromLS() {
  if (!window.localStorage) return;
  return window.localStorage.getItem('color--scheme');
}

function setDarkModeValueFromLS(value) {
  if (!window.localStorage) return;
  return window.localStorage.setItem('color--scheme', value);
}

function isUsingDarkMode() {
  const blackColor = getComputedStyle(bodyElement).getPropertyValue('--dark').trim();
  const bodyBg = getComputedStyle(bodyElement).backgroundColor;
  return blackColor === rgb2hex(bodyBg);
}

function rgb2hex(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

  function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
  }

  return ("#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3])).toUpperCase();
}


;// CONCATENATED MODULE: ./src/utils/makeTimerFormat.js
function makeFormat(time) {
  if (time < 10) {
    time = time.toString();
    time = "0".concat(time);
  }

  return time;
}


;// CONCATENATED MODULE: ./src/components/Timer/CountTimer.js
const displayTimer = document.querySelector('.timer__counter');


class Timer {
  constructor({
    time
  }) {
    this.minutes = time.minutes;
    this.seconds = time.seconds;
    this.interval = null;
    this._handlerVisibilityChange = this._handlerVisibilityChange.bind(this);
  }

  start() {
    if (this.interval) return;
    document.addEventListener('visibilitychange', this._handlerVisibilityChange);
    Timer.timerCounter.style.opacity = '1';
    this.interval = setInterval(() => {
      this._formatTimer();

      this._handlerVisibilityChange();
    }, 1000);
    return Timer.isFocusing;
  }

  pause() {
    if (!this.interval) return;
    clearInterval(this.interval);
    Timer.timerCounter.style.opacity = '0.5';
    this.interval = null;
    document.removeEventListener('visibilitychange', this._handlerVisibilityChange);
  }

  finish() {
    clearInterval(this.interval);
    Timer.timerCounter.style.opacity = '1';
    this.interval = null;
    document.removeEventListener('visibilitychange', this._handlerVisibilityChange);

    const [minutes, seconds, isFocusing] = this._resetTimer();

    if (!(isFocusing && minutes < 5)) Timer.isFocusing = !Timer.isFocusing;
    return [minutes, seconds, Timer.isFocusing];
  }

  _handlerVisibilityChange() {
    const isVisible = document.visibilityState === 'visible';
    if (isVisible) Timer.render(this.minutes, this.seconds);
  }

  _formatTimer() {}

  static render(minutes, seconds) {
    minutes = makeFormat(minutes);
    seconds = makeFormat(seconds);
    Timer.timerCounter.innerHTML = "".concat(minutes, ":").concat(seconds);
  }

  _resetTimer() {}

}

Timer.isFocusing = true;
Timer.timerCounter = displayTimer;
/* harmony default export */ var CountTimer = (Timer);
;// CONCATENATED MODULE: ./src/images/green.png
/* harmony default export */ var green = (__webpack_require__.p + "images/green.png");
;// CONCATENATED MODULE: ./src/components/Timer/CountUpTimer.js

const timerLegend = document.querySelector('.timer__legend');
const favicon = document.getElementById('favicon');


class TimerUp extends CountTimer {
  constructor(timer) {
    super(timer);
    this.isFocusing = true;
    CountTimer.timerCounter.classList.remove('timer__counter--rest');
  }

  _resetTimer() {
    const [minutes, seconds] = [this.minutes, this.seconds];
    this.minutes = 0;
    this.seconds = 0;
    CountTimer.timerCounter.classList.remove('timer__counter--rest');
    timerLegend.style.opacity = 0;
    CountTimer.timerCounter.innerHTML = '00:00';
    return [minutes, seconds, this.isFocusing];
  }

  _formatTimer() {
    if (this.seconds === 59) {
      this.minutes++;
      this.seconds = 0;
    } else this.seconds++;

    if (this.minutes === 25 && this.seconds === 0) {
      CountTimer.timerCounter.classList.add('timer__counter--rest');
      timerLegend.style.opacity = 1;
      favicon.setAttribute('href', green);
    }
  }

}

/* harmony default export */ var CountUpTimer = (TimerUp);
;// CONCATENATED MODULE: ./src/components/Timer/CountDownTimer.js


class TimerDown extends CountTimer {
  constructor(timer) {
    super(timer);
    this.isFocusing = false;
    CountTimer.timerCounter.classList.add('timer__counter--rest');
  }

  _resetTimer() {
    this.minutes = 0;
    this.seconds = 0;
    CountTimer.timerCounter.innerHTML = '00:00';
    CountTimer.timerCounter.classList.remove('timer__counter--rest');
    return [0, 0, this.isFocusing];
  }

  _formatTimer() {
    if (this.seconds === 0) {
      this.minutes--;
      this.seconds = 59;
    } else this.seconds--;

    if (this.minutes === 0 && this.seconds === 0) clearInterval(this.interval);
  }

}

/* harmony default export */ var CountDownTimer = (TimerDown);
;// CONCATENATED MODULE: ./src/components/Timer/index.js





function makeTimerUp() {
  const countUpTimer = {
    time: {
      minutes: 0,
      seconds: 0
    }
  };
  const timerUp = new CountUpTimer(countUpTimer);
  return timerUp;
}

function makeTimerDown(minutes, seconds) {
  const countDownTimer = {
    time: {
      minutes,
      seconds
    }
  };
  const timerDown = new CountDownTimer(countDownTimer);
  return timerDown;
}

function renderTimer(minutes, seconds) {
  CountTimer.render(minutes, seconds);
}


;// CONCATENATED MODULE: ./src/utils/getTimeFromSeconds.js
function getTimeFromSeconds(totalTimeInSeconds) {
  let i;

  for (i = 0; totalTimeInSeconds >= 60; i++) {
    totalTimeInSeconds -= 60;
  }

  const min = i;
  return [min, totalTimeInSeconds];
}


;// CONCATENATED MODULE: ./src/components/FocusTime/index.js



const focusTimeContainer = document.querySelector('.focus__time');
const focusTotal = document.querySelector('.focus__total');
const btnCleanTime = document.querySelector('.focus__btn');
const initialLengthFocusTime = localStorage.getItem('length');

if (initialLengthFocusTime > 0) {
  for (let i = 0; i < initialLengthFocusTime; i++) {
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
  const isCleanTime = window.confirm('Are you sure?');
  btnCleanTime.blur();

  if (isCleanTime) {
    const allTimeNodeList = focusTimeContainer.querySelectorAll('p');
    const allTimeElement = [...allTimeNodeList];
    allTimeElement.forEach(timeElement => {
      focusTimeContainer.removeChild(timeElement);
    });
    focusTotal.innerHTML = 'Total: 00:00';
    const colorScheme = window.localStorage.getItem('color--scheme');
    localStorage.clear();
    if (colorScheme) window.localStorage.setItem('color--scheme', colorScheme);
    localStorage.setItem('length', 0);
    disableBtnCleanTime();
  }
});

function disableBtnCleanTime() {
  btnCleanTime.style.opacity = 0;
  btnCleanTime.style.cursor = 'auto';
  btnCleanTime.disabled = true;
}

function addFocusTime(minutes, seconds) {
  if (minutes >= 5) {
    const focusTime = document.createElement('p');
    minutes = makeFormat(minutes);
    seconds = makeFormat(seconds);
    focusTime.append("".concat(minutes, ":").concat(seconds).toString());
    focusTimeContainer.appendChild(focusTime);
    const lengthFocusTime = localStorage.getItem('length');

    if (lengthFocusTime == 0) {
      btnCleanTime.style.opacity = 1;
      btnCleanTime.style.cursor = 'pointer';
      btnCleanTime.disabled = false;
    }

    localStorage.setItem('length', lengthFocusTime - 1 + 2);
    localStorage.setItem(lengthFocusTime, "".concat(minutes, ":").concat(seconds));
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
  const [min, sec] = getTimeFromSeconds(totalTimeInSeconds);
  const minutes = makeFormat(min);
  const seconds = makeFormat(sec);
  const totalTime = "".concat(minutes, ":").concat(seconds);
  focusTotal.innerHTML = "Total: ".concat(totalTime);
}

function getTimeFromFormatTime(time) {
  const minutes = parseInt(time[0]) * 60;
  const seconds = parseInt(time[1]);
  return minutes + seconds;
}


;// CONCATENATED MODULE: ./src/utils/handleDisabledButtons.js
const disabledStart = {
  isStartDisabled: true,
  isPauseDisabled: false,
  isFinishDisabled: false
};
const disabledPause = {
  isStartDisabled: false,
  isPauseDisabled: true
};
const disabledFinish = {
  isStartDisabled: false,
  isPauseDisabled: true,
  isFinishDisabled: true
};

function handleDisabledButtons({
  btnStart,
  btnPause,
  btnFinish
}, {
  isStartDisabled,
  isPauseDisabled,
  isFinishDisabled = false
}) {
  btnStart.disabled = isStartDisabled;
  isStartDisabled ? btnStart.classList.add('timer__btn--disabled') : btnStart.classList.remove('timer__btn--disabled');
  btnPause.disabled = isPauseDisabled;
  isPauseDisabled ? btnPause.classList.add('timer__btn--disabled') : btnPause.classList.remove('timer__btn--disabled');
  btnFinish.disabled = isFinishDisabled;
  isFinishDisabled ? btnFinish.classList.add('timer__btn--disabled') : btnFinish.classList.remove('timer__btn--disabled');
}


;// CONCATENATED MODULE: ./src/images/pomodoro.png
/* harmony default export */ var pomodoro = (__webpack_require__.p + "images/pomodoro.png");
;// CONCATENATED MODULE: ./src/images/red.png
/* harmony default export */ var red = (__webpack_require__.p + "images/red.png");
;// CONCATENATED MODULE: ./src/images/orange.png
/* harmony default export */ var orange = (__webpack_require__.p + "images/orange.png");
;// CONCATENATED MODULE: ./src/app.js





const app_favicon = document.getElementById('favicon');




const btnStart = document.getElementById('start');
const btnPause = document.getElementById('pause');
const btnFinish = document.getElementById('finish');
const buttons = {
  btnStart,
  btnPause,
  btnFinish
};
let isFocusing = true;
let isRunning = false;
const timerUp = makeTimerUp();
let timerDown;
let restTime = {
  minutes: 0,
  seconds: 0
};
let restTimeout;
let restTimeRemaining;
let restTimeStart;
btnStart.addEventListener('click', () => {
  if (!isRunning) {
    if (isFocusing) {
      isFocusing = timerUp.start();
      headerTitle.innerHTML = 'FOCUSING';
      app_favicon.setAttribute('href', red);
    } else {
      isFocusing = timerDown.start();
      timeoutFinishRestTime(restTimeRemaining);
    }

    isRunning = true;
  }

  handleDisabledButtons(buttons, disabledStart);
});
btnPause.addEventListener('click', () => {
  if (isRunning) {
    if (isFocusing) {
      timerUp.pause();
      app_favicon.setAttribute('href', orange);
    } else {
      timerDown.pause();
      clearTimeout(restTimeout);
      restTimeRemaining -= Date.now() - restTimeStart;
      restTimeRemaining = Math.ceil(restTimeRemaining / 1000) * 1000;
    }

    isRunning = false;
  }

  handleDisabledButtons(buttons, disabledPause);
});
btnFinish.addEventListener('click', () => {
  if (isFocusing) {
    const [mins, secs, isFocus] = timerUp.finish();
    isFocusing = isFocus;

    if (mins >= 5) {
      restTime = makeRestTime(mins);
      addFocusTime(mins, secs);
      headerTitle.innerHTML = 'RESTING';
      header.classList.add('header--rest');
      headerIcons.classList.add('header__svg--rest');

      if (window.matchMedia('(min-width: 600px)').matches) {
        btnStart.parentElement.parentElement.classList.add('scrollbar--rest');
      }

      const {
        minutes,
        seconds
      } = restTime;
      renderTimer(minutes, seconds);
      timerDown = makeTimerDown(minutes, seconds);
      timerDown.start();
      isRunning = true;
      restTimeRemaining = (minutes * 60 + seconds) * 1000;
      timeoutFinishRestTime(restTimeRemaining);
      btnFinish.blur();
      app_favicon.setAttribute('href', green);
      return;
    } else {
      headerTitle.innerHTML = 'POMODORO PLUS';
      app_favicon.setAttribute('href', pomodoro);
    }
  } else {
    finishRestTime();
    clearTimeout(restTimeout);
  }

  isRunning = false;
  handleDisabledButtons(buttons, disabledFinish);
});

function makeRestTime(totalMinutes) {
  let secondsToRest = 0;

  for (let i = 0; i < totalMinutes; i++) secondsToRest += 10;

  secondsToRest += parseInt(totalMinutes / 5) * 10;
  const [minutes, seconds] = getTimeFromSeconds(secondsToRest);
  return {
    minutes,
    seconds
  };
}

function timeoutFinishRestTime(milliseconds) {
  restTimeout = setTimeout(() => {
    finishRestTime();
    isRunning = false;
    handleDisabledButtons(buttons, disabledFinish);
  }, milliseconds);
  restTimeStart = Date.now();
}

function finishRestTime() {
  headerTitle.innerHTML = 'POMODORO PLUS';
  header.classList.remove('header--rest');
  headerIcons.classList.remove('header__svg--rest');

  if (window.matchMedia('(min-width: 600px)').matches) {
    btnStart.parentElement.parentElement.classList.remove('scrollbar--rest');
  }

  const [,, isFocus] = timerDown.finish();
  isFocusing = isFocus;
  app_favicon.setAttribute('href', pomodoro);
}
;// CONCATENATED MODULE: ./src/index.js


if (localStorage.getItem('length') === null) localStorage.setItem('length', 0);
/******/ })()
;
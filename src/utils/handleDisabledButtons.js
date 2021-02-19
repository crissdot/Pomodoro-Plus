const disabledStart = {
    isStartDisabled: true,
    isPauseDisabled: false,
    isFinishDisabled: false,
}

const disabledPause = {
    isStartDisabled: false,
    isPauseDisabled: true,
}

const disabledFinish = {
    isStartDisabled: false,
    isPauseDisabled: true,
    isFinishDisabled: true,
}

function handleDisabledButtons({btnStart, btnPause, btnFinish} ,{isStartDisabled, isPauseDisabled, isFinishDisabled=false}) {
    btnStart.disabled = isStartDisabled;
    isStartDisabled ? btnStart.classList.add('timer__btn--disabled') : btnStart.classList.remove('timer__btn--disabled');
    btnPause.disabled = isPauseDisabled;
    isPauseDisabled ? btnPause.classList.add('timer__btn--disabled') : btnPause.classList.remove('timer__btn--disabled');
    btnFinish.disabled = isFinishDisabled;
    isFinishDisabled ? btnFinish.classList.add('timer__btn--disabled') : btnFinish.classList.remove('timer__btn--disabled');
}

export { disabledStart, disabledPause, disabledFinish, handleDisabledButtons };

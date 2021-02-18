function getTimeFromSeconds(totalTimeInSeconds) {
    let i;
    for(i = 0; totalTimeInSeconds >= 60; i++) {
        totalTimeInSeconds -= 60;
    }
    const min = i;
    return [min, totalTimeInSeconds];
}

export { getTimeFromSeconds };

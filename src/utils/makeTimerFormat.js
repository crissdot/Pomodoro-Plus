function makeFormat(time) {
    if(time < 10) {
        time = time.toString();
        time = `0${time}`;
    }
    return time;
}

export { makeFormat };

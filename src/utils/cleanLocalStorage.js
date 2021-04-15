function cleanLocalStorage() {
    const colorScheme = window.localStorage.getItem('color--scheme');
    const audio = window.localStorage.getItem('audio');

    localStorage.clear();

    localStorage.setItem('length', 0);
    if(colorScheme) window.localStorage.setItem('color--scheme', colorScheme);
    if(audio) window.localStorage.setItem('audio', audio);
}

export { cleanLocalStorage };

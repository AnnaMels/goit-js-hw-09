const refs = {
    bodyEl: document.querySelector('body'),
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};
let timerId = null;

refs.startBtn.addEventListener('click', () => {
    timerId = setInterval(() => {
        onStartButtonClick();
        refs.startBtn.setAttribute('disabled', 'disabled');
    }, 1000)
});

refs.stopBtn.addEventListener('click', onStopButtonClick);

function onStartButtonClick() {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
};

function onStopButtonClick() {
    clearInterval(timerId);
    refs.startBtn.removeAttribute('disabled');
}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
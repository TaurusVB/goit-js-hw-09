
const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};

const { start: startButton, stop: stopButton } = refs;

startButton.addEventListener('click', onStartClick);

stopButton.addEventListener('click', onStopClick);

let intervalId = null

function onStartClick() {
    document.body.style.backgroundColor = getRandomHexColor();

    startButton.setAttribute('disabled', 'disabled');

    intervalId = setInterval(
      () => (document.body.style.backgroundColor = getRandomHexColor()),
      1000
    );
}

function onStopClick() {
    clearInterval(intervalId);
    startButton.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

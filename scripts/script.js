const canvasElement = document.querySelector('canvas');

const informationScreenElement = document.getElementById('information-screen');

const startScreenElement = document.getElementById('start-screen');
const playingScreenElement = document.getElementById('playing-screen');
const endScreenElement = document.getElementById('game-over-screen');

const nextButton = informationScreenElement.querySelector('.nextButton');
const backButton = startScreenElement.querySelector('.backButton');
const startButton = startScreenElement.querySelector('.playButton');
const pauseButton = playingScreenElement.querySelector('.pauseButton');
const tryAgainButton = endScreenElement.querySelector('.tryAgainButton');

const screenElements = {
  information: informationScreenElement,
  start: startScreenElement,
  play: playingScreenElement,
  end: endScreenElement
};

const game = new Game(canvasElement, screenElements);

nextButton.addEventListener('click', () => {
  game.displayScreen('start');
});

backButton.addEventListener('click', () => {
  game.displayScreen('information');
});

startButton.addEventListener('click', () => {
  game.start();
});

tryAgainButton.addEventListener('click', () => {
  game.start();
});

pauseButton.addEventListener('click', () => {
  if (game.running) {
    game.pause();
  } else {
    game.play();
  }
});

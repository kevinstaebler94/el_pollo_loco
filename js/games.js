let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic = new Audio("audio/mexica_background_music.mp3");

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }

  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }

  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

function startGame() {
  playSound();
  document.getElementById("canvas").classList.remove("dNone");
  document.getElementById("startscreen").classList.add("dNone");
  initLevel();
  init();
}

function openKeyboard() {
  document.getElementById("keyBinding").classList.remove("dNone");
  document.getElementById("startscreen").classList.add("dNone");
}

function playSound() {
  backgroundMusic.play();
  backgroundMusic.volume = 0.25;
  backgroundMusic.loop = true;
}

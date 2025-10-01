let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic = new Audio("audio/mexica_background_music.mp3");

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, backgroundMusic);

  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (
      mouseX >= world.soundButton.x &&
      mouseX <= world.soundButton.x + world.soundButton.width &&
      mouseY >= world.soundButton.y &&
      mouseY <= world.soundButton.y + world.soundButton.height
    ) {
      world.soundButton.toggleSound();
    }
  });

  canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (
      mouseX >= world.soundButton.x &&
      mouseX <= world.soundButton.x + world.soundButton.width &&
      mouseY >= world.soundButton.y &&
      mouseY <= world.soundButton.y + world.soundButton.height
    ) {
      canvas.style.cursor = "pointer";
    } else {
      canvas.style.cursor = "default";
    }
  });
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
  document.getElementById("endScreen").classList.add("dNone");
  document.getElementById("canvas").classList.remove("dNone");
  document.getElementById("startscreen").classList.add("dNone");
  playSound();
  initLevel1();
  init();
}

function openKeyboard() {
  document.getElementById("keyBinding").classList.remove("dNone");
  document.getElementById("startscreen").classList.add("dNone");
}

function playSound() {
  backgroundMusic.play();
  backgroundMusic.volume = 0.075;
  backgroundMusic.loop = true;
}

function resetGame() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;

  keyboard = new Keyboard();
  world = null;

  document.getElementById("startscreen").classList.remove("dNone");
  document.getElementById("canvas").classList.add("dNone");
  document.getElementById("endScreen").classList.add("dNone");
}

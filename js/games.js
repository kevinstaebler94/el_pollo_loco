let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  soundManager = new SoundManager();
  world = new World(canvas, keyboard, soundManager);

  addMouseClick();
  addMouseMove();
}

function addMouseClick() {
  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (isCursorOverSoundButton(mouseX, mouseY)) {
      world.soundButton.toggleSound();
    }
  });
}

function addMouseMove() {
  canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (isCursorOverSoundButton(mouseX, mouseY)) {
      canvas.style.cursor = "pointer";
    } else {
      canvas.style.cursor = "default";
    }
  });
}

function isCursorOverSoundButton(mouseX, mouseY) {
  return (
    mouseX >= world.soundButton.x &&
    mouseX <= world.soundButton.x + world.soundButton.width &&
    mouseY >= world.soundButton.y &&
    mouseY <= world.soundButton.y + world.soundButton.height
  );
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

window.addEventListener("resize", () => {
  resizeCanvas();
});

function resizeCanvas() {
  const aspectRatio = 720 / 480;
  let canvasWidth = window.innerWidth;
  let canvasHeight = window.innerHeight;
}

function startGame() {
  let controlsEndscreen = document.getElementById("controlsEndscreen");
  if (controlsEndscreen) {
    document.getElementById("controlsStartscreen").classList.remove("dNone");
    document.getElementById("controlsEndscreen").classList.add("dNone");
    document.getElementById("endscreen").classList.add("dNone");
    document.getElementById("startscreen").classList.add("dNone");
    document.getElementById("canvas").classList.remove("dNone");

    initLevel1();
    init();
    playSound();
  }
}

function openKeyboard() {
  document.getElementById("keyBinding").classList.remove("dNone");
  document.getElementById("startscreen").classList.add("dNone");
}

function playSound() {
  if (world && world.soundManager) {
    let audio = world.soundManager.play("backgroundMusic", "0.15");
    if (audio) {
      audio.currentTime = 0;
    }
    world.soundManager.play("backgroundMusic", "0.15");
  }
}

function backToHomescreen() {
  if (world && world.soundManager) {
    world.soundManager.stop("backgroundMusic");
  }

  keyboard = new Keyboard();
  world = null;

  document.getElementById("canvas").classList.add("dNone");
  document.getElementById("endscreen").classList.add("dNone");
  document.getElementById("startscreen").classList.remove("dNone");
}

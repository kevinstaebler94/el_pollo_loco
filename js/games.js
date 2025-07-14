let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  console.log("My Character is", world.character);
}

window.addEventListener("keydown", (e) => {
  console.log(e);

  if (e.keyCode == 38) {
    keyboard.UP = true;
    console.log(keyboard.UP);
  }

  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
    console.log(keyboard.RIGHT);
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = true;
    console.log(keyboard.DOWN);
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = true;
    console.log(keyboard.LEFT);
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
    console.log(keyboard.SPACE);
  }
});

window.addEventListener("keyup", (e) => {
  console.log(e);

  if (e.keyCode == 38) {
    keyboard.UP = false;
    console.log(keyboard.UP);
  }

  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
    console.log(keyboard.RIGHT);
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = false;
    console.log(keyboard.DOWN);
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = false;
    console.log(keyboard.LEFT);
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
    console.log(keyboard.SPACE);
  }
});

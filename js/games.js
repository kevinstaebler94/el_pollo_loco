let canvas;
let world;
let keyboard = new Keyboard();
let bottleThrowBlocked = false;
const bottleCooldown = 1000;

/**
 * Initializes the game by setting up the canvas, sound manager, and world instance.
 * Also adds mouse event listeners for click and move interactions.
 */
function init() {
   canvas = document.getElementById("canvas");
   soundManager = new SoundManager();
   world = new World(canvas, keyboard, soundManager);

   setupSoundButton(soundManager);
   addMouseClick();
   addMouseMove();
}

/**
 * Adds a click event listener to the canvas to handle sound button interactions.
 */
function addMouseClick() {
   canvas.addEventListener("click", (event) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const mouseX = (event.clientX - rect.left) * scaleX;
      const mouseY = (event.clientY - rect.top) * scaleY;

      if (isCursorOverSoundButton(mouseX, mouseY)) {
         world.soundButton.toggleSound();
      }
   });
}

function addTouch() {
   canvas.addEventListener("touchstart", (event) => {
      const rect = canvas.getBoundingClientRect();
      const touch = event.touches[0];
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const touchX = (touch.clientX - rect.left) * scaleX;
      const touchY = (touch.clientY - rect.top) * scaleY;

      world.soundButton.toggleSound();
   });
}

/**
 * Adds a mousemove event listener to the canvas to change cursor style when hovering over the sound button.
 */
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

/**
 * Checks if the cursor position is over the sound button.
 * @param {number} mouseX - The x-coordinate of the mouse cursor.
 * @param {number} mouseY - The y-coordinate of the mouse cursor.
 * @returns {boolean} True if cursor is over sound button, false otherwise.
 */
function isCursorOverSoundButton(mouseX, mouseY) {
   const btn = world.soundButton;
   const hit = btn && mouseX >= btn.x && mouseX <= btn.x + btn.width && mouseY >= btn.y && mouseY <= btn.y + btn.height;
   return hit;
}

/**
 * Starts the game by hiding the endscreen and startscreen, initializing the level,
 * playing background music, and showing mobile controls if needed.
 */
function startGame() {
   let controlsEndscreen = document.getElementById("controlsEndscreen");
   if (controlsEndscreen) {
      showCanvasElements();
      initLevel1();
      init();
      playSound();
      initTouchControls();
      document.getElementById("mobileControls").classList.remove("dNone");
      document.getElementById("mobileControls").classList.add("dFlex");
   }
}

function showCanvasElements() {
   document.getElementById("controlsEndscreen").classList.add("dNone");
   document.getElementById("endscreen").classList.add("dNone");
   document.getElementById("startscreen").classList.add("dNone");
   document.getElementById("canvas").classList.remove("dNone");
}

/**
 * Toggles the impressum overlay visibility. If storyline is visible, it closes storyline and opens impressum.
 * Also applies a blur effect to the startscreen when impressum is open.
 */
function toggleImpressum() {
   const impressum = document.getElementById("impressum");
   const storylineElement = document.getElementById("storyline");
   const startscreen = document.getElementById("startscreen");
   if (!impressum) return;
   const storylineIsVisible = storylineElement && !storylineElement.classList.contains("dNone");
   if (storylineIsVisible) {
      storylineElement.classList.add("dNone");
      impressum.classList.remove("dNone");
   } else {
      impressum.classList.toggle("dNone");
   }
   if (startscreen) {
      startscreen.classList.toggle("blurred", !impressum.classList.contains("dNone"));
   }
}

/**
 * Toggles the storyline overlay visibility. If impressum is visible, it closes impressum and opens storyline.
 * Also applies a blur effect to the startscreen when storyline is open.
 */
function toggleGameInfo() {
   const storyline = document.getElementById("storyline");
   const impressumElement = document.getElementById("impressum");
   const startscreen = document.getElementById("startscreen");
   if (!impressum) return;
   const impressumIsVisible = impressumElement && !impressumElement.classList.contains("dNone");
   if (impressumIsVisible) {
      impressumElement.classList.add("dNone");
      storyline.classList.remove("dNone");
   } else {
      storyline.classList.toggle("dNone");
   }
   if (startscreen) {
      startscreen.classList.toggle("blurred", !storyline.classList.contains("dNone"));
   }
}

/**
 * Opens the keyboard binding overlay and hides the startscreen.
 */
function openKeyboard() {
   document.getElementById("keyBinding").classList.remove("dNone");
   document.getElementById("startscreen").classList.add("dNone");
}

/**
 * Plays the background music if the world and sound manager exist and sounds are not muted.
 */
function playSound() {
   if (world && world.soundManager && !world.soundManager.soundsMuted) {
      world.soundManager.play("backgroundMusic", 0.15);
   }
}

/**
 * Returns to the homescreen by stopping background music, resetting the world and keyboard,
 * and hiding the canvas, endscreen, and mobile controls.
 */
function backToHomescreen() {
   if (world && world.soundManager) {
      world.soundManager.stop("backgroundMusic");
   }
   keyboard = new Keyboard();
   world = null;
   document.getElementById("mobileControls").classList.add("dNone");
   document.getElementById("mobileControls").classList.remove("dFlex");
   showHomescreenElements();
   clearAllIntervals();
}

function showHomescreenElements() {
   document.getElementById("canvas").classList.add("dNone");
   document.getElementById("controlsEndscreen").classList.add("dNone");
   document.getElementById("endscreen").classList.add("dNone");
   document.getElementById("startscreen").classList.remove("dNone");
   document.getElementById("controlsStartscreen").classList.remove("dNone");
}

/**
 * Initializes touch controls for mobile devices by adding touchstart and touchend event listeners
 * to control buttons (left, right, jump, throw).
 */
function initTouchControls() {
   const leftBtn = document.querySelector(".mobileControls .arrowLeft");
   const rightBtn = document.querySelector(".mobileControls .arrowRight");
   const jumpBtn = document.querySelector(".mobileControls .spaceButton");
   const throwBtn = document.querySelector(".mobileControls .dButton");

   if (leftBtn) {
      leftBtn.addEventListener("touchstart", (e) => {
         e.preventDefault();
         keyboard.LEFT = true;
      });
      leftBtn.addEventListener("touchend", (e) => {
         e.preventDefault();
         keyboard.LEFT = false;
      });
   }

   if (rightBtn) {
      rightBtn.addEventListener("touchstart", (e) => {
         e.preventDefault();
         keyboard.RIGHT = true;
      });
      rightBtn.addEventListener("touchend", (e) => {
         e.preventDefault();
         keyboard.RIGHT = false;
      });
   }

   if (jumpBtn) {
      jumpBtn.addEventListener("touchstart", (e) => {
         e.preventDefault();
         keyboard.SPACE = true;
      });
      jumpBtn.addEventListener("touchend", (e) => {
         e.preventDefault();
         keyboard.SPACE = false;
      });
   }

   if (throwBtn) {
      throwBtn.addEventListener("touchstart", (e) => {
         e.preventDefault();
         if (world && world.hasBottles()) {
            const now = Date.now();
            if (now - lastBottleThrow > bottleCooldown) {
               world.statusBarBottle.setPercentage(world.statusBarBottle.percentage - 20);
               world.character.otherDirection = false;
               world.character.lastMove = now;
               let bottle = new ThrowableObject(world.character.x + world.character.width, world.character.y + world.character.height / 2, world.soundManager);
               world.throwableObjects.push(bottle);
               lastBottleThrow = now;
            }
         }
      });
   }
}

function clearAllIntervals() {
   for (let i = 0; i < 9999; i++) {
      clearInterval(i);
   }
}

function setupSoundButton(soundManager) {
   const soundButton = document.getElementById("soundButton");
   const soundIcon = document.getElementById("soundIcon");

   soundIcon.src = soundManager.soundsMuted ? "img/buttons/mute_button.svg" : "img/buttons/unmute_button.svg";

   soundButton.addEventListener("click", () => {
      soundManager.toggleAllSounds();
      soundIcon.src = soundManager.soundsMuted ? "img/buttons/mute_button.svg" : "img/buttons/unmute_button.svg";
   });
}

// Event Listeners

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
});

window.addEventListener("resize", () => {
   const mobileControls = document.getElementById("mobileControls");
   if (!mobileControls) return;

   if (window.innerWidth <= 1024 && world) {
      mobileControls.classList.remove("dNone");
   } else if (window.innerWidth > 1024) {
      mobileControls.classList.add("dNone");
   }
});

window.addEventListener("orientationchange", () => {
   setTimeout(() => {
      const mobileControls = document.getElementById("mobileControls");
      if (mobileControls && window.innerWidth <= 1024 && world) {
         mobileControls.classList.remove("dNone");
      }
   }, 100);
});

window.addEventListener("load", () => {
   setTimeout(() => {
      window.scrollTo(0, 1);
   }, 100);
});

window.addEventListener("keydown", (e) => {
   if (e.code === "KeyD" && world && world.hasBottles() && !bottleThrowBlocked) {
      bottleThrowBlocked = true;
      const now = Date.now();
      world.statusBarBottle.setPercentage(world.statusBarBottle.percentage - 20);
      world.character.otherDirection = false;
      world.character.lastMove = now;
      let bottle = new ThrowableObject(world.character.x + world.character.width, world.character.y + world.character.height / 2, world.soundManager);
      world.throwableObjects.push(bottle);
      setTimeout(() => {
         bottleThrowBlocked = false;
      }, bottleCooldown);
   }
});

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

function startGame() {
   let controlsEndscreen = document.getElementById("controlsEndscreen");
   if (controlsEndscreen) {
      document.getElementById("endscreen").classList.add("dNone");
      document.getElementById("startscreen").classList.add("dNone");
      document.getElementById("canvas").classList.remove("dNone");

      initLevel1();
      init();
      playSound();

      showMobileControlsIfNeeded();
      initTouchControls();
   }
}

function toggleImpressum() {
   const impressum = document.getElementById("impressum");
   if (!impressum) return;
   impressum.classList.toggle("dNone");
}

function toggleGameInfo() {
   const storyline = document.getElementById("storyline");
   if (!storyline) return;
   storyline.classList.toggle("dNone");
}

function showMobileControlsIfNeeded() {
   const mobileControls = document.getElementById("mobileControls");
   if (mobileControls && window.innerWidth <= 1024) {
      mobileControls.classList.remove("dNone");
   }
}

function openKeyboard() {
   document.getElementById("keyBinding").classList.remove("dNone");
   document.getElementById("startscreen").classList.add("dNone");
}

function playSound() {
   if (world && world.soundManager && !world.soundManager.soundsMuted) {
      world.soundManager.play("backgroundMusic", 0.15);
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

   const mobileControls = document.getElementById("mobileControls");
   if (mobileControls) {
      mobileControls.classList.add("dNone");
   }
}

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
         keyboard.D = true;
      });
      throwBtn.addEventListener("touchend", (e) => {
         e.preventDefault();
         keyboard.D = false;
      });
   }
}

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

/**
 * Represents a throwable bottle object that can be thrown by the character.
 * @extends MoveableObject
 */
class ThrowableObject extends MoveableObject {
   speedY = 15;
   speedX = 10;
   isThrowable = true;
   throwIntervall = null;
   moveIntervall = null;
   splashIntervall = null;
   animationIntervall = null;
   hasSplashed = false;
   throwingImageIndex = 0;

   IMAGES_THROWING = [
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
      "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
      "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
      "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
   ];

   IMAGES_SPLASH = [
      "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
      "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
      "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
      "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
      "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
      "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
   ];

   /**
    * Creates a throwable bottle at the specified position.
    * @param {number} x - Horizontal starting position of the bottle.
    * @param {number} y - Vertical starting position of the bottle.
    * @param {SoundManager} soundManager - The sound manager instance for playing audio.
    */
   constructor(x, y, soundManager, intervalManager) {
      super();
      this.soundManager = soundManager;
      this.intervalManager = intervalManager;
      this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
      this.loadImages(this.IMAGES_THROWING);
      this.loadImages(this.IMAGES_SPLASH);
      this.x = x;
      this.y = y - 50;
      this.height = 60;
      this.width = 50;
      this.throw();
   }

   /**
    * Initiates the throwing animation and physics.
    * Sets up animation loop and starts the bottle's movement.
    */
   throw() {
      if (this.throwIntervall) clearInterval(this.throwIntervall);
      if (this.animationIntervall) clearInterval(this.animationIntervall);
      this.setThrowPhysics();

      this.throwIntervall = setInterval(() => {
         this.checkBottleCollisionWithGround();
      }, 1000 / 60);

      this.animationIntervall = setInterval(() => {
         if (!this.hasSplashed) {
            this.playThrowingAnimation();
         }
      }, 80);

      this.startMoveLoop();
   }

   /**
    * Spielt die Wurf-Animation mit eigenem Index ab.
    */
   playThrowingAnimation() {
      let i = this.throwingImageIndex % this.IMAGES_THROWING.length;
      this.img = this.imageCache[this.IMAGES_THROWING[i]];
      this.throwingImageIndex++;
   }

   /**
    * Sets the physics properties for the bottle throw.
    * Applies initial velocity and gravity to simulate realistic throwing motion.
    */
   setThrowPhysics() {
      this.percentage -= 20;
      this.speedY = 12;
      this.speedX = 12;
      this.applyGravitiy();
   }

   /**
    * Starts the horizontal movement loop for the bottle.
    * Moves the bottle continuously to the right.
    */
   startMoveLoop() {
      if (this.moveIntervall) clearInterval(this.moveIntervall);
      this.moveIntervall = setInterval(() => {
         this.x += this.speedX;
      }, 1000 / 60);
   }

   /**
    * Plays the breaking bottle sound effect when the bottle shatters.
    */
   playBreakingBottleSound() {
      this.soundManager.play("breakingBottleSound", 0.2, false);
   }

   /**
    * Startet die Splash-Animation und spielt den Sound ab.
    */
   startSplashAnimation() {
      if (this.hasSplashed) return;
      this.hasSplashed = true;
      this.stopBottleMovement();
      this.playBreakingBottleSound();
      this.playSplashAnimationLoop();
   }

   /**
    * Stoppt alle Bewegungen der Flasche.
    */
   stopBottleMovement() {
      this.speedX = 0;
      this.speedY = 0;
      clearInterval(this.moveIntervall);
      clearInterval(this.throwIntervall);
      clearInterval(this.animationIntervall);
      clearInterval(this.gravityInterval);
   }

   /**
    * Spielt die Splash-Animation in einer Schleife ab.
    */
   playSplashAnimationLoop() {
      let splashIndex = 0;
      this.splashIntervall = setInterval(() => {
         if (splashIndex < this.IMAGES_SPLASH.length) {
            this.img = this.imageCache[this.IMAGES_SPLASH[splashIndex]];
            splashIndex++;
         } else {
            clearInterval(this.splashIntervall);
            this.markedForRemoval = true;
         }
      }, 100);
   }

   /**
    * Prüft, ob die Flasche den Boden berührt hat.
    */
   checkBottleCollisionWithGround() {
      if (this.y >= 370 && !this.hasSplashed) {
         this.y = 370;
         this.startSplashAnimation();
      }
   }
}

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
   constructor(x, y, soundManager) {
      super();
      this.soundManager = soundManager;
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
      this.setThrowPhysics();
      this.throwIntervall = setInterval(() => {
         this.playAnimation(this.IMAGES_THROWING);
         this.checkBottleCollisionWithGround();
      }, 1000 / 60);

      this.startMoveLoop();
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
      this.playBreakingBottleSound();
      this.playAnimation(this.IMAGES_SPLASH);
   }

   checkBottleCollisionWithGround() {
      if (this.y == 355) {
         this.playAnimation(this.IMAGES_SPLASH);
      }
   }
}

/**
 * Represents the main playable character in the game.
 * @extends MoveableObject
 */
class Character extends MoveableObject {
   height = 300;
   width = 150;
   y = 140;
   x = 20;
   speed = 10;
   coins = 0;
   lastMove = Date.now();
   lastHit = 0;
   groundY = 140;
   offset = {
      top: 130,
      right: 50,
      bottom: 15,
      left: 35,
   };

   IMAGES_WALKING = [
      "img/2_character_pepe/2_walk/W-21.png",
      "img/2_character_pepe/2_walk/W-22.png",
      "img/2_character_pepe/2_walk/W-23.png",
      "img/2_character_pepe/2_walk/W-24.png",
      "img/2_character_pepe/2_walk/W-25.png",
      "img/2_character_pepe/2_walk/W-26.png",
   ];
   IMAGES_JUMPING = [
      "img/2_character_pepe/3_jump/J-31.png",
      "img/2_character_pepe/3_jump/J-32.png",
      "img/2_character_pepe/3_jump/J-33.png",
      "img/2_character_pepe/3_jump/J-34.png",
      "img/2_character_pepe/3_jump/J-35.png",
      "img/2_character_pepe/3_jump/J-36.png",
      "img/2_character_pepe/3_jump/J-37.png",
      "img/2_character_pepe/3_jump/J-38.png",
      "img/2_character_pepe/3_jump/J-39.png",
   ];
   IMAGES_DEAD = [
      "img/2_character_pepe/5_dead/D-51.png",
      "img/2_character_pepe/5_dead/D-52.png",
      "img/2_character_pepe/5_dead/D-53.png",
      "img/2_character_pepe/5_dead/D-54.png",
      "img/2_character_pepe/5_dead/D-55.png",
      "img/2_character_pepe/5_dead/D-56.png",
      "img/2_character_pepe/5_dead/D-57.png",
   ];
   IMAGES_HURT = ["img/2_character_pepe/4_hurt/H-41.png", "img/2_character_pepe/4_hurt/H-42.png", "img/2_character_pepe/4_hurt/H-43.png"];
   IMAGES_IDLE = [
      "img/2_character_pepe/1_idle/idle/I-1.png",
      "img/2_character_pepe/1_idle/idle/I-2.png",
      "img/2_character_pepe/1_idle/idle/I-3.png",
      "img/2_character_pepe/1_idle/idle/I-4.png",
      "img/2_character_pepe/1_idle/idle/I-5.png",
      "img/2_character_pepe/1_idle/idle/I-6.png",
      "img/2_character_pepe/1_idle/idle/I-7.png",
      "img/2_character_pepe/1_idle/idle/I-8.png",
      "img/2_character_pepe/1_idle/idle/I-9.png",
      "img/2_character_pepe/1_idle/idle/I-10.png",
   ];
   IMAGES_LONG_IDLE = [
      "img/2_character_pepe/1_idle/long_idle/I-11.png",
      "img/2_character_pepe/1_idle/long_idle/I-12.png",
      "img/2_character_pepe/1_idle/long_idle/I-13.png",
      "img/2_character_pepe/1_idle/long_idle/I-14.png",
      "img/2_character_pepe/1_idle/long_idle/I-15.png",
      "img/2_character_pepe/1_idle/long_idle/I-16.png",
      "img/2_character_pepe/1_idle/long_idle/I-17.png",
      "img/2_character_pepe/1_idle/long_idle/I-18.png",
      "img/2_character_pepe/1_idle/long_idle/I-19.png",
      "img/2_character_pepe/1_idle/long_idle/I-20.png",
   ];
   world;

   /**
    * Creates the character and initializes animations, gravity, and sound manager.
    * @param {SoundManager} soundManager - The sound manager instance for playing audio.
    */
   constructor(soundManager) {
      super();
      this.loadImage("img/2_character_pepe/2_walk/W-21.png");
      this.soundManager = soundManager;
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_JUMPING);
      this.loadImages(this.IMAGES_DEAD);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_IDLE);
      this.loadImages(this.IMAGES_LONG_IDLE);
      this.applyGravitiy();
      this.animate();
   }

   /**
    * Starts the character's animation loops for movement and visual updates.
    * Handles keyboard input, jumping, camera positioning, and animation states.
    */
   animate() {
      setInterval(() => {
         this.handleCharacterMovement();
         if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.lastMove = Date.now();
         }
         this.world.camera_x = -this.x + 50;
      }, 1000 / 60);

      setInterval(() => {
         this.updateCharacterAnimation();
      }, 100);
   }

   /**
    * Handles character movement based on keyboard input.
    * Updates character position and direction when moving left or right.
    */
   handleCharacterMovement() {
      let isMoving = false;
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
         this.moveRight();
         this.otherDirection = false;
         this.lastMove = Date.now();
         isMoving = true;
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
         this.moveLeft();
         this.otherDirection = true;
         this.lastMove = Date.now();
         isMoving = true;
      }
   }

   /**
    * Updates the character's animation based on current state (dead, hurt, jumping, walking, idle).
    * Prioritizes animations in order: dead > hurt > jumping > walking > idle.
    */
   updateCharacterAnimation() {
      if (this.isDead()) {
         this.handleDead();
         return;
      }
      if (this.isHurt()) {
         this.handleHurt();
         return;
      }
      if (this.isAboveGround()) {
         this.handleAboveGround();
         return;
      }
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
         this.handleWalking();
         return;
      }
      this.handleIdle();
   }

   /**
    * Handles the dead animation state.
    */
   handleDead() {
      this.playAnimation(this.IMAGES_DEAD);
   }

   /**
    * Handles the hurt animation state.
    */
   handleHurt() {
      this.playAnimation(this.IMAGES_HURT);
   }

   /**
    * Handles the jumping animation state.
    */
   handleAboveGround() {
      this.playAnimation(this.IMAGES_JUMPING);
   }

   /**
    * Handles the walking animation state.
    */
   handleWalking() {
      this.playAnimation(this.IMAGES_WALKING);
   }

   /**
    * Handles idle animations. Plays long idle animation after 5 seconds of inactivity.
    * Shows first idle frame briefly after an action to prevent animation loop restart.
    */
   handleIdle() {
      const timeSinceLastMove = Date.now() - this.lastMove;
      if (timeSinceLastMove > 5000) {
         this.playAnimation(this.IMAGES_LONG_IDLE);
      } else if (timeSinceLastMove > 300) {
         this.playAnimation(this.IMAGES_IDLE);
      } else {
         this.img = this.imageCache[this.IMAGES_IDLE[0]];
      }
   }

   /**
    * Makes the character jump by setting upward velocity.
    */
   jump() {
      this.speedY = 25;
      if (this.soundManager.jumpingSound) {
         this.soundManager.jumpingSound.currentTime = 0;
         this.soundManager.play("jumpingSound", 0.5);
      }
      if (this.y > this.groundY) {
         this.y = this.groundY;
         this.speedY = 0;
      }
   }

   /**
    * Plays the character's screaming sound (ouch) when hurt.
    * Does not play if game is over or won.
    */
   startsScreaming() {
      let sound;
      if (this.world && (this.world.gameOverPlayed || this.world.gameWinPlayed)) return;
      sound = this.soundManager.play("ouchSound", 0.5);
   }
}

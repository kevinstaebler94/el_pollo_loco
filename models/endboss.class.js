/**
 * Represents the final boss enemy in the game.
 * @extends MoveableObject
 */
class Endboss extends MoveableObject {
   height = 500;
   width = 300;
   y = -40;
   energy = 10;
   isActive = false;
   currentStatus = "resting";
   speed = 1.75;
   hadFirstContact = false;
   gotHit = false;
   soundManager;
   offset = {
      top: 70,
      right: 15,
      bottom: 20,
      left: 20,
   };

   IMAGES_WALKING = [
      "img/4_enemie_boss_chicken/1_walk/G1.png",
      "img/4_enemie_boss_chicken/1_walk/G2.png",
      "img/4_enemie_boss_chicken/1_walk/G3.png",
      "img/4_enemie_boss_chicken/1_walk/G4.png",
   ];
   IMAGES_ALERT = [
      "img/4_enemie_boss_chicken/2_alert/G5.png",
      "img/4_enemie_boss_chicken/2_alert/G6.png",
      "img/4_enemie_boss_chicken/2_alert/G7.png",
      "img/4_enemie_boss_chicken/2_alert/G8.png",
      "img/4_enemie_boss_chicken/2_alert/G9.png",
      "img/4_enemie_boss_chicken/2_alert/G10.png",
      "img/4_enemie_boss_chicken/2_alert/G11.png",
      "img/4_enemie_boss_chicken/2_alert/G12.png",
   ];
   IMAGES_ATTACK = [
      "img/4_enemie_boss_chicken/3_attack/G13.png",
      "img/4_enemie_boss_chicken/3_attack/G14.png",
      "img/4_enemie_boss_chicken/3_attack/G15.png",
      "img/4_enemie_boss_chicken/3_attack/G16.png",
      "img/4_enemie_boss_chicken/3_attack/G17.png",
      "img/4_enemie_boss_chicken/3_attack/G18.png",
      "img/4_enemie_boss_chicken/3_attack/G19.png",
      "img/4_enemie_boss_chicken/3_attack/G20.png",
   ];
   IMAGES_HURT = ["img/4_enemie_boss_chicken/4_hurt/G21.png", "img/4_enemie_boss_chicken/4_hurt/G22.png", "img/4_enemie_boss_chicken/4_hurt/G23.png"];
   IMAGES_DEAD = ["img/4_enemie_boss_chicken/5_dead/G24.png", "img/4_enemie_boss_chicken/5_dead/G25.png", "img/4_enemie_boss_chicken/5_dead/G26.png"];

   /**
    * Creates the endboss at the end of the level.
    * Preloads all animation images and starts the animation cycle.
    */
   constructor() {
      super().loadImage(this.IMAGES_WALKING[0]);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_ALERT);
      this.loadImages(this.IMAGES_ATTACK);
      this.loadImages(this.IMAGES_DEAD);
      this.x = 9500;
      this.animate();
   }

   /**
    * Starts the endboss's animation loops for movement and visual updates.
    * Handles left movement during walking/attack states and updates animations based on current status.
    */
   animate() {
      setInterval(() => {
         if (this.isActive && (this.currentStatus === "walking" || this.currentStatus === "attack")) {
            this.moveLeft();
         }
      }, 1000 / 60);

      setInterval(() => this.updateAnimation(), 200);
   }

   /**
    * Updates the endboss's animation based on current status.
    * Uses an animation map to select appropriate image sequence for each state.
    */
   updateAnimation() {
      const animations = {
         alert: this.IMAGES_ALERT,
         attack: this.IMAGES_ATTACK,
         hurt: this.IMAGES_HURT,
         dead: this.IMAGES_DEAD,
      };
      this.playAnimation(animations[this.currentStatus] || this.IMAGES_WALKING);
   }

   /**
    * Activates the endboss when the character first encounters it.
    * Plays endboss music and changes status to walking.
    */
   endbossAppears() {
      if (!this.hadFirstContact && this.soundManager) {
         this.currentStatus = "walking";
         this.isActive = true;
         this.hadFirstContact = true;
         this.soundManager.play("endbossMusic", 0.5, true);
      }
   }

   /**
    * Triggers when the endboss spots the character.
    * Changes status to alert mode if not already dead.
    */
   spottedCharacter() {
      if (this.currentStatus === "dead") return;
      this.currentStatus = "alert";
      this.isActive = true;
   }

   /**
    * Initiates the endboss's attack mode.
    * Increases movement speed and changes status to attack if not dead.
    */
   startRunning() {
      if (this.currentStatus === "dead") return;
      this.currentStatus = "attack";
      this.speed += 0.05;
   }

   /**
    * Handles damage taken by the endboss.
    * Shows hurt animation on first hit, returns to attack on subsequent hits.
    * Does nothing if already dead.
    */
   takesDamage() {
      if (this.currentStatus === "dead") return;
      if (!this.gotHit) {
         this.currentStatus = "hurt";
         this.gotHit = true;
      } else {
         this.currentStatus = "attack";
         setTimeout(() => {
            this.gotHit = false;
         }, 200);
      }
   }

   /**
    * Handles the endboss's death.
    * Changes status to dead and deactivates the endboss.
    */
   endbossIsDead() {
      this.currentStatus = "dead";
      this.isActive = false;
   }

   /**
    * Plays the endboss's screaming sound effect.
    */
   startsScreaming() {
      if (this.soundManager) {
         this.soundManager.play("endbossScreamingSound", 0.6, false);
      }
   }
}

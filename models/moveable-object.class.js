/**
 * Represents a moveable game object with physics and collision detection.
 * @extends DrawableObject
 */
class MoveableObject extends DrawableObject {
   speed = 0.15;
   otherDirection = false;
   speedY = 0;
   acceleration = 2.5;
   energy = 100;
   lastHit = 0;
   onGroundY = 140;

   /**
    * Applies gravity to the object, making it fall and handling ground collision.
    * Updates vertical position and velocity continuously.
    */
   applyGravitiy() {
      if (this.gravityInterval) clearInterval(this.gravityInterval);
      this.gravityInterval = setInterval(() => {
         if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
         }
      }, 1000 / 35);
   }

   /**
    * Checks if the object is above ground level.
    * @returns {boolean} True if object is above ground, false otherwise.
    */
   isAboveGround() {
      if (this instanceof ThrowableObject) {
         return true;
      } else {
         return this.y < 140;
      }
   }

   /**
    * Checks if this object is colliding with another moveable object.
    * @param {MoveableObject} mo - The other moveable object to check collision with.
    * @returns {boolean} True if objects are colliding, false otherwise.
    */
   isColliding(mo) {
      return this.x < mo.x + mo.width && this.x + this.width > mo.x && this.y < mo.y + mo.height && this.y + this.height > mo.y;
   }

   /**
    * Checks if this object is stomping on another object from above.
    * @param {MoveableObject} mo - The object to check if being stomped.
    * @returns {boolean} True if this object is stomping the target, false otherwise.
    */
   isStomping(mo) {
      let fromAbove = this.y + this.height >= mo.y + 5 && this.y + this.height <= mo.y + mo.height * 0.8;
      let isColliding = this.isColliding(mo);
      let fallingDown = this.speedY <= 0;
      return fromAbove && isColliding && fallingDown;
   }

   /**
    * Reduces the object's energy by the specified damage amount.
    * @param {number} damage - Amount of damage to apply.
    */
   hit(damage) {
      this.energy -= damage;
      if (this.energy <= 0) {
         this.energy = 0;
      } else {
         this.lastHit = new Date().getTime();
      }
   }

   /**
    * Checks if the object was recently hurt (within last 500ms).
    * @returns {boolean} True if object is in hurt state, false otherwise.
    */
   isHurt() {
      let timepassed = new Date().getTime() - this.lastHit;
      timepassed / 500;
      return timepassed < 500;
   }

   /**
    * Checks if the object's energy has reached zero (dead state).
    * @returns {boolean} True if object is dead, false otherwise.
    */
   isDead() {
      return this.energy <= 0;
   }

   /**
    * Plays an animation by cycling through an array of image paths.
    * @param {string[]} images - Array of image paths for the animation frames.
    */
   playAnimation(images) {
      this.currentImage = this.currentImage || 0;
      let i = this.currentImage % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
   }

   /**
    * Moves the object to the right by its speed value.
    */
   moveRight() {
      this.x += this.speed;
   }

   /**
    * Moves the object to the left by its speed value.
    */
   moveLeft() {
      this.x -= this.speed;
   }
}

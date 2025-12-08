/**
 * Represents a normal chicken enemy in the game.
 * @extends MoveableObject
 */
class Chicken extends MoveableObject {
   height = 80;
   width = 80;
   y = 355;
   energy = 1;
   IMAGES_WALKING = [
      "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
      "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
      "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
   ];
   IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];
   offset = {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
   };

   /**
    * Creates a chicken enemy at a random horizontal position with random speed.
    * The chicken starts walking and animating automatically.
    */
   constructor() {
      super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_DEAD);
      this.x = 500 + Math.random() * 7000;
      this.speed = 0.25 + Math.random() * 1.75;
      this.animate();
   }

   /**
    * Starts the chicken's animation loops for movement and visual updates.
    * Handles continuous left movement and switches between walking and dead animations based on energy.
    */
   animate() {
      setInterval(() => {
         this.moveLeft();
      }, 1000 / 60);

      setInterval(() => {
         if (this.energy >= 1) {
            this.playAnimation(this.IMAGES_WALKING);
         } else {
            this.playAnimation(this.IMAGES_DEAD);
            this.speed = 0;
         }
      }, 200);
   }
}

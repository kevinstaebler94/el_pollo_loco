/**
 * Represents a small chicken enemy in the game.
 * @extends MoveableObject
 */
class SmallChicken extends MoveableObject {
   height = 50;
   width = 50;
   y = 375;
   energy = 1;
   IMAGES_WALKING = [
      "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
   ];

   IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

   offset = {
      top: 5,
      right: 3,
      bottom: 5,
      left: 0,
   };

   /**
    * Creates a small chicken enemy at a random horizontal position with random speed.
    * The small chicken starts walking and animating automatically.
    */
   constructor() {
      super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_DEAD);
      this.x = 500 + Math.random() * 7000;
      this.speed = 1.5 + Math.random() * 5;
      this.animate();
   }

   /**
    * Starts the small chicken's animation loops for movement and visual updates.
    * Handles continuous left movement and switches between walking and dead animations based on energy.
    */
   animate() {
      setInterval(() => {
         this.moveLeft();
      }, 1000 / 60);

      setInterval(() => {
         if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.speed = 0;
         } else {
            this.playAnimation(this.IMAGES_WALKING);
         }
      }, 200);
   }
}

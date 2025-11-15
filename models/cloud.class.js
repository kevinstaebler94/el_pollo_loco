/**
 * Represents a moving cloud in the game's background.
 * @extends MoveableObject
 */
class Cloud extends MoveableObject {
   y = 15;
   height = 250;
   width = 1000;

   /**
    * Creates a cloud at a random horizontal position.
    * The cloud automatically starts moving left across the screen.
    */
   constructor() {
      super().loadImage("img/5_background/layers/4_clouds/full.png");
      this.x = Math.random() * 500;
      this.animate();
   }

   /**
    * Starts the cloud's continuous left movement animation.
    */
   animate() {
      this.moveLeft();
   }
}

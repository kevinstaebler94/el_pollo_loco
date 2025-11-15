/**
 * Represents a background layer object in the game.
 * @extends MoveableObject
 */
class BackgroundObject extends MoveableObject {
   width = 720;
   height = 480;

   /**
    * Creates a background object with specified image and position.
    * @param {string} imagePath - Path to the background image file.
    * @param {number} x - Horizontal position of the background object.
    */
   constructor(imagePath, x) {
      super().loadImage(imagePath);
      this.x = x;
      this.y = 480 - this.height;
   }
}

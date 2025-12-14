/**
 * Represents a drawable object in the game that can be rendered on canvas.
 * Base class for all visual game objects.
 */
class DrawableObject {
   img;
   imageCache = {};
   currentImage = 0;
   x = 120;
   y = 285;
   height = 150;
   width = 100;

   /**
    * Loads a single image from the specified path.
    * @param {string} path - Path to the image file.
    */
   loadImage(path) {
      this.img = new Image();
      this.img.src = path;
   }

   /**
    * Draws the object's image on the canvas context.
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
    */
   draw(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
   }

   /**
    * Loads multiple images into the image cache for animations.
    * @param {string[]} arr - Array of image file paths to preload.
    */
   loadImages(arr) {
      arr.forEach((path) => {
         let img = new Image();
         img.src = path;
         this.imageCache[path] = img;
      });
   }
}

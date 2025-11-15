/**
 * Represents the bottle collection status bar in the game UI.
 * Displays the number of collected bottles available for throwing.
 * @extends DrawableObject
 */
class StatusBar_Bottle extends DrawableObject {
   statusBarBottle = [
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
   ];
   percentage;

   /**
    * Creates a bottle status bar and initializes it at 0%.
    * Positions the bar in the top-left area of the screen.
    */
   constructor() {
      super();
      this.loadImages(this.statusBarBottle);
      this.x = 25;
      this.y = 100;
      this.width = 200;
      this.height = 50;
      this.setPercentage(0);
   }

   /**
    * Updates the status bar to display the current bottle percentage.
    * @param {number} percentage - The bottle collection percentage (0-100).
    */
   setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.statusBarBottle[this.resolveImageIndex()];
      this.img = this.imageCache[path];
   }

   /**
    * Determines which status bar image to display based on current percentage.
    * @returns {number} Index of the image (0-5) corresponding to the percentage range.
    */
   resolveImageIndex() {
      if (this.percentage >= 100) {
         return 5;
      } else if (this.percentage >= 80) {
         return 4;
      } else if (this.percentage >= 60) {
         return 3;
      } else if (this.percentage >= 40) {
         return 2;
      } else if (this.percentage >= 20) {
         return 1;
      } else {
         return 0;
      }
   }
}

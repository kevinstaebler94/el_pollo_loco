/**
 * Represents the endboss health status bar in the game UI.
 * Displays the endboss's remaining health as a percentage.
 * @extends DrawableObject
 */
class StatusBar_Endboss extends DrawableObject {
   statusBarEndboss = [
      "img/7_statusbars/2_statusbar_endboss/green/green0.png",
      "img/7_statusbars/2_statusbar_endboss/green/green20.png",
      "img/7_statusbars/2_statusbar_endboss/green/green40.png",
      "img/7_statusbars/2_statusbar_endboss/green/green60.png",
      "img/7_statusbars/2_statusbar_endboss/green/green80.png",
      "img/7_statusbars/2_statusbar_endboss/green/green100.png",
   ];
   percentage;

   /**
    * Creates an endboss status bar and initializes it at 100%.
    * Positions the bar in the top-center area of the screen.
    */
   constructor() {
      super().loadImages(this.statusBarEndboss);
      this.x = 425;
      this.y = 10;
      this.width = 200;
      this.height = 50;
      this.setPercentage(100);
   }

   /**
    * Updates the status bar to display the endboss's current health percentage.
    * @param {number} percentage - The endboss's health percentage (0-100).
    */
   setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.statusBarEndboss[this.resolveImageIndex()];
      this.img = this.imageCache[path];
   }

   /**
    * Determines which status bar image to display based on current percentage.
    * @returns {number} Index of the image (0-5) corresponding to the percentage range.
    */
   resolveImageIndex() {
      if (this.percentage == 100) {
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

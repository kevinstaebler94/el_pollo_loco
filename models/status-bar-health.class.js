/**
 * Represents the player's health status bar in the game UI.
 * Displays the character's remaining health as a percentage.
 * @extends DrawableObject
 */
class StatusBar_Health extends DrawableObject {
   statusBarHealth = [
      "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
   ];
   percentage;

   /**
    * Creates a health status bar and initializes it at 100%.
    * Positions the bar in the top-left corner of the screen.
    */
   constructor() {
      super();
      this.loadImages(this.statusBarHealth);
      this.x = 25;
      this.y = 0;
      this.width = 200;
      this.height = 50;
      this.setPercentage(100);
   }

   /**
    * Updates the status bar to display the current health percentage.
    * @param {number} percentage - The character's health percentage (0-100).
    */
   setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.statusBarHealth[this.resolveImageIndex()];
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

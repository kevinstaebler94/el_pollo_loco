/**
 * Represents the coin collection status bar in the game UI.
 * Displays the number of collected coins as a percentage.
 * @extends DrawableObject
 */
class StatusBar_Coin extends DrawableObject {
   statusBarCoin = [
      "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
   ];
   percentage;

   /**
    * Creates a coin status bar and initializes it at 0%.
    * Positions the bar in the top-left area of the screen below the health bar.
    */
   constructor() {
      super();
      this.loadImages(this.statusBarCoin);
      this.x = 25;
      this.y = 50;
      this.width = 200;
      this.height = 50;
      this.setPercentage(0);
   }

   /**
    * Updates the status bar to display the current coin percentage.
    * @param {number} percentage - The coin collection percentage (0-100).
    */
   setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.statusBarCoin[this.resolveImageIndex()];
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

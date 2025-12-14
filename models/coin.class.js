/**
 * Represents a collectible coin object in the game.
 * @extends MoveableObject
 */
class Coin extends MoveableObject {
   height = 100;
   width = 100;
   y = 320;
   x = 500;
   minY = 320;
   maxY = 100;
   COIN_ANIMATION = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];
   offset = {
      top: 35,
      right: 35,
      bottom: 34,
      left: 33,
   };

   /**
    * Creates a coin at a random horizontal and vertical position.
    * The coin automatically starts its spinning animation.
    */
   constructor(intervalManager, soundManager) {
      super().loadImage("img/8_coin/coin_1.png");
      this.intervalManager = intervalManager;
      this.soundManager = soundManager;
      this.loadImages(this.COIN_ANIMATION);
      this.intervalManager.createInterval(() => {
         this.playAnimation(this.COIN_ANIMATION);
      }, 3500 / 5);
      this.x = this.x + Math.random() * 8000;
      this.y = this.minY + Math.random() * (this.maxY - this.minY);
   }
}

class Coin extends MoveableObject {
  height = 150;
  width = 150;
  y = 320;
  x = 500;
  COIN_ANIMATION = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.COIN_ANIMATION);
    setInterval(() => {
      this.playAnimation(this.COIN_ANIMATION);
    }, 3500 / 5);
    this.x = this.x * Math.random() * 5;
  }
}

class SalsaBottle extends MoveableObject {
  height = 60;
  width = 60;
  y = 370;

  constructor() {
    super().loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");

    this.x = 500 + Math.random() * 500;
  }
}

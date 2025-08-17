class Bottle extends MoveableObject {
  height = 60;
  width = 60;
  y = 370;
  x = 500;
  isThrowable = false;

  constructor() {
    super().loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
    this.x = this.x * Math.random() * 5;
  }
}

class Chicken extends MoveableObject {
  height = 80;
  width = 80;
  y = 355;

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");

    this.x = 300 + Math.random() * 500;
  }
}

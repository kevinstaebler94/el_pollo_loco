class Cloud extends MoveableObject {
  y = 15;
  height = 250;
  width = 1000;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/full.png");
    this.x = Math.random() * 500;
  }
}

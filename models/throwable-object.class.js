class ThrowableObject extends MoveableObject {
  speedY = 30;
  speedX = 20;

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.speedX = 20;
    this.applyGravitiy();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }
}

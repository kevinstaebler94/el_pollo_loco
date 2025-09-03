class ThrowableObject extends MoveableObject {
  speedY = 30;
  speedX = 20;
  isThrowable = true;

  IMAGES_THROWING = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_THROWING);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throw();
  }

  throw() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_THROWING);
    }, 75);
    this.percentage - 20;
    this.speedY = 25;
    this.speedX = 15;
    this.applyGravitiy();

    setInterval(() => {
      this.x += 10;
    }, 25);
  }
}

class ThrowableObject extends MoveableObject {
  speedY = 30;
  speedX = 20;
  isThrowable = true;

  throwInterval = null;
  moveInterval = null;
  splashInterval = null;

  IMAGES_THROWING = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_THROWING);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throw();
  }

  throw() {
    if (this.throwInterval) clearInterval(this.throwInterval);
    if (this.Interval) clearInterval(this.throwInterval);
    this.throwInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_THROWING);
      this.playAnimation(this.IMAGES_SPLASH);
    }, 75);
    this.percentage - 20;
    this.speedY = 25;
    this.speedX = 15;
    this.applyGravitiy();

    setInterval(() => {
      this.x += 10;
    }, 25);
  }

  bottleSplash() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
    }, 200);
  }
}

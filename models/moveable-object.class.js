class MoveableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  onGroundY = 140;
  screamingSound = new Audio("audio/chicken_sound.wav");

  applyGravitiy() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
      if (this instanceof Character && this.y > this.onGroundY) {
        this.y = this.onGroundY;
        this.speedY = 0;
      }
    }, 1000 / 35);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 140;
    }
  }

  isColliding(mo) {
    return (
      this.x < mo.x + mo.width && this.x + this.width > mo.x && this.y < mo.y + mo.height && this.y + this.height > mo.y
    );
  }

  isStomping(mo) {
    let fromAbove = this.y + this.height >= mo.y + 5 && this.y + this.height <= mo.y + mo.height * 0.8;
    let isColliding = this.isColliding(mo);
    let fallingDown = this.speedY <= 0;
    return fromAbove && isColliding && fallingDown;
  }

  hit(damage) {
    this.energy -= damage;
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed / 500;
    return timepassed < 500;
  }

  isDead() {
    return this.energy <= 0;
  }

  playAnimation(images) {
    this.currentImage = this.currentImage || 0;
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }
}

class Character extends MoveableObject {
  height = 300;
  width = 150;
  y = 140;
  x = 20;
  speed = 10;
  coins = 0;
  lastMove = Date.now();
  lastHit = Date.now();

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  world;

  constructor(soundManager) {
    super();
    this.loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.soundManager = soundManager;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravitiy();
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.handleCharacterMovement();

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        this.lastMove = Date.now();
      }
      this.world.camera_x = -this.x + 50;
    }, 1000 / 60);

    setInterval(() => {
      this.updateCharacterAnimation();
    }, 100);
  }

  handleCharacterMovement() {
    let isMoving = false;
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      this.lastMove = Date.now();
      isMoving = true;
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      this.lastMove = Date.now();
      isMoving = true;
    }
  }

  updateCharacterAnimation() {
    if (this.isDead()) {
      this.handleDead();
      return;
    }
    if (this.isHurt()) {
      this.handleHurt();
      return;
    }
    if (this.isAboveGround()) {
      this.handleAboveGround();
      return;
    }
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.handleWalking();
      return;
    }
    this.handleIdle();
  }

  handleDead() {
    this.playAnimation(this.IMAGES_DEAD);
    this.soundManager.stop("snoringSound", 0.15);
  }

  handleHurt() {
    this.playAnimation(this.IMAGES_HURT);
    this.soundManager.stop("snoringSound");
  }

  handleAboveGround() {
    this.playAnimation(this.IMAGES_JUMPING);
    this.soundManager.stop("snoringSound");
  }

  handleWalking() {
    this.playAnimation(this.IMAGES_WALKING);
    this.soundManager.stop("snoringSound");
  }

  handleIdle() {
    const timeSinceLastMove = Date.now();
    if (timeSinceLastMove - this.lastMove > 5000) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
      this.soundManager.play("snoringSound", "0.15");
    } else {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  jump() {
    this.speedY = 25;
  }

  startsScreaming() {
    let sound;
    if (this.world && (this.world.gameOverPlayed || this.world.gameWinPlayed)) return;
    sound = this.soundManager.play("ouchSound", 0.5);
  }

  startsSnoring() {
    let sound;
    if (this.world && (this.world.gameOverPlayed || this.world.gameWinPlayed)) return;
    sound = this.soundManager.play("snoringSound", 0.15);
  }
}

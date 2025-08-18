class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  StatusBarHealth = new StatusBar_Health();
  StatusBarCoin = new StatusBar_Coin();
  StatusBarBottle = new StatusBar_Bottle();
  throwableObjects = [new ThrowableObject()];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollision();
      this.checkCoinCollision();
      this.checkBottleCollision();
      this.checkBottleCollisionWithEnemy();
      this.checkThrowObjects();
      this.spawnEndboss();
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.hasBottles()) {
      this.StatusBarBottle.setPercentage(this.StatusBarBottle.percentage - 20);
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
    }
  }

  checkCollision() {
    let enemies = [...this.level.smallEnemies, ...this.level.enemies, ...this.level.endboss];

    enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (enemy === this.level.endboss[0]) {
          this.character.hit(3);
        } else {
          this.character.hit(1);
        }
        this.StatusBarHealth.setPercentage(this.character.energy);
      }
    });
  }

  checkBottleCollision() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.level.bottles.splice(index, 1);
        this.StatusBarBottle.setPercentage(this.StatusBarBottle.percentage + 10);
      }
    });
  }

  checkCoinCollision() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(index, 1);
        this.StatusBarCoin.setPercentage(this.StatusBarCoin.percentage + 10);
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    //--------- space for fixed objects ----------
    this.addToMap(this.StatusBarHealth);
    this.addToMap(this.StatusBarCoin);
    this.addToMap(this.StatusBarBottle);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.smallEnemies);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    // Draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  hasBottles() {
    return this.StatusBarBottle.percentage >= 20;
  }

  spawnEndboss() {
    if (this.character.x >= 3500 && this.level.endboss.length > 0) {
      this.fadeOutMusic(backgroundMusic, () => {
        if (this.level.endboss[0]) {
          this.level.endboss[0].endbossAppears();
        }
      });
    }
  }

  fadeOutMusic(audio, callback) {
    let fadeOutInterval = setInterval(() => {
      if (audio.volume > 0.05) {
        audio.volume -= 0.05;
      } else {
        audio.volume = 0;
        audio.pause();
        clearInterval(fadeOutInterval);
        if (callback) callback();
      }
    }, 100);
  }

  checkBottleCollisionWithSmallChicken() {
    this.throwableObjects.forEach((bottle, bIndex) => {
      this.level.smallEnemies.forEach((smallEnemy, sEnemyIndex) => {
        if (!smallEnemy.isDead() && bottle.isColliding(smallEnemy)) {
          smallEnemy.hit(1);
          this.throwableObjects.splice(bIndex, 1);
          if (smallEnemy.isDead()) {
            setTimeout(() => {
              this.level.smallEnemies.splice(sEnemyIndex, 1);
            }, 500);
          }
        }
      });
    });
  }

  checkBottleCollisionWithChicken() {
    this.throwableObjects.forEach((bottle, bIndex) => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        if (!enemy.isDead() && bottle.isColliding(enemy)) {
          enemy.hit(1);
          this.throwableObjects.splice(bIndex, 1);
          if (enemy.isDead()) {
            setTimeout(() => {
              this.level.enemies.splice(enemyIndex, 1);
            }, 500);
          }
        }
      });
    });
  }

  checkBottleCollisionWithEndboss() {
    this.throwableObjects.forEach((bottle, bIndex) => {
      this.level.endboss.forEach((e, eIndex) => {
        if (!e.isDead() && bottle.isColliding(e)) {
          e.hit(2);
          this.throwableObjects.splice(bIndex, 1);
          if (e.isDead()) {
            setTimeout(() => {
              this.level.endboss.splice(eIndex, 1);
            }, 500);
          }
        }
      });
    });
  }

  checkBottleCollisionWithEnemy() {
    this.checkBottleCollisionWithSmallChicken();
    this.checkBottleCollisionWithChicken();
    this.checkBottleCollisionWithEndboss();
  }
}

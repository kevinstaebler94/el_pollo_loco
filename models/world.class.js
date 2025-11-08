class World {
   level = level1;
   canvas;
   ctx;
   keyboard;
   camera_x = 0;
   statusBarHealth = new StatusBar_Health();
   statusBarCoin = new StatusBar_Coin();
   statusBarBottle = new StatusBar_Bottle();
   statusBarEndboss;
   throwableObjects = [new ThrowableObject()];
   enemyPositions = [];
   groundY = 350;
   youWin = new Image("img/You won, you lost/You Win A.png");
   youLose = new Image("img/You won, you lost/You lost.png");
   gameOverPlayed = false;
   gameWinPlayed = false;
   mainInterval;
   secondaryInterval;

   constructor(canvas, keyboard, soundManager) {
      this.soundManager = soundManager;
      this.character = new Character(this.soundManager);
      this.soundButton = new SoundButton(this.soundManager);
      this.ctx = canvas.getContext("2d");
      this.canvas = canvas;
      this.keyboard = keyboard;
      this.setSpawnPositions();
      this.draw();
      this.setWorld();
      this.run();
   }

   setWorld() {
      this.character.world = this;
   }

   run() {
      this.mainInterval = setInterval(() => {
         this.characterIsStomping();
         this.checkCollision();
         this.checkCoinCollision();
         this.checkBottleCollision();
         this.checkBottleCollisionWithEnemy();
         this.checkHealth();
      }, 1000 / 60);
      this.secondaryInterval = setInterval(() => {
         this.checkThrowObjects();
         this.spawnEndboss();
         this.endbossSpottedCharacter();
         this.endbossChasingCharacter();
      }, 200);
   }

   checkThrowObjects() {
      if (this.keyboard.D && this.hasBottles()) {
         this.statusBarBottle.setPercentage(this.statusBarBottle.percentage - 20);
         let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
         this.throwableObjects.push(bottle);
      }
   }

   checkCollision() {
      let enemies = [...this.level.smallEnemies, ...this.level.enemies, ...this.level.endboss];

      enemies.forEach((enemy) => {
         if (this.character.isColliding(enemy)) {
            if (!(this.character.y + this.character.height > enemy.y + 5 && this.character.speedY > 0))
               if (enemy === this.level.endboss[0]) {
                  this.character.hit(3);
               } else {
                  this.character.hit(0.5);
               }
            this.statusBarHealth.setPercentage(this.character.energy);
            this.character.startsScreaming();
         }
      });
   }

   checkBottleCollision() {
      this.level.bottles.forEach((bottle, index) => {
         if (this.character.isColliding(bottle)) {
            this.level.bottles.splice(index, 1);
            this.statusBarBottle.setPercentage(this.statusBarBottle.percentage + 20);
         }
      });
   }

   checkCoinCollision() {
      this.level.coins.forEach((coin, index) => {
         if (this.character.isColliding(coin)) {
            this.level.coins.splice(index, 1);
            this.statusBarCoin.setPercentage(this.statusBarCoin.percentage + 20);
         }
      });
   }

   // kürzen
   draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObjects);
      this.ctx.translate(-this.camera_x, 0);
      //--------- space for fixed objects ----------
      this.addToMap(this.soundButton);
      this.addToMap(this.statusBarHealth);
      this.addToMap(this.statusBarCoin);
      this.addToMap(this.statusBarBottle);
      if (this.statusBarEndboss) {
         this.addToMap(this.statusBarEndboss);
      }
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
      // mo.drawFrame(this.ctx);

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
      return this.statusBarBottle.percentage > 0;
   }

   spawnEndboss() {
      let backgroundMusic = this.soundManager.backgroundMusic;
      if (this.character.x >= 6000 && this.level.endboss.length > 0 && !this.statusBarEndboss) {
         this.fadeOutMusic(backgroundMusic, () => {
            if (this.level.endboss[0]) {
               this.level.endboss[0].endbossAppears();
               this.statusBarEndboss = new StatusBar_Endboss();
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

   // kürzen
   checkBottleCollisionWithSmallChicken() {
      this.throwableObjects.forEach((bottle, bIndex) => {
         this.level.smallEnemies.forEach((smallEnemy, sEnemyIndex) => {
            if (!smallEnemy.isDead() && bottle.isColliding(smallEnemy)) {
               smallEnemy.hit(1);
               this.enemyIsScreaming();
               bottle.startSplashAnimation();
               setTimeout(() => {
                  this.throwableObjects.splice(bIndex, 1);
               }, bottle.IMAGES_SPLASH.length * 100);
               if (smallEnemy.isDead()) {
                  setTimeout(() => {
                     this.level.smallEnemies.splice(sEnemyIndex, 1);
                  }, 500);
               }
            }
         });
      });
   }

   // kürzen
   checkBottleCollisionWithChicken() {
      this.throwableObjects.forEach((bottle, bIndex) => {
         this.level.enemies.forEach((enemy, enemyIndex) => {
            if (!enemy.isDead() && bottle.isColliding(enemy)) {
               enemy.hit(1);
               this.enemyIsScreaming();
               bottle.startSplashAnimation();
               setTimeout(() => {
                  this.throwableObjects.splice(bIndex, 1);
               }, bottle.IMAGES_SPLASH.length * 100);
               if (enemy.isDead()) {
                  setTimeout(() => {
                     this.level.enemies.splice(enemyIndex, 1);
                  }, 500);
               }
            }
         });
      });
   }

   // kürzen
   checkBottleCollisionWithEndboss() {
      this.throwableObjects.forEach((bottle, bIndex) => {
         this.level.endboss.forEach((e, eIndex) => {
            if (!e.isDead() && bottle.isColliding(e) && !bottle.hasHit) {
               bottle.hasHit = true;
               e.takesDamage();
               e.hit(2);
               e.startsScreaming();
               if (this.statusBarEndboss && this.level.endboss[0]) {
                  let percent = (this.level.endboss[0].energy / 10) * 100;
                  this.statusBarEndboss.setPercentage(percent);
               }
               bottle.startSplashAnimation();
               setTimeout(() => {
                  this.throwableObjects.splice(bIndex, 1);
               }, bottle.IMAGES_SPLASH.length * 100);
               if (e.isDead()) {
                  e.endbossIsDead();
                  setTimeout(() => {
                     this.level.endboss.splice(eIndex, 1);
                     e.endbossMusic.pause();
                  }, 1500);
                  this.playGameWinningSound();
               }
            }
         });
      });
   }

   checkBottleCollisionWithGround() {
      this.throwableObjects.forEach((bottle, bIndex) => {
         if (bottle.y + bottle.height >= this.groundY) {
            bottle.startSplashAnimation();
            setTimeout(() => {
               this.throwableObjects.splice(bIndex, 1);
            }, bottle.IMAGES_SPLASH.length * 100);
         }
      });
   }

   checkBottleCollisionWithEnemy() {
      this.checkBottleCollisionWithSmallChicken();
      this.checkBottleCollisionWithChicken();
      this.checkBottleCollisionWithEndboss();
      this.checkBottleCollisionWithGround();
   }

   endbossSpottedCharacter() {
      let endboss = this.level.endboss[0];
      if (!endboss) return;
      let distance = Math.abs(this.character.x - endboss.x);
      if (distance < 500) {
         endboss.spottedCharacter();
         setTimeout(() => {
            endboss.startRunning();
         }, 1000);
      }
   }

   endbossChasingCharacter() {
      const endboss = this.level.endboss[0];
      if (!endboss) return;
      setInterval(() => {
         if (this.character.x < endboss.x) {
            endboss.otherDirection = false;
         } else {
            endboss.otherDirection = true;
            endboss.moveRight();
         }
      }, 200);
   }

   setSpawnPositionEnemies() {
      let enemies = this.level.enemies;
      let levelWidth = this.level.level_end_x - 2000;
      let distance = 250;

      enemies.forEach((enemy) => {
         let enemyPos;
         let spawns = 0;
         do {
            enemyPos = 500 + Math.random() * levelWidth;
            enemyPos = Math.min(enemyPos, levelWidth - distance);
            spawns++;
         } while (this.enemyPositions.some((pos) => Math.abs(pos - enemyPos) < distance) && spawns < 100);
         this.enemyPositions.push(enemyPos);
         enemy.x = enemyPos;
      });
   }

   setSpawnPositionSmallEnemies() {
      let smallEnemies = this.level.smallEnemies;
      let levelWidth = this.level.level_end_x - 2000;
      let distance = 500;

      smallEnemies.forEach((enemy) => {
         let enemyPos;
         let spawns = 0;
         do {
            enemyPos = 500 + Math.random() * levelWidth;
            enemyPos = Math.min(enemyPos, levelWidth - distance);
            spawns++;
         } while (this.enemyPositions.some((pos) => Math.abs(pos - enemyPos) < distance) && spawns < 100);
         this.enemyPositions.push(enemyPos);
         enemy.x = enemyPos;
      });
   }

   setSpawnPositionBottles() {
      let bottles = this.level.bottles;
      let levelWidth = this.level.level_end_x - 2000;
      let distance = 350;
      let bottlePositions = [];

      bottles.forEach((bottle) => {
         let bottlePos;
         let spawns = 0;
         do {
            bottlePos = 500 + Math.random() * levelWidth;
            bottlePos = Math.min(bottlePos, levelWidth - distance);
            spawns++;
         } while (bottlePositions.some((pos) => Math.abs(pos - bottlePos) < distance) && spawns < 100);
         bottlePositions.push(bottlePos);
         bottle.x = bottlePos;
      });
   }

   setSpawnPositions() {
      this.setSpawnPositionEnemies();
      this.setSpawnPositionSmallEnemies();
      this.setSpawnPositionBottles();
   }

   // kürzen
   characterIsStomping() {
      let enemies = this.level.getAllEnemies();
      let character = this.character;

      enemies.forEach((enemy) => {
         if (character.isStomping(enemy)) {
            enemy.hit(1);
            this.enemyIsScreaming();
            character.jump();
            if (enemy.isDead()) {
               setTimeout(() => {
                  if (this.level.enemies.includes(enemy)) {
                     let index = this.level.enemies.indexOf(enemy);
                     this.level.enemies.splice(index, 1);
                  } else if (this.level.smallEnemies.includes(enemy)) {
                     let index = this.level.smallEnemies.indexOf(enemy);
                     this.level.smallEnemies.splice(index, 1);
                  }
               }, 500);
            }
         }
      });
   }

   // kürzen
   playGameWinningSound() {
      this.keyboard = {};
      let sound;
      if (!this.gameWinPlayed) {
         this.gameWinPlayed = true;
         if (this.statusBarHealth.percentage === 100) {
            this.level.endboss[0].endbossMusic.pause();
            this.soundManager.stop("backgroundMusic");
            sound = this.soundManager.play("flawlessVictorySound", 0.6);
         } else {
            this.level.endboss[0].endbossMusic.pause();
            this.soundManager.stop("backgroundMusic");
            sound = this.soundManager.play("wellDoneSound", 0.6);
         }
         if (sound) {
            sound.onended = () => {
               this.stopAllIntervals();
               this.showEndScreen();
            };
         }
      }
   }

   playGameOverSound() {
      this.keyboard = {};
      let sound;
      if (this.statusBarHealth.percentage === 0 && !this.gameOverPlayed) {
         this.level.endboss[0].endbossMusic.pause();
         this.soundManager.stop("backgroundMusic");
         sound = this.soundManager.play("gameOverSound", 0.6);
         this.gameOverPlayed = true;
      }
      if (sound) {
         sound.onended = () => {
            this.stopAllIntervals();
            this.showEndScreen();
         };
      }
   }

   checkHealth() {
      if (this.statusBarHealth.percentage === 0) {
         this.playGameOverSound();
         document.getElementById("lost").classList.remove("dNone");
      }
      if (this.statusBarEndboss && this.statusBarEndboss.percentage === 0) {
         this.playGameWinningSound();
         document.getElementById("won").classList.remove("dNone");
      }
   }

   showEndScreen() {
      document.getElementById("canvas").classList.add("dNone");
      document.getElementById("controlsStartscreen").classList.add("dNone");
      document.getElementById("controlsEndscreen").classList.remove("dNone");
      document.getElementById("endscreen").classList.remove("dNone");
   }

   stopAllIntervals() {
      clearInterval(this.mainInterval);
      clearInterval(this.secondaryInterval);
   }

   enemyIsScreaming() {
      this.soundManager.play("screamingSoundChicken", 0.6);
   }
}

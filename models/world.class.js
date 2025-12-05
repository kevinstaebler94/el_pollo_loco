/**
 * Represents the main game world that manages all game logic, rendering, and interactions.
 * Handles collision detection, enemy spawning, status bars, and game state.
 */
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
   throwableObjects = [];
   enemyPositions = [];
   groundY = 350;
   youWin = new Image("img/You won, you lost/You Win A.png");
   youLose = new Image("img/You won, you lost/You lost.png");
   gameOverPlayed = false;
   gameWinPlayed = false;
   win = document.getElementById("won");
   loss = document.getElementById("lost");
   mainInterval;
   secondaryInterval;

   /**
    * Creates the game world and initializes all game systems.
    * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
    * @param {Keyboard} keyboard - The keyboard input handler.
    * @param {SoundManager} soundManager - The sound manager for audio playback.
    * @param {Endboss} endboss - The endboss enemy instance.
    */
   constructor(canvas, keyboard, soundManager, endboss) {
      this.win.classList.add("dNone");
      this.loss.classList.add("dNone");
      this.endboss = endboss;
      this.soundManager = soundManager;
      this.character = new Character(this.soundManager);
      this.ctx = canvas.getContext("2d");
      this.canvas = canvas;
      this.keyboard = keyboard;
      this.throwableObjects;
      this.collisionDetection = new CollisionDetection(this);
      this.spawnPositions = new SpawnPositions(this);

      if (this.level.endboss[0]) {
         this.level.endboss[0].soundManager = this.soundManager;
      }
      this.draw();
      this.setWorld();
      this.run();
   }

   /**
    * Links the world reference to the character for accessing world properties.
    */
   setWorld() {
      this.character.world = this;
      this.collisionDetection.world = this;
   }

   /**
    * Starts the main game loops for collision detection and game logic updates.
    */
   run() {
      this.mainInterval = setInterval(() => {
         this.characterIsStomping();
         this.collisionDetection.checkCollision();
         this.collisionDetection.checkCoinCollision();
         this.collisionDetection.checkBottleCollision();
         this.collisionDetection.checkBottleCollisionWithEnemy();
         this.checkHealth();
      }, 1000 / 60);
      this.secondaryInterval = setInterval(() => {
         // this.checkThrowObjects();
         this.spawnEndboss();
         this.endbossSpottedCharacter();
         this.endbossChasingCharacter();
      }, 200);
   }

   /**
    * Main rendering method that draws all game objects on the canvas.
    * Handles camera movement and layer rendering order.
    */
   draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObjects);
      this.ctx.translate(-this.camera_x, 0);
      this.ctx.translate(this.camera_x, 0);
      this.addToMap(this.character);
      [this.level.bottles, this.level.coins, this.level.clouds, this.level.enemies, this.level.smallEnemies, this.level.endboss, this.throwableObjects].forEach(
         (arr) => this.addObjectsToMap(arr)
      );
      this.ctx.translate(-this.camera_x, 0);
      [this.statusBarHealth, this.statusBarCoin, this.statusBarBottle, this.statusBarEndboss].forEach((obj) => obj && this.addToMap(obj));
      let self = this;
      requestAnimationFrame(() => {
         self.draw();
      });
   }

   /**
    * Adds multiple objects to the rendering map.
    * @param {DrawableObject[]} objects - Array of drawable objects to render.
    */
   addObjectsToMap(objects) {
      objects.forEach((object) => {
         this.addToMap(object);
      });
   }

   /**
    * Adds a single moveable object to the canvas and handles mirroring if needed.
    * @param {MoveableObject} mo - The moveable object to draw.
    */
   addToMap(mo) {
      if (mo.otherDirection) {
         this.flipImage(mo);
      }
      mo.draw(this.ctx);

      if (mo.otherDirection) {
         this.flipImageBack(mo);
      }
   }

   /**
    * Flips the image horizontally for objects facing the opposite direction.
    * @param {MoveableObject} mo - The object to flip.
    */
   flipImage(mo) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
   }

   /**
    * Restores the original image orientation after flipping.
    * @param {MoveableObject} mo - The object to restore.
    */
   flipImageBack(mo) {
      mo.x = mo.x * -1;
      this.ctx.restore();
   }

   /**
    * Checks if the player has bottles available to throw.
    * @returns {boolean} True if bottles are available, false otherwise.
    */
   hasBottles() {
      return this.statusBarBottle.percentage > 0;
   }

   /**
    * Spawns the endboss when the character reaches a certain position.
    * Fades out background music and starts endboss music.
    */
   spawnEndboss() {
      let backgroundMusic = this.soundManager.backgroundMusic;
      if (this.character.x >= 6000 && this.level.endboss.length > 0 && !this.statusBarEndboss) {
         this.soundManager.fadeOutMusic(backgroundMusic, () => {
            if (this.level.endboss[0]) {
               this.level.endboss[0].endbossAppears();
               this.statusBarEndboss = new StatusBar_Endboss();
            }
         });
      }
   }

   /**
    * Handles damage and effects when a bottle hits an enemy.
    * @param {MoveableObject} enemy - The enemy that was hit.
    * @param {ThrowableObject} bottle - The bottle that hit the enemy.
    */
   handleEnemyHit(enemy) {
      enemy.hit(1);
      this.enemyIsScreaming();

      this.playAnimation(this.throwableObjects[0].IMAGES_SPLASH);
   }

   /**
    * Removes a bottle from the game after its splash animation completes.
    * @param {ThrowableObject} bottle - The bottle to remove.
    * @param {number} index - The index of the bottle in the throwableObjects array.
    */
   removeBottleAfterSplash(bottle, index) {
      setTimeout(() => {
         this.throwableObjects.splice(index, 1);
      }, bottle.IMAGES_SPLASH.length * 150);
   }

   /**
    * Removes a dead enemy from the game after a delay.
    * @param {MoveableObject} enemy - The enemy to remove.
    * @param {MoveableObject[]} enemyArray - The array containing the enemy.
    * @param {number} index - The index of the enemy in the array.
    */
   removeDeadEnemy(enemy, enemyArray, index) {
      if (enemy.isDead()) {
         setTimeout(() => {
            enemyArray.splice(index, 1);
         }, 500);
      }
   }

   /**
    * Handles damage and effects when a bottle hits the endboss.
    * @param {Endboss} endboss - The endboss that was hit.
    * @param {ThrowableObject} bottle - The bottle that hit the endboss.
    */
   handleEndbossHit(endboss, bottle) {
      bottle.hasHit = true;
      endboss.takesDamage();
      endboss.hit(2);
      endboss.startsScreaming();
      this.updateEndbossHealthBar();
      // bottle.startSplashAnimation();
   }

   /**
    * Updates the endboss health bar to reflect current health percentage.
    */
   updateEndbossHealthBar() {
      if (this.statusBarEndboss && this.level.endboss[0]) {
         let percent = (this.level.endboss[0].energy / 10) * 100;
         this.statusBarEndboss.setPercentage(percent);
      }
   }

   /**
    * Handles the endboss death sequence and triggers victory.
    * @param {Endboss} endboss - The endboss that died.
    * @param {number} index - The index of the endboss in the array.
    */
   handleEndbossDeath(endboss, index) {
      endboss.endbossIsDead();
      setTimeout(() => {
         this.level.endboss.splice(index, 1);
         this.soundManager.stop("endbossMusic");
      }, 1500);
      this.playGameWinningSound();
   }

   /**
    * Triggers endboss alert mode when character gets close enough.
    */
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

   /**
    * Makes the endboss chase the character by adjusting direction.
    */
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

   /**
    * Checks if the character is stomping on any enemy and handles the stomp attack.
    */
   characterIsStomping() {
      this.level.getAllEnemies().forEach((enemy) => {
         if (this.character.isStomping(enemy)) {
            this.handleStompHit(enemy);
         }
      });
   }

   /**
    * Handles the effects of a successful stomp attack on an enemy.
    * @param {MoveableObject} enemy - The enemy that was stomped.
    */
   handleStompHit(enemy) {
      enemy.hit(1);
      this.enemyIsScreaming();
      this.character.jump();
      if (enemy.isDead()) {
         this.removeStompedEnemy(enemy);
      }
   }

   /**
    * Removes a stomped enemy from the game after a delay.
    * @param {MoveableObject} enemy - The enemy to remove.
    */
   removeStompedEnemy(enemy) {
      setTimeout(() => {
         const enemyArray = this.level.enemies.includes(enemy) ? this.level.enemies : this.level.smallEnemies;
         const index = enemyArray.indexOf(enemy);
         if (index !== -1) enemyArray.splice(index, 1);
      }, 500);
   }

   /**
    * Plays the appropriate victory sound based on player's health and triggers game end.
    */
   playGameWinningSound() {
      if (this.gameWinPlayed) return;
      this.keyboard = {};
      this.gameWinPlayed = true;
      this.soundManager.stopBackgroundMusic();
      if (this.soundManager.soundsMuted) {
         this.handleGameEnd();
         return;
      }
      const soundName = this.statusBarHealth.percentage === 100 ? "flawlessVictorySound" : "wellDoneSound";
      const sound = this.soundManager.play(soundName, 0.6);
      if (sound) {
         sound.onended = () => this.handleGameEnd();
      }
      this.win.classList.add("dNone");
   }

   /**
    * Handles the game end sequence by stopping intervals and showing end screen.
    */
   handleGameEnd() {
      this.stopAllIntervals();
      this.showEndScreen();
   }

   /**
    * Plays the game over sound when the player dies and triggers game end.
    */
   playGameOverSound() {
      this.keyboard = {};
      let sound;
      if (this.statusBarHealth.percentage === 0 && !this.gameOverPlayed) {
         this.soundManager.stop("endbossMusic");
         this.soundManager.stop("backgroundMusic");
         if (this.soundManager.soundsMuted) {
            this.stopAllIntervals();
            this.showEndScreen();
            this.gameOverPlayed = true;
            return;
         }
         sound = this.soundManager.play("gameOverSound", 0.6);
         this.gameOverPlayed = true;
      }
      if (sound) {
         sound.onended = () => {
            this.stopAllIntervals();
            this.showEndScreen();
         };
      }
      this.loss.classList.add("dNone");
   }

   /**
    * Checks player and endboss health to determine game over or victory conditions.
    */
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

   /**
    * Displays the end screen and hides the game canvas.
    */
   showEndScreen() {
      document.getElementById("canvas").classList.add("dNone");
      document.getElementById("controlsStartscreen").classList.add("dNone");
      document.getElementById("controlsEndscreen").classList.remove("dNone");
      document.getElementById("endscreen").classList.remove("dNone");
   }

   /**
    * Stops all running game intervals to pause game logic.
    */
   stopAllIntervals() {
      clearInterval(this.mainInterval);
      clearInterval(this.secondaryInterval);
   }

   /**
    * Plays the chicken screaming sound effect.
    */
   enemyIsScreaming() {
      this.soundManager.play("screamingSoundChicken", 0.6);
   }
}

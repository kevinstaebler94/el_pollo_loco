/**
 * Handles all collision detection logic for the game.
 * Manages collisions between characters, enemies, projectiles, and collectibles.
 */
class CollisionDetection {
   /**
    * Creates a collision detection instance linked to the game world.
    * @param {World} world - Reference to the main game world instance.
    */
   constructor(world) {
      this.world = world;
      this.bottleCollectCount = 0;
   }

   /**
    * Checks for collisions between the character and all enemies.
    * Applies damage to the character and updates health bar on collision.
    */
   checkCollision() {
      let enemies = [...this.world.level.smallEnemies, ...this.world.level.enemies, ...this.world.level.endboss];

      enemies.forEach((enemy) => {
         if (this.world.character.isColliding(enemy)) {
            const jumpedOnEnemy = this.world.character.y + this.world.character.height > enemy.y + 5 && this.world.character.speedY > 0;
            if (!jumpedOnEnemy) {
               if (enemy === this.world.level.endboss[0]) {
                  this.world.character.hit(3);
               } else {
                  this.world.character.hit(0.5);
               }
               this.world.statusBarHealth.setPercentage(this.world.character.energy);
               this.world.character.startsScreaming();
            }
         }
      });
   }

   /**
    * Checks for collisions between the character and bottles.
    * Collects bottles and updates the bottle status bar.
    */
   checkBottleCollision() {
      this.world.level.bottles.forEach((bottle, index) => {
         if (this.world.character.isColliding(bottle)) {
            this.world.level.bottles.splice(index, 1);
            this.bottleCollectCount++;
            if (this.bottleCollectCount % 2 === 0) {
               this.world.statusBarBottle.setPercentage(this.world.statusBarBottle.percentage + 20);
            }
         }
      });
   }

   /**
    * Checks for collisions between the character and coins.
    * Collects coins, updates the coin status bar, and plays collection sound.
    */
   checkCoinCollision() {
      this.world.level.coins.forEach((coin, index) => {
         if (this.world.character.isColliding(coin)) {
            this.world.level.coins.splice(index, 1);
            this.world.statusBarCoin.setPercentage(this.world.statusBarCoin.percentage + 20);
            this.world.soundManager.play("collectSound", 0.2, false);
         }
      });
   }

   /**
    * Checks for bottle collisions with small chicken enemies.
    */
   checkBottleCollisionWithSmallChicken() {
      this.checkBottleCollisionWithEnemyType(this.world.level.smallEnemies);
   }

   /**
    * Checks for bottle collisions with normal chicken enemies.
    */
   checkBottleCollisionWithChicken() {
      this.checkBottleCollisionWithEnemyType(this.world.level.enemies);
   }

   /**
    * Generic method to check bottle collisions with a specific enemy type.
    * Handles enemy damage, bottle splash animation, and enemy removal.
    * @param {MoveableObject[]} enemyArray - Array of enemies to check collisions with.
    */
   checkBottleCollisionWithEnemyType(enemyArray) {
      this.world.throwableObjects.forEach((bottle, bIndex) => {
         enemyArray.forEach((enemy, enemyIndex) => {
            if (enemy.isDead() || !bottle.isColliding(enemy)) return;
            this.world.handleEnemyHit(enemy, bottle);
            this.world.removeBottleAfterSplash(bottle, bIndex);
            this.world.removeDeadEnemy(enemy, enemyArray, enemyIndex);
         });
      });
   }

   /**
    * Checks for bottle collisions with the endboss.
    * Handles endboss damage, health bar updates, and death sequence.
    */
   checkBottleCollisionWithEndboss() {
      this.world.throwableObjects.forEach((bottle, bIndex) => {
         this.world.level.endboss.forEach((endboss, eIndex) => {
            if (endboss.isDead() || !bottle.isColliding(endboss) || bottle.hasHit) return;
            this.world.handleEndbossHit(endboss, bottle);
            this.world.removeBottleAfterSplash(bottle, bIndex);
            if (endboss.isDead()) this.world.handleEndbossDeath(endboss, eIndex);
         });
      });
   }

   /**
    * Master method that checks all types of bottle collisions.
    * Consolidates checks for small chickens, normal chickens, endboss, and ground.
    */
   checkBottleCollisionWithEnemy() {
      this.checkBottleCollisionWithSmallChicken();
      this.checkBottleCollisionWithChicken();
      this.checkBottleCollisionWithEndboss();
   }
}

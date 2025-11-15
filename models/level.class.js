/**
 * Represents a game level containing all entities and objects.
 * Manages enemies, collectibles, background elements, and level boundaries.
 */
class Level {
   enemies;
   smallEnemies;
   endboss;
   clouds;
   bottles;
   coins;
   backgroundObjects;
   level_end_x = 10000;

   /**
    * Creates a new level with specified game entities.
    * @param {Chicken[]} enemies - Array of normal chicken enemies.
    * @param {SmallChicken[]} smallEnemies - Array of small chicken enemies.
    * @param {Endboss[]} endboss - Array containing the endboss (typically one).
    * @param {Cloud[]} clouds - Array of background clouds.
    * @param {Bottle[]} bottles - Array of collectible bottles.
    * @param {Coin[]} coins - Array of collectible coins.
    * @param {BackgroundObject[]} backgroundObjects - Array of background layer objects.
    */
   constructor(enemies, smallEnemies, endboss, clouds, bottles, coins, backgroundObjects) {
      this.enemies = enemies;
      this.smallEnemies = smallEnemies;
      this.endboss = endboss;
      this.clouds = clouds;
      this.bottles = bottles;
      this.coins = coins;
      this.backgroundObjects = backgroundObjects;
   }

   /**
    * Returns a combined array of all enemy types (excluding endboss).
    * @returns {Array} Combined array of normal and small chicken enemies.
    */
   getAllEnemies() {
      return [...this.enemies, ...this.smallEnemies];
   }
}

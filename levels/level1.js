let level1;

/**
 * Initializes level 1 by creating all game entities (enemies, items, backgrounds)
 * and instantiating the Level object with these entities.
 */
function initLevel1(intervalManager, soundManager) {
   const enemies = enemyLoop(intervalManager, soundManager);
   const smallEnemies = smallEnemyLoop(intervalManager, soundManager);
   const bottles = bottleLoop(intervalManager, soundManager);
   const coins = coinLoop(intervalManager, soundManager);
   const backgrounds = backgroundLoop();

   level1 = new Level(enemies, smallEnemies, [new Endboss(intervalManager, soundManager)], [new Cloud(intervalManager)], bottles, coins, backgrounds);
}

/**
 * Creates an array of Chicken enemies for the level.
 * @returns {Chicken[]} Array containing 5 Chicken instances.
 */
function enemyLoop(intervalManager, soundManager) {
   const enemies = [];
   for (let i = 0; i < 10; i++) {
      enemies.push(new Chicken(intervalManager, soundManager));
   }
   return enemies;
}

/**
 * Creates an array of SmallChicken enemies for the level.
 * @returns {SmallChicken[]} Array containing 7 SmallChicken instances.
 */
function smallEnemyLoop(intervalManager, soundManager) {
   const smallEnemies = [];
   for (let i = 0; i < 6; i++) {
      smallEnemies.push(new SmallChicken(intervalManager, soundManager));
   }
   return smallEnemies;
}

/**
 * Creates an array of Bottle collectibles for the level.
 * @returns {Bottle[]} Array containing 5 Bottle instances.
 */
function bottleLoop(intervalManager, soundManager) {
   const bottles = [];
   for (let i = 0; i < 50; i++) {
      bottles.push(new Bottle(intervalManager, soundManager));
   }
   return bottles;
}

/**
 * Creates an array of Coin collectibles for the level.
 * @returns {Coin[]} Array containing 7 Coin instances.
 */
function coinLoop(intervalManager, soundManager) {
   const coins = [];
   for (let i = 0; i < 7; i++) {
      coins.push(new Coin(intervalManager, soundManager));
   }
   return coins;
}

/**
 * Creates an array of background layer objects that span across the entire level.
 * Generates 4 parallax layers (air, third, second, first) repeated 16 times horizontally.
 * @returns {BackgroundObject[]} Array containing all background layer objects positioned across the level.
 */
function backgroundLoop() {
   const layers = [
      "img/5_background/layers/air.png",
      "img/5_background/layers/3_third_layer/full.png",
      "img/5_background/layers/2_second_layer/full.png",
      "img/5_background/layers/1_first_layer/full.png",
   ];

   const backgrounds = [];
   for (let i = -1; i <= 14; i++) {
      const x = 720 * i;
      for (let j = 0; j < layers.length; j++) {
         backgrounds.push(new BackgroundObject(layers[j], x));
      }
   }
   return backgrounds;
}

let level1;

function initLevel1() {
   const enemies = enemyLoop();
   const smallEnemies = smallEnemyLoop();
   const bottles = bottleLoop();
   const coins = coinLoop();
   const backgrounds = backgroundLoop();

   level1 = new Level(enemies, smallEnemies, [new Endboss()], [new Cloud()], bottles, coins, backgrounds);
}

function enemyLoop() {
   const enemies = [];
   for (let i = 0; i < 5; i++) {
      enemies.push(new Chicken());
   }
   return enemies;
}

function smallEnemyLoop() {
   const smallEnemies = [];
   for (let i = 0; i < 7; i++) {
      smallEnemies.push(new SmallChicken());
   }
   return smallEnemies;
}

function bottleLoop() {
   const bottles = [];
   for (let i = 0; i < 5; i++) {
      bottles.push(new Bottle());
   }
   return bottles;
}

function coinLoop() {
   const coins = [];
   for (let i = 0; i < 7; i++) {
      coins.push(new Coin());
   }
   return coins;
}

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

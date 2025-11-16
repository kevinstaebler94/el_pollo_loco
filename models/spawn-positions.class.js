/**
 * Manages spawn position logic for enemies and collectibles in the game.
 * Ensures minimum distances between spawned entities to prevent overlapping.
 */
class SpawnPositions {
   /**
    * Creates a spawn positions manager and initializes all spawn positions.
    * @param {World} world - Reference to the main game world instance.
    */
   constructor(world) {
      this.world = world;
      this.setSpawnPositions();
   }

   /**
    * Sets random spawn positions for normal chicken enemies with minimum distance between them.
    */
   setSpawnPositionEnemies() {
      let enemies = this.world.level.enemies;
      let levelWidth = this.world.level.level_end_x - 2000;
      let distance = 250;

      enemies.forEach((enemy) => {
         let enemyPos;
         let spawns = 0;
         do {
            enemyPos = 500 + Math.random() * levelWidth;
            enemyPos = Math.min(enemyPos, levelWidth - distance);
            spawns++;
         } while (this.world.enemyPositions.some((pos) => Math.abs(pos - enemyPos) < distance) && spawns < 100);
         this.world.enemyPositions.push(enemyPos);
         enemy.x = enemyPos;
      });
   }

   /**
    * Sets random spawn positions for small chicken enemies with minimum distance between them.
    */
   setSpawnPositionSmallEnemies() {
      let smallEnemies = this.world.level.smallEnemies;
      let levelWidth = this.world.level.level_end_x - 2000;
      let distance = 500;

      smallEnemies.forEach((enemy) => {
         let enemyPos;
         let spawns = 0;
         do {
            enemyPos = 500 + Math.random() * levelWidth;
            enemyPos = Math.min(enemyPos, levelWidth - distance);
            spawns++;
         } while (this.world.enemyPositions.some((pos) => Math.abs(pos - enemyPos) < distance) && spawns < 100);
         this.world.enemyPositions.push(enemyPos);
         enemy.x = enemyPos;
      });
   }

   /**
    * Sets random spawn positions for bottles with minimum distance between them.
    */
   setSpawnPositionBottles() {
      let bottles = this.world.level.bottles;
      let levelWidth = this.world.level.level_end_x - 2000;
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

   /**
    * Initializes spawn positions for all enemies and collectible items.
    * Calls individual spawn methods for each entity type.
    */
   setSpawnPositions() {
      this.setSpawnPositionEnemies();
      this.setSpawnPositionSmallEnemies();
      this.setSpawnPositionBottles();
   }
}

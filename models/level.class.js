class Level {
  enemies;
  smallEnemies;
  endboss;
  clouds;
  bottles;
  coins;
  backgroundObjects;
  level_end_x = 10000;

  constructor(enemies, smallEnemies, endboss, clouds, bottles, coins, backgroundObjects) {
    this.enemies = enemies;
    this.smallEnemies = smallEnemies;
    this.endboss = endboss;
    this.clouds = clouds;
    this.bottles = bottles;
    this.coins = coins;
    this.backgroundObjects = backgroundObjects;
  }
}

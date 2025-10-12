let level1;

function initLevel1() {
  level1 = new Level(
    [new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken()],
    [
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
    ],
    [new Endboss()],
    [new Cloud()],
    [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle()],
    [
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
    ],

    [
      new BackgroundObject("img/5_background/layers/air.png", -720),
      new BackgroundObject("img/5_background/layers/3_third_layer/full.png", -720),
      new BackgroundObject("img/5_background/layers/2_second_layer/full.png", -720),
      new BackgroundObject("img/5_background/layers/1_first_layer/full.png", -720),

      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/full.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/full.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/full.png", 0),

      new BackgroundObject("img/5_background/layers/air.png", 720),
      new BackgroundObject("img/5_background/layers/3_third_layer/full.png", 720),
      new BackgroundObject("img/5_background/layers/2_second_layer/full.png", 720),
      new BackgroundObject("img/5_background/layers/1_first_layer/full.png", 720),

      new BackgroundObject("img/5_background/layers/air.png", 720 * 2),
      new BackgroundObject("img/5_background/layers/3_third_layer/full.png", 720 * 2),
      new BackgroundObject("img/5_background/layers/2_second_layer/full.png", 720 * 2),
      new BackgroundObject("img/5_background/layers/1_first_layer/full.png", 720 * 2),

      new BackgroundObject("img/5_background/layers/air.png", 720 * 3),
      new BackgroundObject("img/5_background/layers/3_third_layer/full.png", 720 * 3),
      new BackgroundObject("img/5_background/layers/2_second_layer/full.png", 720 * 3),
      new BackgroundObject("img/5_background/layers/1_first_layer/full.png", 720 * 3),

      new BackgroundObject("img/5_background/layers/air.png", 720 * 4),
      new BackgroundObject("img/5_background/layers/3_third_layer/full.png", 720 * 4),
      new BackgroundObject("img/5_background/layers/2_second_layer/full.png", 720 * 4),
      new BackgroundObject("img/5_background/layers/1_first_layer/full.png", 720 * 4),

      new BackgroundObject("img/5_background/layers/air.png", 720 * 5),
      new BackgroundObject("img/5_background/layers/3_third_layer/full.png", 720 * 5),
      new BackgroundObject("img/5_background/layers/2_second_layer/full.png", 720 * 5),
      new BackgroundObject("img/5_background/layers/1_first_layer/full.png", 720 * 5),

      new BackgroundObject("img/5_background/layers/air.png", 720 * 6),
      new BackgroundObject("img/5_background/layers/3_third_layer/full.png", 720 * 6),
      new BackgroundObject("img/5_background/layers/2_second_layer/full.png", 720 * 6),
      new BackgroundObject("img/5_background/layers/1_first_layer/full.png", 720 * 6),

      new BackgroundObject("img/5_background/layers/air.png", 720 * 7),
      new BackgroundObject("img/5_background/layers/3_third_layer/full.png", 720 * 7),
      new BackgroundObject("img/5_background/layers/2_second_layer/full.png", 720 * 7),
      new BackgroundObject("img/5_background/layers/1_first_layer/full.png", 720 * 7),

      new BackgroundObject("img/5_background/layers/air.png", 720 * 8),
      new BackgroundObject("img/5_background/layers/3_third_layer/full.png", 720 * 8),
      new BackgroundObject("img/5_background/layers/2_second_layer/full.png", 720 * 8),
      new BackgroundObject("img/5_background/layers/1_first_layer/full.png", 720 * 8),

      new BackgroundObject("img/5_background/layers/air.png", 720 * 9),
      new BackgroundObject("img/5_background/layers/3_third_layer/full.png", 720 * 9),
      new BackgroundObject("img/5_background/layers/2_second_layer/full.png", 720 * 9),
      new BackgroundObject("img/5_background/layers/1_first_layer/full.png", 720 * 9),

      new BackgroundObject("img/5_background/layers/air.png", 720 * 10),
      new BackgroundObject("img/5_background/layers/3_third_layer/full.png", 720 * 10),
      new BackgroundObject("img/5_background/layers/2_second_layer/full.png", 720 * 10),
      new BackgroundObject("img/5_background/layers/1_first_layer/full.png", 720 * 10),

      new BackgroundObject("img/5_background/layers/air.png", 720 * 11),
      new BackgroundObject("img/5_background/layers/3_third_layer/full.png", 720 * 11),
      new BackgroundObject("img/5_background/layers/2_second_layer/full.png", 720 * 11),
      new BackgroundObject("img/5_background/layers/1_first_layer/full.png", 720 * 11),

      new BackgroundObject("img/5_background/layers/air.png", 720 * 12),
      new BackgroundObject("img/5_background/layers/3_third_layer/full.png", 720 * 12),
      new BackgroundObject("img/5_background/layers/2_second_layer/full.png", 720 * 12),
      new BackgroundObject("img/5_background/layers/1_first_layer/full.png", 720 * 12),

      new BackgroundObject("img/5_background/layers/air.png", 720 * 13),
      new BackgroundObject("img/5_background/layers/3_third_layer/full.png", 720 * 13),
      new BackgroundObject("img/5_background/layers/2_second_layer/full.png", 720 * 13),
      new BackgroundObject("img/5_background/layers/1_first_layer/full.png", 720 * 13),

      new BackgroundObject("img/5_background/layers/air.png", 720 * 14),
      new BackgroundObject("img/5_background/layers/3_third_layer/full.png", 720 * 14),
      new BackgroundObject("img/5_background/layers/2_second_layer/full.png", 720 * 14),
      new BackgroundObject("img/5_background/layers/1_first_layer/full.png", 720 * 14),
    ]
  );
}

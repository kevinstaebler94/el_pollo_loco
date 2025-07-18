const level1 = new Level(
  [new Chicken(), new Chicken(), new Chicken(), new Endboss()],
  [new Cloud()],
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
  ]
);

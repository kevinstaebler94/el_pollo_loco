class ThrowableObject extends MoveableObject {
   speedY = 30;
   speedX = 20;
   isThrowable = true;
   throwIntervall = null;
   moveIntervall = null;
   splashIntervall = null;
   currentStatus = "throwing";
   // breakingBottleSound = new Audio("audio/breaking_glass.mp3");

   IMAGES_THROWING = [
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
      "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
      "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
      "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
   ];

   IMAGES_SPLASH = [
      "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
      "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
      "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
      "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
      "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
      "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
   ];

   constructor(x, y, soundManager) {
      super();
      this.soundManager = soundManager;
      this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
      this.loadImages(this.IMAGES_THROWING);
      this.loadImages(this.IMAGES_SPLASH);
      this.x = x;
      this.y = y;
      this.height = 60;
      this.width = 50;
      this.throw();
   }

   throw() {
      if (this.throwIntervall) clearInterval(this.throwIntervall);
      setInterval(() => {
         switch (this.currentStatus) {
            case "splash":
               this.playAnimation(this.IMAGES_SPLASH);
               break;
            case "throwing":
               this.playAnimation(this.IMAGES_THROWING);
               break;
         }
      }, 100);
      this.setThrowPhysics();
      this.startMoveLoop();
   }

   setThrowPhysics() {
      this.percentage -= 20;
      this.speedY = 10;
      this.speedX = 5;
      this.applyGravitiy();
   }

   startMoveLoop() {
      if (this.moveIntervall) clearInterval(this.moveIntervall);
      setInterval(() => {
         this.x += 10;
      }, 10);
   }

   startSplashAnimation() {
      this.playBreakingBottleSound();
      if (this.throwIntervall) clearInterval(this.throwIntervall);
      if (this.moveInterval) clearInterval(this.moveInterval);
      if (this.splashIntervall) clearInterval(this.splashIntervall);

      this.currentStatus = "splash";
      let i = 0;
      this.splashIntervall = setInterval(() => {
         this.img = this.imageCache[this.IMAGES_SPLASH[i]];
         i++;
         if (i >= this.IMAGES_SPLASH.length) {
            clearInterval(this.splashIntervall);
         }
      }, 100);
   }

   playBreakingBottleSound() {
      this.soundManager.play("breakingBottleSound", 0.2, false);
   }
}

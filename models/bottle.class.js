/**
 * Represents a collectible bottle object in the game.
 * @extends MoveableObject
 */
class Bottle extends MoveableObject {
   height = 60;
   width = 60;
   y = 370;
   x = 500;
   isThrowable = false;
   hasHit = false;

   /**
    * Creates a bottle object at a random horizontal position.
    * The bottle is positioned on the ground and can be collected by the player.
    */
   constructor() {
      super().loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
      this.x = this.x + Math.random() * 8000;
   }
}

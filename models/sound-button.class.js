/**
 * Represents a clickable sound button for toggling game audio on/off.
 * @extends DrawableObject
 */
class SoundButton extends DrawableObject {
   mute = "img/buttons/mute_button.svg";
   unmute = "img/buttons/unmute_button.svg";

   /**
    * Creates a sound button with mute/unmute icons.
    * Initializes with the current sound state (muted or unmuted).
    */
   constructor(soundManager) {
      super();
      this.soundManager = soundManager;
      this.loadImages([this.mute, this.unmute]);

      this.width = 45;
      this.height = 45;
      this.x = canvas.width - this.width - 15;
      this.y = 11;

      if (this.soundManager.soundsMuted) {
         this.img = this.imageCache[this.mute];
      } else {
         this.img = this.imageCache[this.unmute];
      }
   }

   /**
    * Toggles all game sounds on/off and updates the button icon accordingly.
    * Switches between mute and unmute icons based on current sound state.
    */
   toggleSound() {
      this.soundManager.toggleAllSounds();
      if (this.soundManager.soundsMuted) {
         this.img = this.imageCache[this.mute];
      } else {
         this.img = this.imageCache[this.unmute];
      }
   }
}

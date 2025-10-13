class SoundButton extends DrawableObject {
  mute = "img/buttons/mute_button.svg";
  unmute = "img/buttons/unmute_button.svg";

  constructor() {
    super();
    this.soundManager = soundManager;
    this.loadImages([this.mute, this.unmute]);
    this.img = this.imageCache[this.unmute];
    this.x = 650;
    this.y = 11;
    this.width = 45;
    this.height = 45;
  }

  toggleSound() {
    this.soundManager.toggleAllSounds();
    if (this.soundManager.soundsMuted) {
      this.img = this.imageCache[this.mute];
    } else {
      this.img = this.imageCache[this.unmute];
    }
  }
}

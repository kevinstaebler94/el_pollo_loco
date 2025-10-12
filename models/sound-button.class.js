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
    if (backgroundMusic.muted) {
      backgroundMusic.muted = false;
      this.img = this.imageCache[this.unmute];
    } else {
      backgroundMusic.muted = true;
      this.img = this.imageCache[this.mute];
    }
  }
}

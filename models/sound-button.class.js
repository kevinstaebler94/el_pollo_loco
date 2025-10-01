class SoundButton extends DrawableObject {
  mute = "img/buttons/volume_off.svg";
  unmute = "img/buttons/volume_up.svg";

  constructor() {
    super().loadImages([this.mute, this.unmute]);
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

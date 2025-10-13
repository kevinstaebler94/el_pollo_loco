class SoundManager {
  constructor() {
    this.backgroundMusic = new Audio("audio/mexica_background_music.mp3");
    this.wellDoneSound = new Audio("audio/well_done.wav");
    this.flawlessVictorySound = new Audio("audio/flawless_victory.wav");
    this.gameOverSound = new Audio("audio/game_over.wav");
    this.ouchSound = new Audio("audio/ouch_sound.mp3");
    this.snoringSound = new Audio("audio/snoring_sound.mp3");
    this.screamingSoundChicken = new Audio("audio/chicken_sound.wav");
    this.soundsMuted = localStorage.getItem("soundsMuted") === "true";
  }

  play(soundName, volume) {
    this[soundName].volume = volume;
    this[soundName].loop = false;
    this[soundName].play();
    return this[soundName];
  }

  stop(soundName) {
    this[soundName].pause();
    return this[soundName];
  }

  toggleAllSounds() {
    this.soundsMuted = !this.soundsMuted;
    localStorage.setItem("soundsMuted", this.soundsMuted);
    for (let key in this) {
      if (this[key] instanceof Audio) {
        this[key].muted = this.soundsMuted;
        if (this.soundsMuted) {
          this[key].pause();
          this[key].currentTime = 0;
        }
      }
    }
  }
}

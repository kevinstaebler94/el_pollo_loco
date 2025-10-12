class SoundManager {
  constructor() {
    this.wellDoneSound = new Audio("audio/well_done.wav");
    this.flawlessVictorySound = new Audio("audio/flawless_victory.wav");
    this.gameOverSound = new Audio("audio/game_over.wav");
    this.runningSound = new Audio("audio/running_on_sand.mp3");
    this.jumpingSound = new Audio("audio/jump.mp3");
    this.ouchSound = new Audio("audio/ouch_sound.mp3");
    this.snoringSound = new Audio("audio/snoring_sound.mp3");
    this.screamingSoundChicken = new Audio("audio/chicken_sound.wav");
  }

  play(soundName, volume) {
    this[soundName].play();
    this[soundName].volume = volume;
    this[soundName].loop = false;
    return this[soundName];
  }

  stop(soundName) {
    this[soundName].pause();
    return this[soundName];
  }

  stopAllSounds() {
    for (let key in this) {
      if (this[key] instanceof Audio) {
        this[key].pause();
        this[key].currentTime = 0;
      }
    }
  }
}

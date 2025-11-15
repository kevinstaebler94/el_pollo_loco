class SoundManager {
   constructor() {
      this.backgroundMusic = new Audio("audio/mexica_background_music.mp3");
      this.wellDoneSound = new Audio("audio/well_done.wav");
      this.flawlessVictorySound = new Audio("audio/flawless_victory.wav");
      this.gameOverSound = new Audio("audio/game_over.wav");
      this.ouchSound = new Audio("audio/ouch_sound.mp3");
      this.snoringSound = new Audio("audio/snoring_sound.mp3");
      this.screamingSoundChicken = new Audio("audio/chicken_sound.wav");
      this.endbossMusic = new Audio("audio/bossfight.mp3");
      this.screamingSound = new Audio("audio/endboss_screaming_sound.mp3");
      this.breakingBottleSound = new Audio("audio/breaking_glass.mp3");

      this.soundsMuted = localStorage.getItem("soundsMuted") === "true";
      this.currentMusic = null;

      if (localStorage.getItem("soundsMuted") === null) {
         localStorage.setItem("soundsMuted", "false");
      }

      if (this.soundsMuted) {
         for (let key in this) {
            if (this[key] instanceof Audio) {
               this[key].muted = true;
            }
         }
      }
   }

   play(soundName, volume, loop = false) {
      if (!this.soundsMuted && this[soundName]) {
         this[soundName].volume = volume;
         this[soundName].loop = loop;
         this[soundName].play();

         if (soundName === "backgroundMusic" || soundName === "endbossMusic") {
            this.currentMusic = soundName;
         }
      }
      return this[soundName];
   }

   stop(soundName) {
      if (this[soundName]) {
         this[soundName].pause();
         this[soundName].currentTime = 0;

         if (soundName === this.currentMusic) {
            this.currentMusic = null;
         }
      }
      return this[soundName];
   }

   toggleAllSounds() {
      this.soundsMuted = !this.soundsMuted;
      localStorage.setItem("soundsMuted", this.soundsMuted.toString());

      for (let key in this) {
         if (this[key] instanceof Audio) {
            this[key].muted = this.soundsMuted;

            if (this.soundsMuted) {
               this[key].pause();
            }
         }
      }

      if (!this.soundsMuted) {
         if (this.currentMusic === "endbossMusic") {
            this.play("endbossMusic", 0.2, true);
         } else if (this.currentMusic === "backgroundMusic") {
            this.play("backgroundMusic", 0.15, true);
         } else {
            this.play("backgroundMusic", 0.15, true);
         }
      }
   }
}

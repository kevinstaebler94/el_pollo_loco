/**
 * Manages all game audio including background music, sound effects, and mute state.
 * Handles audio playback, volume control, and persists mute settings in localStorage.
 */
class SoundManager {
   /**
    * Creates a sound manager and initializes all audio assets.
    * Loads mute state from localStorage and applies it to all audio elements.
    */
   constructor() {
      this.backgroundMusic = new Audio("audio/mexica_background_music.mp3");
      this.wellDoneSound = new Audio("audio/well_done.wav");
      this.flawlessVictorySound = new Audio("audio/flawless_victory.wav");
      this.gameOverSound = new Audio("audio/game_over.wav");
      this.ouchSound = new Audio("audio/ouch_sound.mp3");
      this.snoringSound = new Audio("audio/snoring_sound.mp3");
      this.screamingSoundChicken = new Audio("audio/chicken_sound.wav");
      this.endbossMusic = new Audio("audio/bossfight.mp3");
      this.endbossScreamingSound = new Audio("audio/endboss_screaming_sound.mp3");
      this.breakingBottleSound = new Audio("audio/breaking_glass.mp3");
      this.collectSound = new Audio("audio/collect_coin.mp3");

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

   /**
    * Plays a specific sound or music track.
    * @param {string} soundName - Name of the sound property to play.
    * @param {number} volume - Volume level (0.0 to 1.0).
    * @param {boolean} [loop=false] - Whether the sound should loop continuously.
    * @returns {Audio|undefined} The audio element being played, or undefined if sound doesn't exist.
    */
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

   /**
    * Stops a specific sound and resets its playback position.
    * @param {string} soundName - Name of the sound property to stop.
    * @returns {Audio|undefined} The audio element being stopped, or undefined if sound doesn't exist.
    */
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

   /**
    * Toggles all game sounds on/off and persists the state in localStorage.
    * When unmuting, automatically resumes the last playing background music.
    */
   toggleAllSounds() {
      this.soundsMuted = !this.soundsMuted;
      localStorage.setItem("soundsMuted", this.soundsMuted.toString());

      this.muteAllAudio();

      if (!this.soundsMuted) {
         this.resumeMusic();
      }
   }

   /**
    * Mutes or pauses all audio elements based on current mute state.
    */
   muteAllAudio() {
      for (let key in this) {
         if (this[key] instanceof Audio) {
            this[key].muted = this.soundsMuted;
            if (this.soundsMuted) {
               this[key].pause();
            }
         }
      }
   }

   /**
    * Resumes the last playing music track after unmuting.
    */
   resumeMusic() {
      if (this.currentMusic === "endbossMusic") {
         this.play("endbossMusic", 0.2, true);
      } else if (this.currentMusic === "backgroundMusic") {
         this.play("backgroundMusic", 0.15, true);
      } else {
         this.play("backgroundMusic", 0.15, true);
      }
   }

   /**
    * Stops all background music and boss music.
    */
   stopBackgroundMusic() {
      this.stop("endbossMusic");
      this.stop("backgroundMusic");
   }

   /**
    * Gradually fades out audio volume and executes callback when complete.
    * @param {Audio} audio - The audio element to fade out.
    * @param {Function} callback - Function to execute after fade out completes.
    */
   fadeOutMusic(audio, callback) {
      let fadeOutInterval = setInterval(() => {
         if (audio.volume > 0.05) {
            audio.volume -= 0.05;
         } else {
            audio.volume = 0;
            audio.pause();
            clearInterval(fadeOutInterval);
            if (callback) callback();
         }
      }, 100);
   }
}

/**
 * Represents the keyboard input state for game controls.
 * Tracks whether each control key is currently pressed.
 */
class Keyboard {
   /** @type {boolean} - True when left arrow key is pressed */
   LEFT = false;

   /** @type {boolean} - True when right arrow key is pressed */
   RIGHT = false;

   /** @type {boolean} - True when up arrow key is pressed */
   UP = false;

   /** @type {boolean} - True when down arrow key is pressed */
   DOWN = false;

   /** @type {boolean} - True when space bar is pressed (jump) */
   SPACE = false;

   /** @type {boolean} - True when D key is pressed (throw) */
   D = false;
}

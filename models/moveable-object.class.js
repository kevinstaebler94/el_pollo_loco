class MoveableObject {
  x = 120;
  y = 285;
  img;

  //loadImage("img/test.png");
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {}
}

class CollectableObject extends MoveableObject {
  collected = false;

  collect() {
    this.collected = true;
  }
}

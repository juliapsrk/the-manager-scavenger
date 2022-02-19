class Enemy {
  constructor(gameInstance, x, y, speed) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 50;
    this.height = 50;
  }

  checkIntersection(element) {
    return (
      // is right edge of player in front of left edge of enemey
      element.x + element.width > this.x &&
      // is left edge of player before right edge of enemey
      element.x < this.x + this.width &&
      // is bottom edge of player below of top edge of enemey
      element.y + element.height > this.y &&
      // is top edge of player above bottom edge of enemey
      element.y < this.y + this.height
    );
  }

  runLogic() {
    this.x -= this.speed;
    // different moving behavior
    // remove x and y simultaneously
    // Math.sin()
    // this.x -= Math.sin(this.speed) (maybe?)
    // ask Martin
  }

  draw() {
    this.game.context.save();
    this.game.context.fillStyle = 'black';
    this.game.context.fillRect(this.x, this.y, this.width, this.height);
    this.game.context.restore();
  }
}

const strikeImage = new Image();
strikeImage.src = '/images/strike1.png';

class Strike {
  constructor(gameInstance, x, y) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 25;
  }

  runLogic() {
    this.x += 1;
  }

  draw() {
    this.game.context.save();
    this.game.context.drawImage(
      strikeImage,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.game.context.restore();
  }
}

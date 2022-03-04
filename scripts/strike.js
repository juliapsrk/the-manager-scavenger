const strikeImage = new Image();
strikeImage.src = '/images/strike.png';

class Strike {
  constructor(gameInstance, x, y) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 18;
  }

  runLogic() {
    this.x += 2;
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

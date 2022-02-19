class Strike {
  constructor(gameInstance, x, y) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
  }

  runLogic() {
    this.x += 1;
  }

  draw() {
    this.game.context.save();
    this.game.context.fillStyle = 'blue';
    this.game.context.fillRect(this.x, this.y, this.width, this.height);
    this.game.context.restore();
  }
}

class Player {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.x = 100;
    this.y = 200;
    this.width = 40;
    this.height = 40;
  }

  draw() {
    this.game.context.save();
    this.game.context.fillStyle = 'rgb(240, 20, 185)';
    this.game.context.fillRect(this.x, this.y, this.width, this.height);
    this.game.context.restore();
  }
}

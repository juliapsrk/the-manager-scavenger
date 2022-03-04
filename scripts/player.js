const playerImage = new Image();
playerImage.src = '/images/player.png';

class Player {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.x = 100;
    this.y = 200;
    this.width = 35;
    this.height = 40;
    this.frame = 1;
  }

  draw() {
    this.frame++;
    this.game.context.save();
    // this.game.context.fillStyle = 'rgb(240, 20, 185)';
    // this.game.context.fillRect(this.x, this.y, this.width, this.height);
    this.game.context.drawImage(
      playerImage,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.game.context.restore();
  }
}

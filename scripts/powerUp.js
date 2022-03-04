const powerUp = new Image();
powerUp.src = '/images/powerUp.png';

class PowerUp {
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
      // is right edge of player in front of left edge of powerUp
      element.x + element.width > this.x &&
      // is left edge of player before right edge of powerUp
      element.x < this.x + this.width &&
      // is bottom edge of player below of top edge of powerUp
      element.y + element.height > this.y &&
      // is top edge of player above bottom edge of powerUp
      element.y < this.y + this.height
    );
  }

  runLogic() {
    this.x -= this.speed;
    this.y = Clamp(this.y, 10, 440);
  }

  draw() {
    this.game.context.save();
    this.game.context.drawImage(
      powerUp,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.game.context.restore();
  }
}

function Clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

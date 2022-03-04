const strikePack = new Image();
strikePack.src = '/images/strikePack.png';

class StrikePack {
  constructor(gameInstance, x, y, speed) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 45;
    this.height = 50;
  }

  checkIntersection(element) {
    return (
      // is right edge of player in front of left edge of strikePack
      element.x + element.width > this.x &&
      // is left edge of player before right edge of strikePack
      element.x < this.x + this.width &&
      // is bottom edge of player below of top edge of strikePack
      element.y + element.height > this.y &&
      // is top edge of player above bottom edge of strikePack
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
      strikePack,
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

const bossAttack = new Image();
bossAttack.src = '/images/bossAttack2.png';

class BossAttack {
  constructor(gameInstance, x, y) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
  }

  checkIntersection(element) {
    return (
      // is right edge of player in front of left edge of attack
      element.x + element.width > this.x &&
      // is left edge of player before right edge of attack
      element.x < this.x + this.width &&
      // is bottom edge of player below of top edge of attack
      element.y + element.height > this.y &&
      // is top edge of player above bottom edge of attack
      element.y < this.y + this.height
    );
  }

  runLogic() {
    this.x -= 3;
  }

  draw() {
    this.game.context.save();
    this.game.context.drawImage(
      bossAttack,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.game.context.restore();
  }
}

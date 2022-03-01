const basicEnemy = new Image();
basicEnemy.src = '/images/enemy-email.png';
const mediumEnemy = new Image();
mediumEnemy.src = '/images/enemy-meeting.png';
const advancedEnemy = new Image();
advancedEnemy.src = '/images/enemy-boss.png';

// const enemyConfigurations = [
//    { speed: 5, points: 5, image: basicEnemy },
//    { speed: 3, points: 10, image: mediumEnemy },
//    { speed: 3, points: 15, image: advancedEnemy },
// ]

class Enemy {
  constructor(gameInstance, x, y, speed /*points, image*/) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 45;
    this.height = 30;
    // // not yet used:
    // this.points = points;
    // this.image = image;
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
    // this.game.context.fillStyle = 'black';
    // this.game.context.fillRect(this.x, this.y, this.width, this.height);
    this.game.context.drawImage(
      // work out image change due to random enemy:
      basicEnemy,
      // this.image,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.game.context.restore();
  }
}

const basicEnemy = new Image();
basicEnemy.src = '/images/enemy-email.png';
const mediumEnemy = new Image();
mediumEnemy.src = '/images/enemy-meeting.png';
const advancedEnemy = new Image();
advancedEnemy.src = '/images/enemy-boss.png';

class Enemy {
  constructor(gameInstance, x, y, speed, points, image) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.angle = Math.PI / 360; // 1 degrees
    this.width = 45;
    this.height = 30;
    this.speed = speed;
    this.points = points;
    this.image = image;
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
    // console.log('draw this.y:' + this.y);
  }
}

const enemyConfigurations = [
  { speed: 5, points: 5, image: basicEnemy },
  { speed: 3, points: 10, image: mediumEnemy },
  { speed: 1, points: 15, image: advancedEnemy }
];

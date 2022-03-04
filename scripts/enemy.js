const basicEnemy = new Image();
basicEnemy.src = '/images/enemy-email.png';
const mediumEnemy = new Image();
mediumEnemy.src = '/images/enemy-meeting.png';
const advancedEnemy = new Image();
advancedEnemy.src = '/images/enemy-boss.png';

class Enemy {
  constructor(
    gameInstance,
    x,
    y,
    speed,
    points,
    image,
    startingY,
    width,
    height,
    maxAmplitude,
    health,
    typeOfEnemy,
    shots
  ) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.startingY = startingY;
    this.angle = Math.PI / 360; // 1 degrees
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.points = points;
    this.image = image;
    this.health = health;
    this.angle = 0;
    this.maxAmplitude = maxAmplitude;
    this.typeOfEnemy = typeOfEnemy;
    this.shots = shots;
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
    // wave movement:
    this.angle++;
    // wave movement: this.height/2 --> amplitude
    this.y =
      this.maxAmplitude * Math.sin(this.angle * (Math.PI / 180)) +
      this.startingY;
    this.y = Clamp(this.y, 10, 440);
  }

  draw() {
    this.game.context.save();
    // this.game.context.fillStyle = 'black';
    // this.game.context.fillRect(this.x, this.y, this.width, this.height);
    this.game.context.drawImage(
      // work out image change due to random enemy:
      this.image,
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

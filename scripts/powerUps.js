// class PowerUp {
//   constructor(gameInstance, x, y, speed, radius, color) {
//     this.game = gameInstance;
//     this.x = x;
//     this.y = y;
//     this.speed = speed;
//     this.radius = radius;
//     this.color = color;
//   }

//   runLogic() {
//     this.x += 1;
//   }

//   draw() {
//     this.game.context.save();
//     this.game.context.fillStyle = 'pink';
//     this.game.context.fillRect(this.x, this.y, this.width, this.height);
//     this.game.context.drawImage(
//       strikeImage,
//       this.x,
//       this.y,
//       this.width,
//       this.height
//     );
//     this.game.context.restore();
//   }
// }

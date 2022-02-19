// // For different kinds of enemies chosen at random

// class Enemy {
//     constructor (game, x, y, speed, points, image) {
//         this.game = game;
//         /*...*/
//     }
//     draw () {
//         this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
//     }
// }
// const basicEnemyImage = new Image();
// basicEnemyImage.src = ‘’;
// const advancedEnemyImage = new Image();
// advancedEnemyImage.src = ‘’;
// const enemyConfigurations = [
//     { speed: 3, points: 1, image: basicEnemyImage },
//     { speed: 1, points: 5, image: advancedEnemyImage },
// ]
// class Game {
//     addRandomEnemy () {
//       const enemyConfiguration = enemyConfigurations[Math.floor(Math.random() * enemyConfigurations.length)];
//         this.enemies.push(new Enemy(this, x, y, enemyConfiguration.speed, enemyConfiguration.points, enemyConfiguration.image));
//     }
// }

// or by extending class and creating multiple ones
// class enemy (basic class)
// class boss
// class email
// class zoom

// sound code

class Game {
  constructor(canvasElement, screens) {
    this.canvas = canvasElement;
    this.context = canvasElement.getContext('2d');
    this.screens = screens;
    this.running = false;
    this.enableControls();
    this.pause();
  }

  start() {
    this.running = true;
    this.score = 100;
    this.player = new Player(this);
    this.enemies = [];
    this.strikes = [];
    this.strikeCount = 30;
    this.packs = [];

    this.displayScreen('play');
    this.loop();
  }

  displayScreen(name) {
    for (let screenName in this.screens) {
      this.screens[screenName].style.display = 'none';
    }
    this.screens[name].style.display = '';
  }

  lose() {
    this.running = false;
    this.displayScreen('end');
  }

  pause() {
    this.running = false;
  }

  play() {
    this.running = true;
    this.loop();
  }

  enableControls() {
    window.addEventListener('keydown', (event) => {
      if (this.running) {
        // stops page from scrolling:
        const code = event.code;
        switch (code) {
          case 'ArrowUp':
            if (this.player.y < 10) {
              return 0;
            } else {
              this.player.y -= 10;
            }
            event.preventDefault();
            break;
          case 'ArrowDown':
            if (this.player.y > 440) {
              return 0;
            } else {
              this.player.y += 10;
            }
            event.preventDefault();
            break;
          case 'ArrowLeft':
            if (this.player.x < -5) {
              return 0;
            } else {
              this.player.x -= 10;
            }
            event.preventDefault();
            break;
          case 'ArrowRight':
            if (this.player.x > 640) {
              return 0;
            } else {
              this.player.x += 10;
            }
            event.preventDefault();
            break;
          case 'Space':
            if (this.strikeCount > 0) {
              event.preventDefault();
              this.fireStrike();
              this.strikeCount -= 1;
            }
            break;
        }
      }
    });
  }

  fireStrike() {
    const strike = new Strike(
      this,
      this.player.x + this.player.width - 5,
      this.player.y + this.player.height / 2 - 10 / 2
    );
    this.strikes.push(strike);
  }

  generateEnemy() {
    const enemySpeed = Math.random() + 0.5;
    const enemyX = this.canvas.width;
    const enemyY = Math.random() * this.canvas.height - 40; // 30 = height of enemy
    // this.enemy.angle++;
    // const enemyY =
    //   enemy.y * Math.sin(enemy.angle * enemy.speed * (Math.PI / 180));
    const enemy = new Enemy(this, enemyX, enemyY, enemySpeed);
    this.enemies.push(enemy);
  }

  generatePack() {
    const packSpeed = Math.random() + 0.05;
    const packX = this.canvas.width;
    const packY = Math.random() * this.canvas.height - 40; // 30 = height of enemy
    const pack = new StrikePack(this, packX, packY, packSpeed);
    this.packs.push(pack);
  }

  //     addRandomEnemy () {
  //       const enemyConfiguration = enemyConfigurations[Math.floor(Math.random() * enemyConfigurations.length)];
  //         this.enemies.push(new Enemy(this, x, y, enemyConfiguration.speed, enemyConfiguration.points, enemyConfiguration.image));
  //     }

  loop() {
    window.requestAnimationFrame(() => {
      this.runLogic();
      this.draw();
      if (this.running) {
        this.loop();
      }
    });
  }

  runLogic() {
    if (Math.random() < 0.01) {
      this.generateEnemy();
    }
    if (Math.random() < 0.0025) {
      this.generatePack();
    }
    for (const enemy of this.enemies) {
      this.runEnemyLogic(enemy);
    }
    for (const strike of this.strikes) {
      this.runStrikeLogic(strike);
    }
    for (const pack of this.packs) {
      this.runPackLogic(pack);
    }
    if (this.score <= 0) {
      this.lose();
    }
  }

  runEnemyLogic(enemy) {
    enemy.runLogic();
    // if enemy and player are intersecting, remove enemy from array of enemies
    const enemyAndPlayerIntersecting = enemy.checkIntersection(this.player);
    const enemyOutOfBounds = enemy.x + enemy.width < 0;
    if (enemyAndPlayerIntersecting || enemyOutOfBounds) {
      const indexOfEnemy = this.enemies.indexOf(enemy);
      this.enemies.splice(indexOfEnemy, 1);
      this.score -= 10;
    }
  }

  runStrikeLogic(strike) {
    strike.runLogic();
    for (const enemy of this.enemies) {
      // if enemy and strike are intersecting,
      // remove enemy from array of enemies and remove strike from array of strikes
      const strikeAndEnemyIntersecting = enemy.checkIntersection(strike);
      if (strikeAndEnemyIntersecting) {
        const indexOfEnemy = this.enemies.indexOf(enemy);
        this.enemies.splice(indexOfEnemy, 1);
        const indexOfStrike = this.strikes.indexOf(strike);
        this.strikes.splice(indexOfStrike, 1);
        this.score += 5;
      }
    }
    if (strike.x - strike.width > this.canvas.width) {
      const indexOfStrike = this.strikes.indexOf(strike);
      this.strikes.splice(indexOfStrike, 1);
    }
  }

  runPackLogic(pack) {
    pack.runLogic();
    // if pack and player are intersecting, add 20 to array of strikes
    const packAndPlayerIntersecting = pack.checkIntersection(this.player);
    if (packAndPlayerIntersecting) {
      const indexOfPack = this.packs.indexOf(pack);
      this.packs.splice(indexOfPack, 1);
      this.strikeCount += 20;
    }
  }

  drawScore() {
    this.context.font = '20px Gill Sans';
    this.context.fillText(`Score: ${this.score}`, 595, 490);
  }

  drawStrike() {
    this.context.font = '20px Gill Sans';
    this.context.fillText(`Strikes: ${this.strikeCount}`, 450, 490);
  }

  draw() {
    this.context.clearRect(0, 0, 700, 500);
    for (const enemy of this.enemies) {
      enemy.draw();
    }
    for (const strike of this.strikes) {
      strike.draw();
    }
    for (const pack of this.packs) {
      pack.draw();
    }
    // for (const powerUp of this.powerUps) {
    //   powerUp.draw();
    // }
    this.player.draw();
    this.drawScore();
    this.drawStrike();
  }
}

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
            event.preventDefault();
            this.player.y -= 10;
            break;
          case 'ArrowDown':
            event.preventDefault();
            this.player.y += 10;
            break;
          case 'ArrowLeft':
            event.preventDefault();
            this.player.x -= 10;
            break;
          case 'ArrowRight':
            event.preventDefault();
            this.player.x += 10;
            break;
          case 'Space':
            event.preventDefault();
            this.fireStrike();
            break;
        }
      }
    });
  }

  fireStrike() {
    // something wrong here
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
    const enemyY = Math.random() * this.canvas.height - 30; // 30 = height of enemy
    const enemy = new Enemy(this, enemyX, enemyY, enemySpeed);
    this.enemies.push(enemy);
  }

  // powerUp() {
  //   const powerUpSpeed = Math.random() + 0.75;
  //   const powerUpX = this.canvas.width;
  //   const powerUpY = Math.random() * this.canvas.height - 30; // 30 = height of enemy
  //   const powerUp = new PowerUp(
  //     this,
  //     powerUpX,
  //     powerUpY,
  //     powerUpSpeed,
  //     40,
  //     'pink'
  //   );
  //   this.powerUps.push(powerUp);
  // }

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
    for (const enemy of this.enemies) {
      this.runEnemyLogic(enemy);
    }
    for (const strike of this.strikes) {
      this.runStrikeLogic(strike);
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
      const spellAndEnemyIntersecting = enemy.checkIntersection(strike);
      if (spellAndEnemyIntersecting) {
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

  drawScore() {
    this.context.font = '25px Gill Sans';
    this.context.fillText(`Score: ${this.score}`, 565, 485);
  }

  draw() {
    this.context.clearRect(0, 0, 700, 500);
    for (const enemy of this.enemies) {
      enemy.draw();
    }
    for (const strike of this.strikes) {
      strike.draw();
    }
    // for (const powerUp of this.powerUps) {
    //   powerUp.draw();
    // }
    this.player.draw();
    this.drawScore();
  }
}

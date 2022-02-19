class Game {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.context = canvasElement.getContext('2d');

    this.score = 100;
    this.player = new Player(this);
    this.enemies = [];
    this.strikes = [];
    this.enableControls();
  }

  enableControls() {
    window.addEventListener('keydown', (event) => {
      const code = event.code;
      switch (code) {
        case 'ArrowUp':
          this.player.y -= 10;
          break;
        case 'ArrowDown':
          this.player.y += 10;
          break;
        case 'ArrowLeft':
          this.player.x -= 10;
          break;
        case 'ArrowRight':
          this.player.x += 10;
          break;
        case 'Space':
          this.fireStrike();
          break;
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
    const enemyY = Math.random() * this.canvas.height - 50; // 50 = height of enemy
    const enemy = new Enemy(this, 700, enemyY, enemySpeed);
    this.enemies.push(enemy);
  }

  loop() {
    window.requestAnimationFrame(() => {
      this.runLogic();
      this.draw();
      this.loop();
    });
  }

  runLogic() {
    if (Math.random() < 0.01) {
      this.generateEnemy();
    }
    for (const enemy of this.enemies) {
      enemy.runLogic();
      // if enemy and player are intersecting,
      // remove enemy from array of enemies
      const enemyAndPlayerIntersecting = enemy.checkIntersection(this.player);
      const enemyOutOfBounds = enemy.x + enemy.width < 0;
      if (enemyAndPlayerIntersecting || enemyOutOfBounds) {
        const indexOfEnemy = this.enemies.indexOf(enemy);
        this.enemies.splice(indexOfEnemy, 1);
        this.score -= 10;
      }
    }
    for (const strike of this.strikes) {
      strike.runLogic();
      for (const enemy of this.enemies) {
        // if enemy and strike are intersecting,
        // remove enemy from array of enemies
        // remove strike from array of strikes
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
  }

  drawScore() {
    this.context.font = '30px Segoe UI';
    this.context.fillText(`Score: ${this.score}`, 550, 480);
  }

  draw() {
    this.context.clearRect(0, 0, 700, 500);
    for (const enemy of this.enemies) {
      enemy.draw();
    }
    for (const strike of this.strikes) {
      strike.draw();
    }
    this.player.draw();
    this.drawScore();
  }
}

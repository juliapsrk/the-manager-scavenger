const enemyBumpSound = new Audio();
enemyBumpSound.src = '/sounds/enemyBump.wav';
const attackSound = new Audio();
attackSound.src = '/sounds/attack.wav';

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
    this.attacks = [];
    this.strikes = [];
    this.strikeCount = 25;
    this.packs = [];
    this.powerUps = [];
    this.difficulty = 0;
    this.kills = 0;

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
    this.killsText = this.screens['end'].querySelector('h3 > span');
    this.killsText.innerText = this.kills;
  }

  // generateKill() {
  //   const totalKills = document.querySelector('#totalKills span');

  //   let total = 0;
  //   [...kills].forEach((kill) => this.kills.push(kill));

  //   total.innerText = totalKills;
  // }

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
              this.player.y -= 20;
            }
            event.preventDefault();
            break;
          case 'ArrowDown':
            if (this.player.y > 440) {
              return 0;
            } else {
              this.player.y += 20;
            }
            event.preventDefault();
            break;
          case 'ArrowLeft':
            if (this.player.x < -5) {
              return 0;
            } else {
              this.player.x -= 20;
            }
            event.preventDefault();
            break;
          case 'ArrowRight':
            if (this.player.x > 640) {
              return 0;
            } else {
              this.player.x += 20;
            }
            event.preventDefault();
            break;
          case 'Space':
            if (this.strikeCount > 0) {
              event.preventDefault();
              this.generateFireStrike();
              this.strikeCount -= 1;
            }
            break;
        }
      }
    });
  }

  generateFireStrike() {
    const strike = new Strike(
      this,
      this.player.x + this.player.width - 5,
      this.player.y + this.player.height / 2 - 13
    );
    this.strikes.push(strike);
  }

  generateBossAttack(enemy) {
    const attack = new BossAttack(
      this,
      enemy.x + enemy.width / 2,
      enemy.y + enemy.height
    );
    this.attacks.push(attack);
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  generateEnemy(dif) {
    // (or instead of 'dif' write '3')
    // const enemySpeed = Math.random() + 0.5;
    const enemyX = this.canvas.width;
    const enemyY = Math.random() * 490;
    const randomEnemy = Math.floor(Math.random() * dif); // (or instead of 'dif' write '3')
    const enemyConfigurations = [
      {
        speed: 1,
        points: 10,
        image: basicEnemy,
        width: 45,
        height: 30,
        health: 5,
        typeOfEnemy: 'basicEnemy',
        shots: 0
      },
      {
        speed: 2,
        points: 20,
        image: mediumEnemy,
        width: 50,
        height: 45,
        health: 5,
        typeOfEnemy: 'mediumEnemy',
        shots: 0
      },
      {
        speed: 0.5,
        points: 50,
        image: advancedEnemy,
        width: 80,
        height: 85,
        health: 15,
        typeOfEnemy: 'advancedEnemy',
        shots: 5
      }
    ];

    const randomAmplitude = this.getRandomArbitrary(15, 90);

    const enemy = new Enemy(
      this,
      enemyX,
      enemyY,
      enemyConfigurations[dif].speed,
      enemyConfigurations[dif].points,
      enemyConfigurations[dif].image,
      enemyY,
      enemyConfigurations[dif].width,
      enemyConfigurations[dif].height,
      randomAmplitude,
      enemyConfigurations[dif].health,
      enemyConfigurations[dif].typeOfEnemy,
      enemyConfigurations[dif].shots
    );
    this.enemies.push(enemy);
  }

  generatePack() {
    const packSpeed = Math.random() + 0.75;
    const packX = this.canvas.width;
    const packY = Math.random() * 490;
    const pack = new StrikePack(this, packX, packY, packSpeed);
    this.packs.push(pack);
  }

  generatePowerUp() {
    const powerUpSpeed = Math.random() + 1;
    const powerUpX = this.canvas.width;
    const powerUpY = Math.random() * 490;
    const powerUp = new PowerUp(this, powerUpX, powerUpY, powerUpSpeed);
    this.powerUps.push(powerUp);
  }

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
    if (this.score < 100) {
      this.difficulty = 1;
    } else if (this.score >= 115 && this.score < 120) {
      this.difficulty = 2;
    } else if (this.score >= 120) {
      this.difficulty = 3;
    }

    if (Math.random() < 0.01 && this.enemies.length < 5) {
      if (this.difficulty === 1) this.generateEnemy(Math.floor(Math.random()));
      else if (this.difficulty === 2)
        this.generateEnemy(Math.floor(Math.random() * 2));
      else if (this.difficulty === 3)
        this.generateEnemy(Math.floor(Math.random() * 3));
    }
    if (Math.random() < 0.0025 && this.packs.length < 3) {
      this.generatePack();
    }
    if (Math.random() < 0.0025 && this.powerUps.length < 1) {
      this.generatePowerUp();
    }
    this.enemies.forEach((enemy) => {
      if (enemy.typeOfEnemy === 'advancedEnemy') {
        if (Math.random() < 0.01 && enemy.shots >= 1) {
          this.generateBossAttack(enemy);
          enemy.shots--;
        }
      }
    });

    for (const enemy of this.enemies) {
      this.runEnemyLogic(enemy);
    }
    for (const strike of this.strikes) {
      this.runStrikeLogic(strike);
    }
    for (const attack of this.attacks) {
      this.runBossAttackLogic(attack);
    }
    for (const pack of this.packs) {
      this.runPackLogic(pack);
    }
    for (const powerUp of this.powerUps) {
      this.runPowerUpLogic(powerUp);
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
    if (enemyAndPlayerIntersecting) {
      enemyBumpSound.play();
    }
    if (enemyAndPlayerIntersecting || enemyOutOfBounds) {
      const indexOfEnemy = this.enemies.indexOf(enemy);
      this.score -= enemy.points;
      this.enemies.splice(indexOfEnemy, 1);
    }
  }

  runStrikeLogic(strike) {
    strike.runLogic();
    for (const enemy of this.enemies) {
      // if enemy and strike are intersecting,
      // remove enemy from array of enemies and remove strike from array of strikes
      const strikeAndEnemyIntersecting = enemy.checkIntersection(strike);
      if (strikeAndEnemyIntersecting) {
        // const indexOfEnemy = this.enemies.indexOf(enemy);
        // this.enemies.splice(indexOfEnemy, 1);
        const indexOfStrike = this.strikes.indexOf(strike);
        this.strikes.splice(indexOfStrike, 1);
        this.score += 5;
        if (
          enemy.typeOfEnemy === 'basicEnemy' ||
          enemy.typeOfEnemy === 'mediumEnemy'
        ) {
          const indexOfEnemy = this.enemies.indexOf(enemy);
          this.enemies.splice(indexOfEnemy, 1);
          this.kills++;
          console.log(`Kills: ${this.kills}`);
        } else {
          if (enemy.health <= 0) {
            const indexOfEnemy = this.enemies.indexOf(enemy);
            this.enemies.splice(indexOfEnemy, 1);
            this.kills++;
            console.log(`Kills: ${this.kills}`);
          } else {
            enemy.health -= 5;
          }
        }
      }
    }
    if (strike.x - strike.width > this.canvas.width) {
      const indexOfStrike = this.strikes.indexOf(strike);
      this.strikes.splice(indexOfStrike, 1);
    }
  }

  runBossAttackLogic(attack) {
    attack.runLogic();
    // if player and attack are intersecting,
    // remove attack from array of attacks
    const attackAndPlayerIntersecting = attack.checkIntersection(this.player);
    if (attackAndPlayerIntersecting) {
      const indexOfAttack = this.attacks.indexOf(attack);
      this.attacks.splice(indexOfAttack, 1);
      this.score -= 30;
      attackSound.play();
    }
    if (attack.x - attack.width > this.canvas.width) {
      const indexOfAttack = this.attacks.indexOf(attack);
      this.attacks.splice(indexOfAttack, 1);
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

  runPowerUpLogic(powerUp) {
    powerUp.runLogic();
    // if powerUp and player are intersecting, add 25 to score
    const powerUpAndPlayerIntersecting = powerUp.checkIntersection(this.player);
    if (powerUpAndPlayerIntersecting) {
      const indexOfPowerUp = this.powerUps.indexOf(powerUp);
      this.powerUps.splice(indexOfPowerUp, 1);
      this.score += 25;
    }
  }

  drawStrike() {
    this.context.font = '20px Gill Sans';
    this.context.fillText(`Strikes: ${this.strikeCount}`, 600, 490);
  }

  drawScore() {
    this.context.font = '20px Gill Sans';
    this.context.fillText(`Score: ${this.score}`, 315, 490);
  }

  drawLevel() {
    this.context.font = '20px Gill Sans';
    this.context.fillText(`Level: ${this.difficulty}`, 15, 490);
  }

  draw() {
    this.context.clearRect(0, 0, 700, 500);
    for (const enemy of this.enemies) {
      enemy.draw();
    }
    for (const strike of this.strikes) {
      strike.draw();
    }
    for (const attack of this.attacks) {
      attack.draw();
    }
    for (const pack of this.packs) {
      pack.draw();
    }
    for (const powerUp of this.powerUps) {
      powerUp.draw();
    }
    this.player.draw();
    this.drawStrike();
    this.drawScore();
    this.drawLevel();
  }
}

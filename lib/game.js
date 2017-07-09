import Ball from './ball';
import Paddle from './paddle';

class Game {
  constructor() {
    this.paddle = new Paddle();
    this.balls = [new Ball()];
    this.counter = 260;
    this.difficulty = 0;
    this.lives = 3;
    this.score = 0;
    this.streak = 0;

    this.addBall = this.addBall.bind(this);
    this.increaseDifficulty = this.increaseDifficulty.bind(this);
    this.drawLives = this.drawLives.bind(this);
    this.drawScore = this.drawScore.bind(this);
  }

  addBall() {
    let i = Math.ceil(Math.random() * 2);

    for (let j = 0; j < i; j++) {
      this.balls.push(new Ball());
    }
  }

  checkCollision() {
    this.balls.forEach(ball => {
      if (ball.isCollidedWith(this.paddle)) {
        ball.bounce();
        this.score++;
      }
    });
  }

  endGame() {
    if (this.lives === 0) {

    }
  }

  increaseDifficulty() {
    if (this.counter > 0) {
      this.counter--;
    } else if (this.counter === 0) {
      if (this.difficulty < 8) this.difficulty++;
      this.addBall();

      switch (this.difficulty) {
        case 1:
        case 2:
          this.counter = Math.floor(Math.random() * (260 - 250) + 250);
          break;
        case 3:
        case 4:
          this.counter = Math.floor(Math.random() * (249 - 200) + 200);
          break;
        case 5:
        case 6:
          this.counter = Math.floor(Math.random() * (249 - 200) + 200);
          break;
        case 7:
        case 8:
          this.counter = Math.floor(Math.random() * (199 - 180) + 180);
          break;
        case 9:
        case 10:
          this.counter = 149;
          break;
      }
    }
  }

  drawLives(ctx) {
    const lifeRadius = 8;

    ctx.fillStyle = "#36454F";
    ctx.beginPath();

    switch (this.lives) {
      case 1:
        ctx.arc(
          575, 25, lifeRadius, 0, 2 * Math.PI, true
        );
        break;
      case 2:
        ctx.arc(
          575, 25, lifeRadius, 0, 2 * Math.PI, true
        );
        ctx.arc(
          550, 25, lifeRadius, 0, 2 * Math.PI, true
        );
        break;
      case 3:
        ctx.arc(
          575, 25, lifeRadius, 0, 2 * Math.PI, true
        );
        ctx.arc(
          550, 25, lifeRadius, 0, 2 * Math.PI, true
        );
        ctx.arc(
          525, 25, lifeRadius, 0, 2 * Math.PI, true
        );
        break;
    }

    ctx.fill();
  }

  drawScore(ctx) {
    ctx.font = '50px Parisienne';
    ctx.textAlign = "center";
    ctx.fillStyle = "#36454F";
    ctx.fillText("Bounce", 300, 100);
    ctx.font = '42px Parisienne';
    ctx.fillText(this.score, 300, 160);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.WIDTH, Game.HEIGHT);

    this.paddle.draw(ctx);
    this.balls.forEach(ball => ball.draw(ctx));
    this.drawLives(ctx);
    this.drawScore(ctx);
  }

  step() {
    let droppedBalls = [];

    this.balls.forEach((ball, i) => {
      ball.move();
      if (ball.dropped()) droppedBalls.push(i);
    });

    droppedBalls.forEach(i => {
      this.balls.splice(i, 1);
      this.lives--;
    });

    this.checkCollision();
    this.increaseDifficulty();
  }
}

Game.WIDTH = 600;
Game.HEIGHT = 600;
Game.BG_COLOR = "#FFF0FB";

export default Game;

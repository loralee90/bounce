import Ball from './ball';
import Paddle from './paddle';
import BonusItem from './bonus_item';

class Game {
  constructor() {
    this.counter = 260;
    this.difficulty = 0;
    this.lives = 3;
    this.score = 0;
    this.streak = 0;
    this.paddle = new Paddle();
    this.balls = [new Ball()];
    this.bonusItem = new BonusItem(this.lives);
    this.droppedBalls = [];
  }

  addBall() {
    // let i = Math.ceil(Math.random() * 2);
    //
    // for (let j = 0; j < i; j++) {
      this.balls.push(new Ball());
    // }
  }

  checkCollision() {
    this.balls.forEach(ball => {
      if (ball.isCollidedWith(this.paddle)) {
        ball.bounce();
        this.score++;
      }
    });

    if (this.bonusItem.isCollidedWith(this.paddle)) {
      this.bonusItem.playSound();
      if (this.bonusItem.value === "2x") {
        this.bonusItem = new BonusItem(this.lives);
        this.score *= 2;
      } else {
        this.lives++;
        this.bonusItem = new BonusItem(this.lives);
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
    ctx.font = '50px Grand Hotel';
    ctx.textAlign = "center";
    ctx.fillStyle = "#36454F";
    ctx.fillText("Bounce", 300, 100);
    ctx.font = '42px Grand Hotel';
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
    this.bonusItem.draw(ctx);
  }

  move() {
    this.droppedBalls = [];

    this.balls.forEach((ball, i) => {
      ball.move();
      if (ball.dropped()) this.droppedBalls.push(i);
    });

    this.bonusItem.move();
  }

  remove() {
    this.droppedBalls.forEach(i => {
      this.balls.splice(i, 1);
      this.lives--;
    });
    if (this.bonusItem.dropped()) this.bonusItem = new BonusItem(this.lives);
  }

  step() {
    this.move();
    this.remove();

    this.checkCollision();
  }
}

Game.WIDTH = 600;
Game.HEIGHT = 600;
Game.BG_COLOR = "#FFF0FB";

export default Game;

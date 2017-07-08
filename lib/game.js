import Ball from './ball';
import Paddle from './paddle';

class Game {
  constructor() {
    this.paddle = new Paddle();
    this.balls = [new Ball()];
    this.counter = 260;
    this.difficulty = 0;
    this.lives = 3;

    this.addBall = this.addBall.bind(this);
    this.increaseDifficulty = this.increaseDifficulty.bind(this);
    this.resetCounter = this.resetCounter.bind(this);
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
      }
    });
  }

  increaseDifficulty() {
    if (this.difficulty < 5) {
      this.difficulty++;
    }
  }

  resetCounter() {
    if (this.counter > 0) {
      this.counter--;
    } else if (this.counter === 0) {
      this.increaseDifficulty();
      this.addBall();

      // this.counter = Math.floor(Math.random() * (240 - 100) + 100);
      // console.log(this.counter)

      // switch (this.difficulty) {
      //   case 1:
      //     this.counter = 240;
      //     break;
      //   case 2:
      //     this.counter = 230;
      //     break;
      //   case 3:
      //     this.counter = 210;
      //     break;
      //   case 4:
      //     this.counter = 190;
      //     break;
      //   case 5:
      //     this.counter = 180;
      //     break;
      //   case 6:
      //     this.counter = 160;
      //     break;
      //   case 7:
      //     this.counter = 150;
      //   case 8:
      //     this.counter = 140;
      //     break;
      //   case 9:
      //     this.counter = 130;
      //     break;
      //   case 10:
      //     this.counter = 120;
      //     break;
      // }
      //
      // switch (this.difficulty) {
      //   case 1:
      //   case 2:
      //     this.counter = Math.floor(Math.random() * (260 - 250) + 250);
      //     break;
      //   case 3:
      //   case 4:
      //     this.counter = Math.floor(Math.random() * (200 - 180) + 180);
      //     break;
      //   case 5:
      //   case 6:
      //     this.counter = Math.floor(Math.random() * (170 - 150) + 150);
      //     break;
      //   case 7:
      //   case 8:
      //     this.counter = Math.floor(Math.random() * (150 - 141) + 141);
      //     break;
      //   case 9:
      //   case 10:
      //     this.counter = 140;
      //     break;
      // }

      switch (this.difficulty) {
        case 1:
          this.counter = 260;
          break;
        case 2:
          this.counter = 220;
          break;
        case 3:
          this.counter = 200;
          break;
        case 4:
          this.counter = 170;
          break;
        case 5:
          this.counter = 150;
          break;
      }
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.WIDTH, Game.HEIGHT);

    this.paddle.draw(ctx);
    this.balls.forEach(ball => ball.draw(ctx));
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
    this.resetCounter();
    console.log(this.lives);
  }
}

Game.WIDTH = 600;
Game.HEIGHT = 600;
Game.BG_COLOR = "#FFF0FB";

export default Game;

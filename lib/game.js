import Ball from './ball';
import Paddle from './paddle';

class Game {
  constructor() {
    this.paddle = new Paddle();
    this.balls = [new Ball()];
    this.intervalTime = 4700;
    this.difficulty = 0;

    this.addBalls = this.addBalls.bind(this);
    setInterval(this.addBalls, 4700);
  }

  addBalls() {
    this.balls.push(new Ball());
  }

  checkCollision() {
    this.balls.forEach(ball => {
      if (ball.isCollidedWith(this.paddle)) {
        ball.bounce();
      }
    });
  }

  increaseDifficulty() {

  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.WIDTH, Game.HEIGHT);

    this.paddle.draw(ctx);
    this.balls.forEach(ball => ball.draw(ctx));
  }

  step(delta) {
    console.log(this.balls.length);
    this.balls.forEach(ball => ball.move());
    this.checkCollision();
    if (this.difficulty === 1) {
      this.intervalTime = 1000;
    }
  }
}

Game.WIDTH = 600;
Game.HEIGHT = 600;
Game.BG_COLOR = "#FFF0FB";

export default Game;

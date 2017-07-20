import Game from './game';

class GameView {
  constructor(game, ctx, canvas) {
    this.game = game;
    this.ctx = ctx;
    this.canvas = canvas;
    this.end = this.end.bind(this);
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    if (this.game.lives > 0) {
      if (time - this.lastTime > 4000) {
        this.game.difficulty++;
        this.lastTime = time;
        this.game.addBall();
      }

      let rand = Math.random();
      if (rand <= (this.game.difficulty * .0002)){
        this.game.addBall();
      }

      this.game.step();
      this.game.draw(this.ctx);

      requestAnimationFrame(this.animate.bind(this));
    } else {
      this.end();
    }
  }

  highScore() {
    const currentHighScore = localStorage.getItem("highscore");

    if (currentHighScore && this.game.score > currentHighScore || !currentHighScore) {
      localStorage.setItem("highscore", this.game.score);
    }

    return localStorage.getItem("highscore");
  }

  end() {
    this.canvas.className="hidden";

    const endFrame = document.getElementById('end');
    endFrame.className="";

    const highScore = document.getElementById('highscore');
    highScore.innerHTML = `High score: ${this.highScore()}`;

    const score = document.getElementById('score');
    score.innerHTML = `Score: ${this.game.score}`;
  }
}

export default GameView;

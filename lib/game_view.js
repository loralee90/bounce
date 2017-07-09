import Game from './game';

class GameView {
  constructor(game, ctx, canvas) {
    this.game = game;
    this.ctx = ctx;
    this.canvas = canvas;
    this.end = this.end.bind(this);
  }

  start() {
    // const theme = new Audio('assets/sounds/theme.wav');
    // // theme.addEventListener('ended', function() {
    // //   this.currentTime = 0;
    // //   this.play();
    // // }, false);
    // theme.play();
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    if (this.game.lives > 0) {
      this.game.step();
      this.game.draw(this.ctx);

      requestAnimationFrame(this.animate.bind(this));
    } else {
      this.end();
    }
  }

  end() {
    this.canvas.className="hidden";

    const endFrame = document.getElementById('end');
    endFrame.className="";

    const score = document.getElementById('score');
    score.value = `Score: ${this.game.score}`;
  }
}

export default GameView;

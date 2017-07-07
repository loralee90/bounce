import Game from './game';
import GameView from './game_view';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector('canvas');
  canvas.width = Game.WIDTH;
  canvas.height = Game.HEIGHT;

  const ctx = canvas.getContext('2d');

  const game = new Game();
  new GameView(game, ctx).start();

  // function animate() {
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   game.draw(ctx);
  //   game.start();
  //   requestAnimationFrame(animate);
  // }
  //
  // animate();
});

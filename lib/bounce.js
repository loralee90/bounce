import Game from './game';
import GameView from './game_view';

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById('startButton');
  startButton.onclick = startGame;

  function startGame() {
    const startFrame = document.getElementById('start');
    const endFrame = document.getElementById('end');
    const canvas = document.querySelector('canvas');

    startFrame.className="hidden";
    endFrame.className="hidden";
    canvas.className="";

    canvas.width = Game.WIDTH;
    canvas.height = Game.HEIGHT;

    const ctx = canvas.getContext('2d');

    const game = new Game();
    new GameView(game, ctx, canvas).start();
  }

  const replayButton = document.getElementById('replayButton');
  replayButton.onclick = startGame;
});

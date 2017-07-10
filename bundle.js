/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ball__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__paddle__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bonus_item__ = __webpack_require__(5);




class Game {
  constructor() {
    this.paddle = new __WEBPACK_IMPORTED_MODULE_1__paddle__["a" /* default */]();
    this.balls = [new __WEBPACK_IMPORTED_MODULE_0__ball__["a" /* default */]()];
    this.bonusItem = new __WEBPACK_IMPORTED_MODULE_2__bonus_item__["a" /* default */]();
    this.counter = 260;
    this.difficulty = 0;
    this.lives = 3;
    this.score = 0;
    this.streak = 0;
    this.droppedBalls = [];
    this.droppedBonusItems = [];

    this.addBall = this.addBall.bind(this);
    this.increaseDifficulty = this.increaseDifficulty.bind(this);
    this.drawLives = this.drawLives.bind(this);
    this.drawScore = this.drawScore.bind(this);
    this.move = this.move.bind(this);
    this.remove = this.remove.bind(this);
  }

  addBall() {
    let i = Math.ceil(Math.random() * 2);

    for (let j = 0; j < i; j++) {
      this.balls.push(new __WEBPACK_IMPORTED_MODULE_0__ball__["a" /* default */]());
    }
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
        this.bonusItem = new __WEBPACK_IMPORTED_MODULE_2__bonus_item__["a" /* default */]();
        this.score *= 2;
      } else {
        this.bonusItem = new __WEBPACK_IMPORTED_MODULE_2__bonus_item__["a" /* default */]();
        this.lives++;
      }
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
    this.bonusItem.draw(ctx, this.lives);
  }

  move() {
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

    if (this.bonusItem.dropped()) this.bonusItem = new __WEBPACK_IMPORTED_MODULE_2__bonus_item__["a" /* default */]();
  }

  step() {
    this.move();
    this.remove();

    this.checkCollision();
    this.increaseDifficulty();
  }
}

Game.WIDTH = 600;
Game.HEIGHT = 600;
Game.BG_COLOR = "#FFF0FB";

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view__ = __webpack_require__(4);



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

    canvas.width = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].WIDTH;
    canvas.height = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].HEIGHT;

    const ctx = canvas.getContext('2d');

    const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
    new __WEBPACK_IMPORTED_MODULE_1__game_view__["a" /* default */](game, ctx, canvas).start();
  }

  const replayButton = document.getElementById('replayButton');
  replayButton.onclick = startGame;
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Ball {
  constructor() {
    this.color = Ball.COLORS[Math.floor(Math.random() * 7)];
    this.radius = 7;
    this.x = 0;
    this.y = 100;
    this.dx = 1;
    this.dy = 1;
    this.gravity = .1;

    this.move = this.move.bind(this);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.x, this.y, this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  bounce() {
    this.dy = Ball.Y_VELS[Math.floor(Math.random() * 3)];
    const time = (this.dy * -1) / this.gravity;
    this.dx = 200 / (2 * time);
    // const note5 = new Audio('assets/sounds/pop1.wav');
    // note5.play();
    const pop1 = new Audio('assets/sounds/pop1.wav');
    pop1.play();
    // const pop2 = new Audio('assets/sounds/pop2.wav');
    // const pop3 = new Audio('assets/sounds/pop3.ogg');
    // switch (this.dy) {
    //   case -10:
    //     pop2.play();
    //     break;
    //   case -9:
    //     pop1.play();
    //     break;
    //   case -8:
    //     pop2.play();
    //     break;
    // }
  }

  isCollidedWith(paddle) {
    const paddleStart = paddle.x;
    const paddleEnd = paddle.x + paddle.width;
    const ballpos = this.y + this.radius;

    return (ballpos >= 550 && ballpos <= 560) && (this.x >= paddleStart && this.x <= paddleEnd);
  }

  move() {
    this.x += this.dx;
    this.dy += this.gravity;
    this.y += this.dy;
  }

  dropped() {
    return this.y > 560 && this.x < 600;
  }
}

Ball.COLORS = ["red", "orange", "brown", "green", "blue", "purple", "black"];
Ball.Y_VELS = [-10, -9, -8];

/* harmony default export */ __webpack_exports__["a"] = (Ball);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Paddle {
  constructor() {
    this.x = 200;
    this.y = 550;
    this.move = this.move.bind(this);
    this.width = 200;
    this.height = 10;

    document.addEventListener("keydown", this.move);
  }

  draw(ctx) {
    ctx.fillStyle = Paddle.COLOR;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move(e) {
    switch (e.keyCode) {
      case 37:
        if (this.x > 0) {
          this.x -= this.width;
        }
        break;
      case 39:
        if (this.x < 400) {
          this.x += this.width;
        }
        break;
    }
  }
}

Paddle.COLOR = "#36454F";

/* harmony default export */ __webpack_exports__["a"] = (Paddle);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(0);


class GameView {
  constructor(game, ctx, canvas) {
    this.game = game;
    this.ctx = ctx;
    this.canvas = canvas;
    this.end = this.end.bind(this);
  }

  start() {
    // const theme = new Audio('assets/sounds/theme.wav');
    // theme.addEventListener('ended', function() {
    //   this.currentTime = 0;
    //   this.play();
    // }, false);
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
    score.innerHTML = `Score: ${this.game.score}`;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ball__ = __webpack_require__(2);


class BonusItem {
  constructor() {
    this.x = this.randomX();
    this.y = 0;
    this.radius = 8;
    this.color = __WEBPACK_IMPORTED_MODULE_0__ball__["a" /* default */].COLORS[Math.floor(Math.random() * 7)];
    this.value;
  }

  randomX() {
    const x = Math.random();

    if (x < .33) {
      return 100;
    } else if (x < .66) {
      return 300;
    } else {
      return 500;
    }
  }

  randomItem(lives) {
    if (lives < 3 && Math.random() < .3) {
      this.value = "+1";
    } else {
      this.value = "2x";
    }

    return this.value;
  }

  draw(ctx, lives) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.x, this.y, this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();

    ctx.font = '9pt Helvetica';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(this.randomItem(lives), this.x, this.y + 4);
  }

  isCollidedWith(paddle) {
    const paddleStart = paddle.x;
    const paddleEnd = paddle.x + paddle.width;
    const pos = this.y + this.radius;

    return (pos >= 550 && pos <= 560) && (this.x >= paddleStart && this.x <= paddleEnd);
  }

  playSound() {
    // ctx.font = '9pt Helvetica';
    // ctx.fillStyle = 'white';
    // ctx.fillText(this.value, this.x, this.y + 4);
    const bonus = new Audio('assets/sounds/bonus2.wav');
    bonus.play();
  }

  move() {
    this.y++;
  }

  dropped() {
    return this.y > 560;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BonusItem);


/***/ })
/******/ ]);
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view__ = __webpack_require__(4);



document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector('canvas');
  canvas.width = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].WIDTH;
  canvas.height = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].HEIGHT;

  const ctx = canvas.getContext('2d');

  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
  new __WEBPACK_IMPORTED_MODULE_1__game_view__["a" /* default */](game, ctx).start();
});


/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const COLORS = ["red", "orange", "brown", "green", "blue", "purple", "black"];
const Y_VELS = [-10, -8, -7];

class Ball {
  constructor() {
    this.color = COLORS[Math.floor(Math.random() * 7)];
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
    this.dy = Y_VELS[Math.floor(Math.random() * 3)];
    // this.dy = Math.random() * -10;
    // this.dy = Math.random() * (-10 + 7) - 7;
    const time = (this.dy * -1) / this.gravity;
    this.dx = 200 / (2 * time);
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

/* harmony default export */ __webpack_exports__["a"] = (Ball);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ball__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__paddle__ = __webpack_require__(1);



class Game {
  constructor() {
    this.paddle = new __WEBPACK_IMPORTED_MODULE_1__paddle__["a" /* default */]();
    this.balls = [new __WEBPACK_IMPORTED_MODULE_0__ball__["a" /* default */]()];
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
      this.balls.push(new __WEBPACK_IMPORTED_MODULE_0__ball__["a" /* default */]());
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

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(3);


class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start() {
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    this.game.step();
    this.game.draw(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ })
/******/ ]);
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

  // function animate() {
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   game.draw(ctx);
  //   game.start();
  //   requestAnimationFrame(animate);
  // }
  //
  // animate();
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
const Y_VELS = [-10, -9, -8];

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
    this.intervalTime = 4700;
    this.difficulty = 0;

    this.addBalls = this.addBalls.bind(this);
    setInterval(this.addBalls, 4700);
  }

  addBalls() {
    this.balls.push(new __WEBPACK_IMPORTED_MODULE_0__ball__["a" /* default */]());
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
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    if (timeDelta > 100) {
      this.game.difficulty += 1;
    }

    this.lastTime = time;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ })
/******/ ]);
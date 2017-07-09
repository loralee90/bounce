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
    const note5 = new Audio('assets/sounds/note5.wav');
    note5.play();
    // const note2 = new Audio('assets/sounds/note2.wav');
    // const note3 = new Audio('assets/sounds/note4.wav');
    // switch (this.dy) {
    //   case -10:
    //     note3.play();
    //     break;
    //   case -9:
    //     note2.play();
    //     break;
    //   case -8:
    //     note1.play();
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

export default Ball;

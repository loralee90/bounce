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

export default Ball;

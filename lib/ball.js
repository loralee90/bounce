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

    const pop1 = new Audio('assets/sounds/pop1.wav');
    pop1.play();
  }

  isCollidedWith(paddle) {
    const paddleStart = paddle.x;
    const paddleEnd = paddle.x + paddle.width;
    const ballPos = this.y + this.radius;

    return (ballPos >= 550 && ballPos <= 560) && (this.x >= paddleStart && this.x <= paddleEnd);
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
Ball.Y_VELS = [-10, -9, -8, -7];

export default Ball;

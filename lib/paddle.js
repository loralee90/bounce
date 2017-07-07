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

export default Paddle;

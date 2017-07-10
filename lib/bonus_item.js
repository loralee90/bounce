import Ball from './ball';

class BonusItem {
  constructor(lives) {
    this.x = this.randomX();
    this.y = 0;
    this.radius = 8;
    this.color = Ball.COLORS[Math.floor(Math.random() * 7)];
    this.lives = lives;
    this.value = this.randomItem();

    this.randomItem = this.randomItem.bind(this);
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

  randomItem() {
    if (this.lives < 3 && Math.random() < .5) {
      return "+1";
    } else {
      return "2x";
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.x, this.y, this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();

    ctx.font = '9pt Nunito';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(this.value, this.x, this.y + 4);
  }

  isCollidedWith(paddle) {
    const paddleStart = paddle.x;
    const paddleEnd = paddle.x + paddle.width;
    const pos = this.y + this.radius;

    return (pos >= 550 && pos <= 570) && (this.x >= paddleStart && this.x <= paddleEnd);
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

export default BonusItem;

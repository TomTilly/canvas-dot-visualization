import { randomNumber, debounce } from './util.js';

class Visualization {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.dots = Array.from({ length: 100 }, () => ({
      x: randomNumber(0, canvas.width),
      y: randomNumber(0, canvas.height),
      size: randomNumber(1, 4),
    }));
    this.cursor = {
      x: null,
      y: null,
    };
    this.linesToDraw = 3;
    this.drawCanvas = this.drawCanvas.bind(this);
    this.onMove = this.onMove.bind(this);

    this.canvas.addEventListener('mousemove', debounce(this.onMove, 50));
    requestAnimationFrame(this.drawCanvas);
  }

  drawLine(point) {
    this.ctx.beginPath();
    this.ctx.moveTo(point.x, point.y);
    this.ctx.lineTo(this.cursor.x, this.cursor.y);
    this.ctx.stroke();
  }

  getDistanceFromCursor(point) {
    return Math.sqrt(
      (point.x - this.cursor.x) ** 2 + (point.y - this.cursor.y) ** 2
    );
  }

  drawCanvas() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw dots
    this.dots.forEach((p) => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, (Math.PI / 180) * 360);
      this.ctx.fill();
    });

    // Draw lines if cursor is showing
    if (this.cursor.x && this.cursor.y) {
      // Sort coords by shortest distance
      const closestPoints = [...this.dots].sort(
        (a, b) => this.getDistanceFromCursor(a) - this.getDistanceFromCursor(b)
      );

      for (let i = 0; i < this.linesToDraw; i += 1) {
        this.drawLine(closestPoints[i]);
      }
    }
  }

  onMove(e) {
    console.log(this);
    this.cursor.x = e.pageX;
    this.cursor.y = e.pageY;
    requestAnimationFrame(this.drawCanvas);
  }
}

const canvas = document.querySelector('canvas');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

new Visualization(canvas);

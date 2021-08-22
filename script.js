import { randomNumber, debounce } from './util.js';

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
const dots = Array.from({ length: 100 }, () => ({
  x: randomNumber(0, canvas.width),
  y: randomNumber(0, canvas.height),
  size: randomNumber(1, 4),
}));
const cursorPosition = {
  x: null,
  y: null,
};
const linesToDraw = 3;

// Draws line from start coords to end coords
function drawLine(start, end) {
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

function getDistance(a, b) {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}

function drawScreen() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw dots
  dots.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, (Math.PI / 180) * 360);
    ctx.fill();
  });

  // Draw lines if cursor is showing
  if (cursorPosition.x && cursorPosition.y) {
    // Sort coords by shortest distance
    const closestPoints = [...dots].sort(
      (a, b) => getDistance(cursorPosition, a) - getDistance(cursorPosition, b)
    );

    for (let i = 0; i < linesToDraw; i++) {
      drawLine(cursorPosition, closestPoints[i]);
    }
  }
}

function updateCursorPosition(x, y) {
  cursorPosition.x = x;
  cursorPosition.y = y;
}

function onMove(e) {
  updateCursorPosition(e.pageX, e.pageY);
  requestAnimationFrame(drawScreen);
}

canvas.addEventListener('click', (e) => {
  dots.push({ x: e.x, y: e.y, size: randomNumber(1, 4) });
  updateCursorPosition(e.pageX, e.pageY);
  drawScreen();
});

canvas.addEventListener('mousemove', debounce(onMove, 50));

requestAnimationFrame(drawScreen);

import dotify from './dotify.js';

const canvas = document.querySelector('canvas');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

dotify(canvas, { numDots: 100, numLines: 10 });

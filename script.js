import dotify from './dotify.js';

const canvas = document.querySelector('canvas');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

dotify(canvas, 100, 10);

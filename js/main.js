;'use strict';

const ctx = document.querySelector(`.game__action-area`).getContext(`2d`);
const canvas = document.querySelector(`.game__action-area`);
const infoPanel = document.querySelector(`.game__info`);
const menu = document.querySelector(`.game__menu`);
/*  В MOUSE всегда текущие координаты мыши относительно canvas элемента 
*/
const MOUSE = { x: 0, y: 0 };

/*  Размеры canvas и боковой панели
*/
infoPanel.style.width = `${innerWidth / 6}px`;
canvas.width = innerWidth - (innerWidth / 6);
canvas.height = innerHeight - menu.offsetHeight;

window.addEventListener(`mousemove`, mouseMoveEvent);
window.addEventListener(`keydown`, keyDownEvent);
window.addEventListener(`keyup`, keyUpEvent)

const player = new BaseObject(canvas);

animate();

function animate() {
  requestAnimationFrame(animate);
  
  clear(ctx);
  
  player.update(MOUSE.x, MOUSE.y);
}

function clear(ctx) {
  ctx.beginPath();
  ctx.clearRect(0, 0, innerWidth, innerHeight);
}

function mouseMoveEvent(e) {
  MOUSE.x = Math.round(e.pageX - canvas.getBoundingClientRect().left);
  MOUSE.y = Math.round(e.pageY - canvas.getBoundingClientRect().top);
}

function keyDownEvent(e) {
  console.log(e.keyCode);
  if (e.keyCode === 39 || e.keyCode === 68) {
    player.dir = `right`;
  }
  else if (e.keyCode === 37 || e.keyCode === 65) {
    player.dir = `left`;
  }
}

function keyUpEvent(e) {
  if (e.keyCode === 39 || e.keyCode === 68) {
    player.dir = undefined;
  }
  else if (e.keyCode === 37 || e.keyCode === 65) {
    player.dir = undefined;
  }
  if (e.keyCode === 38 || e.keyCode === 87) {
    player.jump();
  }
}
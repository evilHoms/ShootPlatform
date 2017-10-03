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

let someobj = new BaseObject(ctx);

animate();

function animate() {
  requestAnimationFrame(animate);
  
  clear(ctx);
  
  someobj.update(MOUSE.x, MOUSE.y);
}

function clear(ctx) {
  ctx.beginPath();
  ctx.clearRect(0, 0, innerWidth, innerHeight);
}

function mouseMoveEvent(e) {
  MOUSE.x = Math.round(e.pageX - canvas.getBoundingClientRect().left);
  MOUSE.y = Math.round(e.pageY - canvas.getBoundingClientRect().top);
}
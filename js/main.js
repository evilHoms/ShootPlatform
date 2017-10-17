;'use strict';

const ctx = document.querySelector(`.game__action-area`).getContext(`2d`);
const canvas = document.querySelector(`.game__action-area`);
const infoPanel = document.querySelector(`.game__info`);
const menu = document.querySelector(`.game__menu`);
const menu_btns = document.querySelectorAll(`.btn`);

/*  Размеры canvas и боковой панели
*/
canvas.width = innerWidth - (innerWidth / 10 * 3);
canvas.height = innerHeight - menu.offsetHeight;

window.addEventListener(`mousemove`, mouseMoveEvent);
window.addEventListener(`keydown`, keyDownEvent);
window.addEventListener(`keyup`, keyUpEvent)

setListenersMenuBtns(menu_btns);
/*  В MOUSE всегда текущие координаты мыши относительно canvas элемента 
*/
const MOUSE = { x: 0, y: 0 };

// Пути для отрисовки объектов
const PLAYER_MODEL_ROUTE = [[20, 10], [0, 0], [10 ,20], [20, 10], [0, 30], [15, 40], [25, 40], [10, 20]];
const GROUND_MODEL_ROUTE = [[0, 0], [100, 0], [100, 50], [0, 50], [0, 0]];

const player = new MovingObject(canvas, PLAYER_MODEL_ROUTE);
const terrainObjectsMap = [[50, canvas.height - 50], [300, canvas.height - 70], [500, canvas.height - 100]];
const terrainObjects = [];

for (let i = 0; i < terrainObjectsMap.length; i++) {
  terrainObjects.push(new ImmovableObject(canvas, GROUND_MODEL_ROUTE, terrainObjectsMap[i][0], terrainObjectsMap[i][1]));
}

animate();

function animate() {
  requestAnimationFrame(animate);
  
  clear(ctx);
  
  player.update(MOUSE.x, MOUSE.y);
  
  terrainObjects.forEach(el => el.update());
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

function startGameAction() {
  alert(`start`);
}

function stopGameAction() {
  alert(`gameStoped`);
}

function showAbout() {
  alert(`"Shoot Platform" game v0.1`);
}

function showHelp() {
  alert(`help`);
}

function setListenersMenuBtns(btnsArray) {
  btnsArray.forEach(el => {
    if (el.classList.contains('ng-btn'))
      el.addEventListener('click', startGameAction);
    if (el.classList.contains('about-btn'))
      el.addEventListener('click', showAbout);
    if (el.classList.contains('help-btn'))
      el.addEventListener('click', showHelp);
  });
}
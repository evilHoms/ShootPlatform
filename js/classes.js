'use strict';

// Объект принимает массив объектов и строит уровень
// Должен иметь методы для отрисовки и обновления всех объектов в массиве, управлять условиями победы\поражения
class Level {
  construct() {
    
  }
}

// Объект данного класса должен будет читать схему уровня и возвращать массив объектов
class LevelParse {
  constructor() {
    
  }
}

// Базвый класс для объектов в канвасе
class BaseObject {
  constructor(canvas, drawRoute = [[0, 0]], x = 0, y = 0, color = `#000`) {
    
    this.ctx = canvas.getContext(`2d`);
    this.canvas = canvas;
    
    this.x = x;
    this.y = y;
    this.drawRoute = drawRoute;
    this.color = color;
    
    this.state = {
      isMovable: false,
      isAlive: false,
      isBoundable: false
    };
  }
  
  draw() {
    
    const c = this.ctx;
    let minX = this.drawRoute[0][0];
    let maxX = this.drawRoute[0][0];
    let minY = this.drawRoute[0][1];
    let maxY = this.drawRoute[0][1];

    c.beginPath();
    c.moveTo(this.x + this.drawRoute[0][0], this.y + this.drawRoute[0][1]);
    
    for (let i = 1; i < this.drawRoute.length; i++) {
      c.lineTo(this.x + this.drawRoute[i][0], this.y + this.drawRoute[i][1]);
      
      if (this.drawRoute[i][0] < minX) minX = this.drawRoute[i][0];
      else if (this.drawRoute[i][0] > maxX) maxX = this.drawRoute[i][0];
      
      if (this.drawRoute[i][1] < minY) minY = this.drawRoute[i][1];
      else if (this.drawRoute[i][1] > maxY) maxY = this.drawRoute[i][1];

    }
    
    c.fillStyle = this.color;
    c.fill();
    
    this.width = maxX - minX;
    this.height = maxY - minY;
  }
  
  update() {
    
    this.draw();
  }
  
}

// Базовый класс для движущихся объектов
class MovingObject extends BaseObject {
  constructor(canvas, drawRoute = [[0, 0]], x = 0, y = 0, color = `#000`) {
    super(canvas, drawRoute, x, y, color);
    
    this.ctx = canvas.getContext(`2d`);
    this.canvas = canvas;
    
    this.x = x;
    this.y = y;
    this.color = color;
    
    this.dir = undefined;
    this.speed = {
      vx: 0,
      vy: 0
    };
    
    this.state = {
      isMovable: true,
      isAlive: true,
      isBoundable: true
    };
    
    this.isGrounded = false;
    
  }
  
  get G() { return 1; }
  get V() { return 3; }
  get JUMP_STRENGHT() { return 10; }
  
  draw() {
    super.draw();
  }
  
  update() {
    
    this.x += this.speed.vx;
    this.y += this.speed.vy;
    
    this.move();
    this.borderBound();
    this.onGround();
    this.fall();
    
    super.update();
    
  }
  
  jump() {
    if (this.isGrounded) {
      this.speed.vy -= this.JUMP_STRENGHT;
    }
  }
  
  move() {
    if (this.dir === `left`) {
      this.speed.vx = -this.V;
    }
    else if (this.dir === `right`) {
      this.speed.vx = this.V;
    }
    else {
      this.speed.vx = 0;
    }
  }
  
  fall() {
    if (!this.isGrounded) {
      this.speed.vy += this.G;
    }
  }
  
  borderBound() {
    
    if (this.y + this.height > canvas.height) {
      this.y = canvas.height - this.height;
      this.speed.vy = -Math.abs(this.speed.vy) / 2;
    }
    
    if (this.x + this.width > canvas.width) {
      this.x = canvas.width - this.width;
      this.speed.vx = -Math.abs(this.speed.vx);
    }
    else if(this.x < 0) {
      this.x = 0;
      this.speed.vx = Math.abs(this.speed.vx);
    }
    
  }
  
  onGround() {
    if (this.speed.vy < 1 && this.speed.vy > -1 &&
       this.y + this.height >= canvas.height) {
      this.speed.vy = 0;
      this.y = canvas.height - this.height;
      this.isGrounded = true;
    }
    else {
      this.isGrounded = false;
    }
  }
  
}

// Базовый класс для неподвижных объектов
class ImmovableObject extends BaseObject {
  constructor(canvas, drawRoute = [[0, 0]], x = 0, y = 0, color = `#000`) {
    super(canvas, drawRoute, x, y, color);
    this.ctx = canvas.getContext(`2d`);
    this.canvas = canvas;
    
    this.x = x;
    this.y = y;
    this.color = color;
    
    this.state = {
      isMovable: false,
      isAlive: false,
      isBoundable: true
    };
    
  }
  
  draw() {
    
    super.draw();
  }
  
  update() {
    
    super.update();
  }
}
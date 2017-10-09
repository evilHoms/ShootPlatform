'use strict';

class BaseObject {
  
  constructor(canvas, x = 0, y = 0, width = 20, height = 20, color = `#000`) {
    
    this.G = 1;
    this.V = 3;
    this.JUMP_STRENGHT = 10;
    
    this.ctx = canvas.getContext(`2d`);
    this.canvas = canvas;
    
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.radius = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2));
    
    this.dir = undefined;
    this.speed = {
      vx: 0,
      vy: 0
    };
    
    this.isGrounded = false;
    
  }
  
  draw() {
    const c = this.ctx;
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
  }
  
  update() {
    
    this.x += this.speed.vx;
    this.y += this.speed.vy;
    
    this.move();
    this.borderBound();
    this.onGround();
    this.fall();
    
    this.draw();
    
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
    
    if (this.y + this.radius > canvas.height) {
      this.y = canvas.height - this.radius;
      this.speed.vy = -Math.abs(this.speed.vy) / 2;
    }
    
    if (this.x + this.radius > canvas.width) {
      this.x = canvas.width - this.radius;
      this.speed.vx = -Math.abs(this.speed.vx);
    }
    else if(this.x - this.radius < 0) {
      this.x = 0 + this.radius;
      this.speed.vx = Math.abs(this.speed.vx);
    }
    
  }
  
  onGround() {
    if (this.speed.vy < 1 && this.speed.vy > -1 &&
       this.y + this.radius >= canvas.height) {
      this.speed.vy = 0;
      this.y = canvas.height - this.radius;
      this.isGrounded = true;
    }
    else {
      this.isGrounded = false;
    }
  }
  
}
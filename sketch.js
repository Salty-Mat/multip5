/* First Class
 * 
 * Made by: Mathew Zahedi
 *
 * AP CSP per 4
 */

// defining the variable

const socket = io("localhost:8080")

var balls = [];
var balls2 = []
var b
var b2

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  createCanvas(windowWidth, windowHeight);
  b = new Ball();
  b2 = new Ball();
  background(20);
  dragText();
  poplulate();
  poplulate2()
  timer();
  //socket.emit("message", 1)

}



//this Populates the array 
function poplulate() {
  for (var i = 0; i < balls.length; i++) {
    balls[i].show();
  }
}

function poplulate2() {
  for (var i = 0; i < balls2.length; i++) {
    balls2[i].show();
  }
}

// reduces lag
function timer() {
  if (balls.length > 500) {
    balls = []
  }
}

//this is the function where all the text is
function dragText() {
  textSize(30)
  textAlign(CENTER)
  fill(200)
  text("click and drag your mouse", windowWidth/2, 40)
  textAlign(LEFT)
  textSize(15)
  text("amount of balls: " + balls.length, 10, windowHeight-10)
}

//this makes a new ball when you drag the mouse
function mouseDragged() {
  socket.emit("message", {
    x: mouseX,
    y: mouseY,
  })
  balls.push(b);
}

socket.on("message", function(data){
  b2.setXY(data.x, data.y)
  balls2.push(b2);

})

//this is the class for all the balls
class Ball {
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.s = 30
    this.r = random(150, 255)
    this.g = random(150, 255)
    this.b = random(150, 255)
    this.a = 255
    this.Vx = random(-5, 5);
    this.Vy = random(-5, 5);
  }

  //moves the balls and makes them bigger 
  move() {
    noStroke();
    fill(this.r, this.g, this.b, this.a)
    this.x += this.Vx
    this.y += this.Vy
    if (this.s > 1) {
      this.a -= 4
      this.s++
    }
    if (this.s > 100) {
      this.s = 0
    }
  }

  setXY(newX, newY){
    this.x = newX
    this.y = newY
  }

  //this draws the circle
  show() {

    circle(this.x, this.y, this.s);
    this.move();
  }
}

// Nature-Themed Clock using p5.js

let raindrops = [];
let flowers = [];
let trees = [];
let clouds = [];
let lastMinute;

function setup() {
  createCanvas(800, 600);
  frameRate(60); // Set frame rate to 60 FPS

  // Initialize based on the current time
  let currentSecond = second();
  let currentMinute = minute();
  let currentHour = hour();

  lastMinute = currentMinute; // Store the initial minute value

  // Create static clouds
  for (let i = 0; i < 50; i++) {
    let x = random(0, width);
    let y = random(0, 150);
    clouds.push(new Cloud(x, y));
  }

  for (let i = 0; i < currentSecond; i++) {
    raindrops.push(new Raindrop());
  }

  for (let i = 0; i < currentMinute; i++) {
    addFlower();
  }

  for (let i = 0; i < currentHour; i++) {
    addTree();
  }
}

function draw() {
  background(255);

  // Draw sky and grass
  drawSkyAndGrass();

  // Draw clouds, trees, raindrops, and flowers
  for (let cloud of clouds) {
    cloud.draw();
  }

  for (let tree of trees) {
    tree.draw();
  }

  if (frameCount % 60 == 0) { // Add a new raindrop every second
    if (second() != 0) {
      raindrops.push(new Raindrop());
    } else {
      raindrops = []; // Clear raindrops at the start of a new minute
    }
  }

  for (let raindrop of raindrops) {
    raindrop.draw();
  }

  for (let flower of flowers) {
    flower.draw();
  }

  // Check for minute change
  let currentMinute = minute();
  if (currentMinute !== lastMinute) {
    console.log("Current minute: " + currentMinute);
    lastMinute = currentMinute;
  }
}

function drawSkyAndGrass() {
  fill(0, 128, 0); // Green for grass
  rect(0, height - 200, width, 200); // Grass area
}


function addFlower() {
  let x, y, overlap;
  do {
    overlap = false;
    x = random(20, width - 20);
    y = random(height - 200, height - 20);
    for (let flower of flowers) {
      if (dist(x, y, flower.x, flower.y) < 25) {
        overlap = true;
        break;
      }
    }
    for (let tree of trees) {
      if (dist(x, y, tree.x + 10, tree.y) < 40) { // Check for overlap with trees
        overlap = true;
        break;
      }
    }
  } while (overlap);

  flowers.push(new Flower(x, y));
}

function addTree() {
  let x, y, overlap;
  do {
    overlap = false;
    x = random(30, width - 30);
    y = random(height - 200, height - 50);
    for (let tree of trees) {
      if (dist(x, y, tree.x, tree.y) < 50) {
        overlap = true;
        break;
      }
    }
  } while (overlap);

  trees.push(new Tree(x, y));
}

class Cloud {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    fill(180);
    ellipse(this.x, this.y, 150, 100); // Fluffy cloud
  }
}

class Raindrop {
  constructor() {
    this.x = random(0, width);
    this.y = random(150, height - 200);
  }

  draw() {
    fill(0, 0, 255);
    ellipse(this.x, this.y, 5, 10);
  }
}

class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, 10, 10);
  }
}

class Tree {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    fill(139, 69, 19); // Brown for tree trunk
    rect(this.x, this.y, 20, 50); // Tree trunk
    fill(34, 139, 34); // Green for leaves
    ellipse(this.x + 10, this.y, 50, 50); // Leaves
  }
}

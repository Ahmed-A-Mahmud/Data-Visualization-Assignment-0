/*
// setup() is called once at page-load
function setup() {
    createCanvas(800,600); // make an HTML canvas element width x height pixels
}

// draw() is called 60 times per second
function draw() {
    let hr = hour();
    let min = minute();
    let sec = second();

    background(225);
    textSize(32);
    fill(180);
    text(hr, 10, 30);
    fill(100);
    text(min, 10, 60);
    fill(0);
    text(sec, 10, 90);
}

// Orbiting Planetary Clock

// Orbiting Planetary Clock with Detailed Planets and Hourly Constellation

var hourOrbitRadius, minuteOrbitRadius, secondOrbitRadius;
var sunDiameter = 60;
var lastHour = -1; // Track the last hour for constellation

function setup() {
  createCanvas(800, 800);
  // Define orbit radii
  hourOrbitRadius = width / 4;
  minuteOrbitRadius = width / 3;
  secondOrbitRadius = width / 2.5;

  noStroke();
  ellipseMode(RADIUS);
}

function draw() {
  background(0); // Black background
  translate(width / 2, height / 2); // Move the origin to the center

  // Draw the sun at the center
  fill(255, 204, 0); // Sun color
  ellipse(0, 0, sunDiameter / 2, sunDiameter / 2);

  // Get current time
  var hours = hour() % 12; // Convert to 12-hour format
  var minutes = minute();
  var seconds = second();

  if (lastHour != hours) {
    lastHour = hours;
    drawConstellation(); // Draw constellation every hour
  }

  // Calculate angles for each planet
  var hourAngle = map(hours, 0, 12, 0, TWO_PI) - HALF_PI;
  var minuteAngle = map(minutes, 0, 60, 0, TWO_PI) - HALF_PI;
  var secondAngle = map(seconds, 0, 60, 0, TWO_PI) - HALF_PI;

  // Draw hour planet (largest)
  drawPlanet(hourOrbitRadius, hourAngle, 30, color(100, 100, 255), true);

  // Draw minute planet (medium)
  drawPlanet(minuteOrbitRadius, minuteAngle, 20, color(150, 255, 150), false);

  // Draw second planet (smallest)
  drawPlanet(secondOrbitRadius, secondAngle, 10, color(255, 100, 100), false);
}

// Function to draw a planet with additional details
function drawPlanet(orbitRadius, angle, size, planetColor, hasRing) {
  var x = orbitRadius * cos(angle);
  var y = orbitRadius * sin(angle);
  fill(planetColor);
  ellipse(x, y, size, size);

  if (hasRing) {
    stroke(200);
    noFill();
    ellipse(x, y, size * 1.5, size / 2); // Drawing the ring
    noStroke();
  }
}

// Function to draw a constellation
function drawConstellation() {
  stroke(255);
  var numStars = 5 + int(random(5)); // Random number of stars in the constellation
  var lastStarX = 0;
  var lastStarY = 0;
  for (var i = 0; i < numStars; i++) {
    var starX = random(-width / 2, width / 2);
    var starY = random(-height / 2, height / 2);
    ellipse(starX, starY, 3, 3);
    if (i > 0) {
      line(lastStarX, lastStarY, starX, starY);
    }
    lastStarX = starX;
    lastStarY = starY;
  }
  noStroke();
}
*/

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
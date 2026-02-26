p5.disableFriendlyErrors = true; // hush
let bDoExportSvg = false;

let autoButton;
function setup() {
  createCanvas(1600, 800);
  background(0);
  angleMode(DEGREES);
  noFill();
  stroke(255, 100, 0);
  strokeWeight(5);

  // Create a button and place it
  autoButton = createButton('Auto (OFF)');
  autoButton.position(1600 - 210, 10);
  autoButton.size(200, 50);
  autoButton.style("font-size", "32px");
  autoButton.style('background-color', color(100, 100, 255));

  // Call autoToggle() when the button is pressed
  autoButton.mousePressed(autoToggle);
}

let auto = false;
function autoToggle() {
  auto = !auto;
  if (auto)
    autoButton.html("Auto (ON)");
  else
    autoButton.html("Auto (OFF)");
}

function keyPressed() {
  if (key == 's') {
    bDoExportSvg = true;
  }
}

function polarToCartesianX(r, angle) {
  return width / 2 + r * cos(angle);
}

function polarToCartesianY(r, angle) {
  return height / 2 - r * sin(angle);
}

// Increase speed when mouse wheel is scrolled
function mouseWheel() {
  speed += 5;
}

let progress = 500;
let speed = 0;

const maxProgress = 720 * 40;
function draw() {

  if (bDoExportSvg) {
    beginRecordSvg(this, "myOutput.svg");
  }

  beginShape();

  let angle = 0;

  // Deaccelerate speed
  speed *= 0.97;
  // Speed cannot be below 0
  speed = Math.max(speed, 0);
  progress += speed;

  // If the auto button was pressed, increase progress constantly
  if (auto)
    progress += 15;

  // If max progress is reached, reset progress
  if (progress > maxProgress) {
    progress = 20;
    background(0)
  }

  stroke(255 * progress / (maxProgress / 2), progress / (maxProgress / 2), 255 * progress / (maxProgress / 2));

  // Create pink spiral
  while (angle < progress) {
    let radius = angle;

    let x = polarToCartesianX(radius / 10, angle + (progress / 10));
    let y = polarToCartesianY(radius / 10, angle + (progress / 10));

    curveVertex(x, y);

    angle += 1;
  }

  endShape();

  beginShape();

  stroke(progress / (maxProgress / 2), 255 * progress / (maxProgress / 2), 255 * progress / (maxProgress / 2));

  // Create cyan spiral going the opposite way
  let angle2 = 0;
  while (angle2 > -progress) {
    let radius = angle2;

    let x = polarToCartesianX(radius / 10, angle2 + (progress / 10));
    let y = polarToCartesianY(radius / 10, angle2 + (progress / 10));

    curveVertex(x, y);

    angle2 -= 1;
  }

  endShape();

  if (bDoExportSvg) {
    endRecordSvg();
    bDoExportSvg = false;
  }
}

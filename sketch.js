p5.disableFriendlyErrors = true; // hush
let bDoExportSvg = false; 

function setup() {
  createCanvas(1600, 800);
  background(0);
  angleMode(DEGREES);
  noFill();
  stroke(255, 100, 0);
  strokeWeight(5);
}

function keyPressed(){
  if (key == 's'){ 
    bDoExportSvg = true; 
  }
}

function polarToCartesianX(r, angle) {
  return width / 2 + r * cos(angle);
}

function polarToCartesianY(r, angle) {
  return height / 2 - r * sin(angle);
}

function mouseWheel() {
  speed += 5;
}

let progress = 500;
let speed = 0;

const maxProgress = 720 * 40;
function draw() {

  if (bDoExportSvg){
    beginRecordSvg(this, "myOutput.svg");
  }

  beginShape();

  let angle = 0;

  speed *= 0.97;
  speed = Math.max(speed, 0);
  progress += speed;

  if (progress > maxProgress) {
    progress = 20;
    background(0)
  }

  stroke(progress / (maxProgress / 2), progress / (maxProgress / 2), progress / (maxProgress / 2));

  while (angle < progress) {
    let radius = angle;

    let x = polarToCartesianX(radius / 10, angle + (progress / 10));
    let y = polarToCartesianY(radius / 10, angle + (progress / 10));

    curveVertex(x, y);

    angle += 1;
  }

  endShape();

  beginShape();

  stroke(255 * progress / (maxProgress / 2), 255 * progress / (maxProgress / 2), 255 * progress / (maxProgress / 2));

  let angle2 = 0;
  while (angle2 > -progress) {
    let radius = angle2;

    let x = polarToCartesianX(radius / 10, angle2 + (progress / 10));
    let y = polarToCartesianY(radius / 10, angle2 + (progress / 10));

    curveVertex(x, y);

    angle2 -= 1;
  }

  endShape();

  if (bDoExportSvg){
    endRecordSvg();
    bDoExportSvg = false;
  }
}

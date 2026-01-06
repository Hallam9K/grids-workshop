const canvasSize = 720;
const numberOfCells = 40;
const numberOfBoxes = 20;

const box = []
const boxVelocity = [];
const boxSize = canvasSize / numberOfCells;
let speed = 10;

function setup() {
  createCanvas(canvasSize - 22, canvasSize - 22);

  // Create boxes
  for (let i = 0; i < 20; i++) {
    box.push({ x: 0, y: 0 });
    boxVelocity.push({ x: 10, y: 0 });
  }

  fill(255, 0, 0);
}

// If off the canvas
function outOfBounds(num = 0) {
  if (box[num].x >= 720 - 22 - boxSize)
    return 1; // Left
  else if (box[num].x < 0)
    return 2; // Right
  else if (box[num].y >= 720 - 22 - boxSize)
    return 3; // Down
  else if (box[num].y < 0)
    return 4; // Up
  return 0;
}

let timer = 0
function moveBoxes() {
  for (let i = 0; i < box.length; i++) {

    let moveIntervals = boxSize + 50;

    switch (outOfBounds(i)) {
      default:

        let changeDir = random([0, 1, 2]) == 0 ? true : false;
        // Randomly change direction
        if (box[i].x % moveIntervals == 0 && changeDir) {
          let moveDir = random([0, 1]) == 0 ? true : false;
          if (moveDir) {
            boxVelocity[i].x = -speed;
            boxVelocity[i].y = 0;
          }
          else {
            boxVelocity[i].x = speed;
            boxVelocity[i].y = 0;
          }
        }
        if (box[i].y % moveIntervals == 0 && changeDir) {
          let moveDir = random([0, 1]) == 1 ? true : false;
          if (moveDir) {
            boxVelocity[i].x = 0;
            boxVelocity[i].y = -speed;
          }
          else {
            boxVelocity[i].x = 0;
            boxVelocity[i].y = speed;
          }
        }
        break;
      // If Out of Bounds
      case 1:
        boxVelocity[i].x = -speed;
        boxVelocity[i].y = 0;
        break;
      case 2:
        boxVelocity[i].x = speed;
        boxVelocity[i].y = 0;
        break;
      case 3:
        boxVelocity[i].y = -speed;
        boxVelocity[i].x = 0;
        break;
      case 4:
        boxVelocity[i].y = speed;
        boxVelocity[i].x = 0;
        break;
    }
    if (timer++ >= 60) {
      box[i].x += boxVelocity[i].x;
      box[i].y += boxVelocity[i].y;
    }
  }
}

function draw() {
  background(0);
  strokeWeight(0);

  // Make Strips
  fill(200, 100, 100);
  for (let i = 0; i < boxSize; i++) {
    // Vertical Rows
    rect(i * (boxSize) + (i * 50), 0, boxSize, canvasSize);
    // Horizontal Rows
    rect(0, i * (boxSize) + (i * 50), canvasSize, boxSize);
  }

  moveBoxes();

  fill(0, 200, 200);
  for (let i = 0; i < box.length; i++)
    square(box[i].x, box[i].y, boxSize);
}
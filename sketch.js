const canvasSize = 1000;
const numberOfCells = 40;
const numberOfBoxes = 20;

const box = []
const boxVelocity = [];
const boxSize = canvasSize / numberOfCells;
let speed = 10;

function setup() {
  createCanvas(canvasSize, canvasSize);

  // Create boxes
  for (let i = 0; i < 200; i++) {
    box.push({ x: canvasSize / 2, y: canvasSize / 2 });
    boxVelocity.push({ x: 0, y: 0 });
  }

  fill(255, 0, 0);
}

// If off the canvas
function outOfBounds(num = 0) {
  if (box[num].x >= canvasSize - boxSize)
    return 1; // Left
  else if (box[num].x < 0)
    return 2; // Right
  else if (box[num].y >= canvasSize - boxSize)
    return 3; // Down
  else if (box[num].y < 0)
    return 4; // Up
  return 0;
}

let timer = 0;
let cooldown = 0;
function moveBoxes() {
  timer++;
  for (let i = 0; i < box.length; i++) {
    let moveIntervals = boxSize * 4;

    switch (outOfBounds(i)) {
      default:
        if (cooldown-- >= 0)
          break;

        let changeDir = random([0, 1, 2]);
        // Randomly change direction
        if (box[i].x % (Math.round(box[i].x / moveIntervals) * moveIntervals) == 0 && changeDir == 1) {
          let moveDir = random([0, 1]) == 0 ? true : false;
          if (moveDir) {
            boxVelocity[i].x = -speed;
            boxVelocity[i].y = 0;

            box[i].y = Math.round(box[i].y / moveIntervals) * moveIntervals;

          }
          else {
            boxVelocity[i].x = speed;
            boxVelocity[i].y = 0;

            box[i].y = Math.round(box[i].y / moveIntervals) * moveIntervals;
          }
          cooldown = 50;
        }
        if (box[i].y % (Math.round(box[i].y / moveIntervals) * moveIntervals) == 0 && changeDir == 2) {
          let moveDir = random([0, 1]) == 0 ? true : false;
          if (moveDir) {
            boxVelocity[i].x = 0;
            boxVelocity[i].y = -speed;

            box[i].x = Math.round(box[i].x / moveIntervals) * moveIntervals;
          }
          else {
            boxVelocity[i].x = 0;
            boxVelocity[i].y = speed;

            box[i].x = Math.round(box[i].x / moveIntervals) * moveIntervals;
          }
          cooldown = 50;
        }
        break;
      // If Out of Bounds
      case 1:
        boxVelocity[i].x = -speed;
        boxVelocity[i].y = 0;

        box[i].y = Math.round(box[i].y / moveIntervals) * moveIntervals;
        break;
      case 2:
        boxVelocity[i].x = speed;
        boxVelocity[i].y = 0;

        box[i].y = Math.round(box[i].y / moveIntervals) * moveIntervals;
        break;
      case 3:
        boxVelocity[i].y = -speed;
        boxVelocity[i].x = 0;

        box[i].x = Math.round(box[i].x / moveIntervals) * moveIntervals;
        break;
      case 4:
        boxVelocity[i].y = speed;
        boxVelocity[i].x = 0;

        box[i].x = Math.round(box[i].x / moveIntervals) * moveIntervals;
        break;
    }
    if (timer >= 30) {
      box[i].x += boxVelocity[i].x;
      box[i].y += boxVelocity[i].y;
    }
  }
}

function draw() {
  background(0);
  strokeWeight(0);

  // Make Strips
  fill(100, 0, 0);
  for (let i = 0; i < boxSize + 1; i++) {
    if (i % 2 != 0)
      continue;
    // Vertical Rows
    rect(0 + (i * boxSize) * 2, 0, boxSize, canvasSize);
    // Horizontal Rows
    rect(0, 0 + (i * boxSize) * 2, canvasSize, boxSize);
  }

  moveBoxes();

  fill(0, 255, 255);
  for (let i = 0; i < box.length; i++)
    square(box[i].x, box[i].y, boxSize);
}
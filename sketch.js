const canvasSize = 1000;
const numberOfCells = 40;
const numberOfBoxes = 100;

const box = []
const boxVelocity = [];
const boxSize = canvasSize / numberOfCells;
const boxColor = [];
let speed = 10;

// For the snake's segments
const oldPos = [];

function setup() {
  createCanvas(canvasSize, canvasSize);

  // Create 100 boxes, give them random colours
  for (let i = 0; i < numberOfBoxes; i++) {
    box.push({ x: canvasSize / 2, y: canvasSize / 2 });
    boxVelocity.push({ x: 0, y: 0 });
    boxColor.push(getRandomColor());
  }

  // Create positions for the snake's segments
  for (let k = 0; k < 20; k++) {
    oldPos.push({ x: canvasSize / 2, y: canvasSize / 2 })
  }

  fill(255, 0, 0);
}

// If nearly off the canvas
function outOfBounds(num = 0) {
  if (box[num].x + 50 > canvasSize + (boxSize / 2))
    return 1; // Right
  else if (box[num].x - 50 < 0)
    return 2; // Left
  else if (box[num].y + 50 > canvasSize + (boxSize / 2))
    return 3; // Down
  else if (box[num].y - 50 < 0)
    return 4; // Up
  return 0;
}

let timer = 0;
let cooldown = 0;
function moveBoxes() {
  timer++;
  for (let i = 0; i < box.length; i++) {
    // Determines where the box should change velocity and stick to
    let moveIntervals = boxSize * 4;

    switch (outOfBounds(i)) {
      // If not out of bounds
      default:
        if (cooldown-- >= 0)
          break;

        // 0 - Do nothing | 1 - Change angle to horizontal | 2 - Change angle to vertical
        let changeDir = random([0, 1, 2]);
        // If the box's x aligns with a cross section in the path
        if (box[i].x % moveIntervals == 0 && changeDir == 1) {

          // Randomly choose a new direction (Right or Left)
          let moveDir = random([0, 1]) == 0 ? true : false;
          if (moveDir) {
            boxVelocity[i].x = -speed;
            boxVelocity[i].y = 0;

            // Snap box's y position to be within the path
            box[i].y = (Math.round(box[i].y / moveIntervals) * moveIntervals);

          }
          else {
            boxVelocity[i].x = speed;
            boxVelocity[i].y = 0;

            box[i].y = (Math.round(box[i].y / moveIntervals) * moveIntervals);
          }
          // Don't try to change angle for 50 frames
          cooldown = 50;
        }
        // If the box's y aligns with a cross section in the path
        else if (box[i].y % (Math.round(box[i].y / moveIntervals) * moveIntervals) == 0 && changeDir == 2) {

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
      case 1: // Right
        boxVelocity[i].x = -speed;
        boxVelocity[i].y = 0;

        box[i].y = Math.round(box[i].y / moveIntervals) * moveIntervals;
        break;
      case 2: // Left
        boxVelocity[i].x = speed;
        boxVelocity[i].y = 0;

        box[i].y = Math.round(box[i].y / moveIntervals) * moveIntervals;
        break;
      case 3: // Down
        boxVelocity[i].y = -speed;
        boxVelocity[i].x = 0;

        box[i].x = Math.round(box[i].x / moveIntervals) * moveIntervals;
        break;
      case 4: // Up
        boxVelocity[i].y = speed;
        boxVelocity[i].x = 0;

        box[i].x = Math.round(box[i].x / moveIntervals) * moveIntervals;
        break;
    }
    // Wait before moving the boxes
    if (timer >= 30) {
      box[i].x += boxVelocity[i].x;
      box[i].y += boxVelocity[i].y;
    }
  }
}

function getRandomColor() {
  var color;
  var colorArray = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF"
  ];
  for (var i = 0; i < colorArray.length; i++) {
    color = colorArray[Math.floor(Math.random() * colorArray.length)];
  }
  return color;
}

function draw() {
  background(0);
  // No outlines
  strokeWeight(0);

  // Make Strips
  // Uses sin() to make the colour pulsate
  fill((Math.sin(timer / 50) * 100), 0, 100 + (Math.sin(timer / 10) * 20));
  for (let i = 0; i < boxSize + 1; i++) {
    if (i % 2 != 0)
      continue;
    // Vertical Rows
    rect(((i * boxSize) * 2) - (boxSize / 2), 0, boxSize, canvasSize);
    // Horizontal Rows
    rect(0, ((i * boxSize) * 2) - (boxSize / 2), canvasSize, boxSize);
  }

  moveBoxes();

  // Sets positions of the snake's segments
  // oldPos with indeces >0 are set before 0 so they get set to what 0 was the last frame
  for (let k = oldPos.length - 1; k > 0; k--) {
    oldPos[k].x = oldPos[k - 1].x;
    oldPos[k].y = oldPos[k - 1].y;
  }
  oldPos[0].x = box[0].x;
  oldPos[0].y = box[0].y;

  for (let i = 0; i < box.length; i++) {

    // Draw snake
    for (let k = 0; k < oldPos.length; k++) {
      fill(255 + (Math.sin(timer / 10) * 50), 255 - (Math.sin(timer / 10) * 50), 0);
      square(oldPos[k].x - (boxSize / 2), oldPos[k].y - (boxSize / 2), boxSize);
    }

    // Draw boxes
    fill(boxColor[i]);
    square(box[i].x - (boxSize / 2), box[i].y - (boxSize / 2), boxSize);
  }
}
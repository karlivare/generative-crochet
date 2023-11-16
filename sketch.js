let singlecrochet;
// let halfdoublecrochet;
// let doublecrochet;
// let treblecrochet;
// let doubletreblecrochet;

let numCircles = 5; // Number of circles to be drawn
let imageWidth = 50; // Width of the image
let initialStitches = 6; // Initial number of stitches in the first round
let innermostCircleImages = initialStitches; // Number of images in the innermost circle

function updateCircles() {
  numCircles = max(2, min(int(this.value()), 10)); // Update the number of circles (limited to a range of 2 to 10)
}
function updateInnermostCircleImages() {
  initialStitches = max(6, min(int(this.value()), 10)); // Update the initial number of stitches (limited to a range of 6 to 10)
  innermostCircleImages = initialStitches; // Update the number of images in the innermost circle
}

function preload() {
  singlecrochet = loadImage('stitches/basic-stitches/single-crochet.png');
  // halfdouble = loadImage('stitches/basic-stitches/half-double-crochet.png');
  // doublecrochet = loadImage('stitches/basic-stitches/double-crochet.png');
  // treblecrochet = loadImage('stitches/basic-stitches/treble-crochet.png');
  // doubletreble = loadImage('stitches/basic-stitches/double-treble.png');
}

function setup() {
  createCanvas(700, 700);
  imageMode(CENTER);

  // Create a label for the number of circles input
  let circlesLabel = createDiv('Number of Circles:');
  circlesLabel.position(10, height + 10);
  // Create an input field for the number of circles
  let input = createInput();
  input.position(10, height + 10);
  input.value(numCircles);
  input.input(updateCircles);

  // Create a label for the initial number of stitches input
  let stitchesLabel = createDiv('Initial Stitches:');
  stitchesLabel.position(10, height + 40);
  // Create an input field for the initial number of stitches
  let stitchesInput = createInput();
  stitchesInput.position(10, height + 40);
  stitchesInput.value(initialStitches);
  stitchesInput.input(updateInnermostCircleImages);
}


function draw() {
  background(220);
  translate(width / 2, height / 2);

  let radius = 50; // Set a fixed radius
  
  for(let i = 0; i < numCircles; i++){
    let circumference = 2 * PI * radius;
    let numRepetitions = initialStitches + i * initialStitches; // Calculate the number of stitches based on the pattern
    let angleStep = 360 / numRepetitions;

    for(let j = 0; j < numRepetitions; j++){
      //for drawing each individual circle, calculate the the angle, and use that to figure out the x and y coordinates to place each img within the circle
      let angle = j * angleStep; // Use degrees directly
      let x = radius * cos(angle); // Calculate x-coordinate
      let y = radius * sin(angle); // Calculate y-coordinate

      //dealing with saving the states to "paste" the img around the circle
      push(); // Save the current transformation state
      translate(x, y); // Translate to the calculated position
      rotate(angle); // Rotate the image
      image(singlecrochet, 0, 0, imageWidth, imageWidth); // Display the image at (0, 0)
      pop(); // Restore the previous transformation state
    }

    
    innermostCircleImages += initialStitches; //find the variable of the new round (increased)
    numRepetitions = innermostCircleImages; //set the variable to how many stitches for the current round
    angleStep = 360 / numRepetitions; //calculate angle to rotate image at
    radius += imageWidth * 1.25; // Increase the radius for the next circle
  }
}

let singlecrochet;
let numCircles = 5; // Number of circles to be drawn
let imageWidth = 50; // Width of the image
let innermostCircleImages = 5; // Number of images in the innermost circle. Default

function updateCircles() {
  numCircles = max(2, min(int(this.value()), 10)); // Update the number of circles (limited to a range of 2 to 10)
}
function updateInnermostCircleImages() {
  innermostCircleImages = max(5, min(int(this.value()), 10)); // Update the number of images in the innermost circle (limited to a range of 6 to 10)
}

function preload() {
  singlecrochet = loadImage('stitches/basic-stitches/single-crochet.png');
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
  input.input(updateCircles); //call the function to update the circles when the user changes this and set this as the input


  // Create a label for the number of images in the innermost circle input
  let innermostImagesLabel = createDiv('Images in Innermost Circle:');
  innermostImagesLabel.position(10, height + 40);
   // Create an input field for the number of images in the innermost circle
   let innermostInput = createInput();
   innermostInput.position(10, height + 40);
   innermostInput.value(innermostCircleImages);
   innermostInput.input(updateInnermostCircleImages); // Call the function to update the number of images in the innermost circle
}


function draw() {
  background(220);
  translate(width / 2, height / 2);

  let maxRadius = min(width, height) * 0.4; // Max radius for the outer circle
  let minRadius = max(40, (innermostCircleImages * imageWidth) / (2 * PI));
  
  for(let i = 0; i < numCircles; i++){
    //for each circle, calculate its radius and how many times the image will repeat (this depends on circumference and 360 degrees)
    let radius = map(i, 0, numCircles - 1, maxRadius, minRadius);
    let circumference = 2 * PI * radius;
    let numRepetitions = int(circumference / imageWidth);
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

    // Adjust the angle step for the next circle based on the number of images in the innermost circle
    if (i === 0) {
      numRepetitions = innermostCircleImages;
    } else {
      numRepetitions = int(circumference / imageWidth);
    }
    angleStep = 360 / numRepetitions;
  }
}

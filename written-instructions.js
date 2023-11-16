let stitches = []; // Array to hold different stitch images
let numCircles = 5;
let imageWidth = 25;
let initialStitches = 6;
let innermostCircleImages = initialStitches;
let stitchIndices = []; // Array to hold the indices of the two random stitches
const generateButton = document.getElementById('generate-button');
const stitchNames = [
    'Single Crochet',
    'Half Double Crochet',
    'Double Crochet',
    'Treble Crochet',
    'Double Treble Crochet',
    '3 DC Cluster',
    '3 HDC Cluster',
    '5 DC Popcorn',
    '5 DC Shell',
    '3 Chain Picot',
    'Front Post DC',
    'Back Post DC'
  ];

function updateInstructionsList() {
  const ulElement = document.getElementById('written-instructions');
  ulElement.innerHTML = ''; // Clear previous instructions

  instructions.forEach((instruction) => {
    const liElement = document.createElement('li');
    liElement.textContent = instruction;

    ulElement.appendChild(liElement);
  });
}


function preload() {
  // Load stitch images into the array
  stitches.push(loadImage('stitches/basic-stitches/single-crochet.png'));
  stitches.push(loadImage('stitches/basic-stitches/half-double-crochet.png'));
  stitches.push(loadImage('stitches/basic-stitches/double-crochet.png'));
  stitches.push(loadImage('stitches/basic-stitches/treble-crochet.png'));
  stitches.push(loadImage('stitches/basic-stitches/double-treble-crochet.png'));
  stitches.push(loadImage('stitches/specialty-stitches/3-dc-cluster.png'));
  stitches.push(loadImage('stitches/specialty-stitches/3-hdc-cluster.png'));
  stitches.push(loadImage('stitches/specialty-stitches/5-dc-popcorn.png'));
  stitches.push(loadImage('stitches/specialty-stitches/5-dc-shell.png'));
  stitches.push(loadImage('stitches/specialty-stitches/3-chain-picot.png'));
  stitches.push(loadImage('stitches/specialty-stitches/front-post-DC.png'));
  stitches.push(loadImage('stitches/specialty-stitches/back-post-DC.png'));
}

function setup() {
  const canvas = createCanvas(700, 700);
  canvas.parent('canvas-container'); // Attach the canvas to the specified container
  imageMode(CENTER);

  // Randomly select two distinct indices for stitches
  randomizeStitchIndices();

}

function draw() {
  background('#FFFFFF');

  //clear the instructions array
  instructions = [];

  // Update numCircles and initialStitches based on user input
  numCircles = max(2, min(int(document.getElementById('total-rounds').value), 10));
  initialStitches = max(6, min(int(document.getElementById('stitches-round1').value), 10));
  innermostCircleImages = initialStitches;

  translate(width / 2, height / 2);

  let radius = 50;

  for (let i = 0; i < numCircles; i++) {
    let circumference = 2 * PI * radius;
    let numRepetitions = initialStitches + i * initialStitches;
    let angleStep = 360 / numRepetitions;

    for (let j = 0; j < numRepetitions; j++) {
      let angle = j * angleStep;
      let x = radius * cos(angle);
      let y = radius * sin(angle);

      push();
      translate(x, y);
      rotate(angle);

      // Randomly select one of the two stitches for each circle
      const stitchIndex = stitchIndices[i % 2];
      image(stitches[stitchIndex], 0, 0, imageWidth, imageWidth);

      pop();
    }

    // Create instructions for each round
    const roundNumber = i + 1;
    const stitchesInRound = initialStitches + i * initialStitches;
    const stitchTypeIndex = stitchIndices[i % 2]; // Get the index of the stitch type
    const stitchType = stitchNames[stitchTypeIndex];
    const instruction = `Round ${roundNumber}: ${stitchesInRound} ${stitchType}`;
    // Push the instruction to the array
    instructions.push(instruction);

    innermostCircleImages += initialStitches;
    numRepetitions = innermostCircleImages;
    angleStep = 360 / numRepetitions;
    radius += imageWidth * 1.25;
  }
  updateInstructionsList();
}

// Add an event listener to the "Generate a pattern" button
generateButton.addEventListener('click', function() {
    console.log("Button clicked!");
    randomizeStitchIndices(); // Perform your desired action when the button is clicked
    generateButton.classList.add('button-clicked'); // Add the 'button-clicked' class
  
    setTimeout(() => {
        generateButton.classList.remove('button-clicked');
    
        // Add a class to disable hover effect
        generateButton.classList.add('disable-hover');
        
        // Remove the class to re-enable hover after a delay
        setTimeout(() => {
          generateButton.classList.remove('disable-hover');
        }, 125);
      }, 0); //
    
  });
  

function randomizeStitchIndices() {
  stitchIndices = [];
  while (stitchIndices.length < 2) {
    const index = int(random(stitches.length));
    if (!stitchIndices.includes(index)) {
      stitchIndices.push(index);
    }
  }
}

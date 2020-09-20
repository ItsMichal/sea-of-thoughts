//CONFIG AND DEPENDENCIES

const socket = io(); // you don't actually need the url for now, it works magically -Michal 

let user_config = {
  "name": "Somebody"
};

//START CLASSES ----------------------------------------------------------------------------------------------------------------

//https://editor.p5js.org/wvnl/sketches/5wnuHAXKd
// star class //
class Star {
	constructor() {
		this.x = random(width);
		this.y = random(height);
		this.size = random(0.25, 3);
		this.t = random(TAU);
	}
	
	draw() {
		this.t += 0.02;
		var scale = this.size + sin(this.t) * 2;
		noStroke();
		ellipse(this.x, this.y, scale, scale);
	}
}

//Bottle Thing
class Bottle{
  constructor(message){
    this.empty = false;
    this.message = message;
    this.timestamp = new Date();
    this.senders = user_config.name;
  }
}

//Class for the Bottle's 
class OceanBottle{ // for showing bottles in ocean
  constructor (from_left, y_offset, color, bottle){
    this.from_left = from_left;
    this.y_offset = y_offset;
    this.bottle = bottle;
    this.color = color;
    this.distance = 20;
    this.theta = 0;
  }

  display(width, height){
    //Display the bottle at x and y
    this.move();
    let wunit = (width)/1920;
    let hunit = (height)/1080;
    fill(this.color);
    circle(this.x , (height/2) + this.y_offset, 100);

    let bottleImg = loadImage('content/img/bottleSoT.png'); // load the image from the drawing
    // to actually display the image:
    // image(bottleImg, 0,0) // for displaying at point 0,0 or sumthin
    // image(bottleImg, x coordinate, y coordinate, img.width, img.height)
    // can also load and display it all at once:
    // loadImage('location', img => {
        // image(bottleImg, 0, 0);
    // })
  }

  move(){
    //Move the bottle one frame, side to side
    this.x += (this.from_left) ? 0.2 : -0.2

  }

  clicked(){
    //When it's clicked display the message

  }

  //Checks if the Bottle is gone from the screen
  gone(width, height){
    if(this.x > width+this.distance || this.x < 0-this.distance || this.y > height+this.distance || this.y < -this.distance)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}


// END CLASSES ----------------------------------------------------------------------------------------------------------------


// START SOCKET-IO SERVER COMMUNICATION
// -----------------------------------------------------------------------------------------------------------------------------

//Send bottle to server
//socket.emit('outgoingBottle', bottleHere); 

//Receive bottle from server
socket.on('incomingBottle', (bottle) => {
    //do something with the bottle

    //Random from left or right
    let from_left = random(0,1) == 0; // 50/50 chance
    bottles.push(new OceanBottle(from_left, random(-10, 10), color(255), bottle));
  
});

// -----------------------------------------------------------------------------------------------------------------------------
// END SOCKET-IO SERVER COMMUNICATION

function changeColor() {
  var getTime = new Date(); // for day/night cycle?
  if(getTime.getHours() < 7 && getTime.getHours() > 20)
  {
    // background 
    document.body.style.backgroundColor = "#101d73";
  }
  
  else if(getTime.getHours() >= 7 && getTime.getHours() <= 20)
  {
    document.body.style.backgroundColor = "";
    // #80d2ff
  }
}

let outgoingNameInput; 
let outgoingMessageInput; 

function setUpTextBoxWrite() 
{
  text("Write a message and send it out to sea.", width/2, height/4);
  // Create input element 
  createCanvas(width/2, height/2);
  textSize(32);

  outgoingNameInput = createInput('outgoingName'); 
  outgoingMessageInput = createInput('outgoingMessage');

  outgoingMessageInput.position(width/2, height/6);
  outgoingNameInput.position(width/2, height/2);
  textAlign(CENTER);
  rect(width/2, height/2, width/4, height/4);
  fill(255, 237, 196);
  
}



function setUpTextBoxRead()
{
  text("You've found a bottle!", width/2, height/4);
  // Create input element 
  createCanvas(width/2, height/2);
  textSize(32);
  
  
  text(bottle.message, width/2, height/6);
  text(bottle.sender,width/2, height/2);
  textAlign(CENTER);
  rect(width/2, height/2, width/4, height/3);
  fill(255, 237, 196);
}

function makeBottle() {
  
  setUpTextBoxWrite();
  if (outgoingMessageInput != "")
  {
    // send it to server
    
  }
  else 
  {

  }
  
    //"Enter a message to send:", // temporary text
    //
    //document.getElementById("message").value; //the text inside message if message was a text field
    //document.getElementById("canvas").asdjhasdkj.asdkjashdkjas = message text

}

function displayBottleMessage()
{
  setUpTextBoxRead();
}

function requestBottle() {
    // request a bottle from the server
    
}

// let bottleHere = {
//     "bottle": bottle,
//     // other stuff to send out??
// }

// let messageSent = {
//     "writeMsg": "Enter a message to be sent:", 
//     "outgoingMessage": outgoingBottle,
//     socket.emit('outgoingBottle', bottleHere);
// }

let incomingBottle = {
    "messageInBottle": {}
    
};

let messageReceived = {
    "foundMsg": "You've found a message! Would you like to open it?",
    
    "showMessage": incomingBottle.messageReceived,
    
};




var stars = [];

function dayOrNight() {
  var getTime = new Date(); // for day/night cycle?
  if(getTime.getHours() < 7 || getTime.getHours() > 20)
  {
    background(13, 17, 59);
    // background 
    let c = color(255, 253, 224); // night time
    fill(c);
    noStroke();
    circle((3*width)/4, height/6, 200);
    fill(245, 243, 214);
    circle((3*width)/4 - 35.3, height/6 + 35.3, 100);
    circle((3*width)/4 +10, height/6, 50);
    circle((3*width)/4 +20, height/6 + 20, 25);



    for (var i = 0; i < stars.length; i++) {
      stars[i].draw();
    }
    
  }
  
  else if(getTime.getHours() >= 7 || getTime.getHours() <= 20)
  {
    background(151, 203, 220);
    let c = color(255, 223, 18); // day time
    fill(c);
    noStroke();
    circle((3*width)/4, height/6, 200);
    
    // #80d2ff
  }
  
  
}





// function onInput()
// {
//   clear();
//   fill(0,0,0); // black text
//   text(this.value(), 
 

// }


function parchmentStroke(){
  BASE_H,
  BASE_S - Math.random() * 5,
  BASE_B - Math.random() * 8,
  Math.random() * 10 + 75
}

function parchment(){
  background(15, 10, 100);
  10+ Math.random() * 5;
  const NUM_DOTS = 400;
  for(let i = 0; i < NUM_DOTS; i++)
  {
    let paperX = Math.random() * 20;
    let paperY = Math.random() * 20;
    //p5.ellipse(x, y, 10, 10);
    let theta = Math.random() * 2 * Math.PI;
    let segmentLength = Math.random() * 5+2; 
    let paperX2 = Math.cos(theta) * segmentLength + paperX;
    let paperY2 = Math.sin(theta) * segmentLength + paperY;
    parchmentStroke();
    p5.line(paperX, paperY, paperX2, paperY2);
    
  }

}

let testBottle; 
let bottles = [];

function setup() { 
  createCanvas(windowWidth, windowHeight); 

  //For Wave
  w = width + 100;
  dx = (TWO_PI / period) * xspacing;
  dx2 = (TWO_PI / period2) * xspacing;
  dx3 = (TWO_PI / period3) * xspacing;
  for (var i = 0; i < 1000; i++) {
		stars[i] = new Star();
	}

  yvalues = new Array(floor(w / xspacing));

  //testbottle
  let testBottle = new OceanBottle(true, width/2, height/2, color(255));
  bottles.push(testBottle);
  testBottle = new OceanBottle(true, width/7, height/2, color(255));
  bottles.push(testBottle);
  testBottle = new OceanBottle(false, (3*width)/4, height/2 + 20, color(255));
  bottles.push(testBottle);
}

//Make sure canvas is full screen
function windowResized() { 
  resizeCanvas(windowWidth, windowHeight); 
   //For Wave
   w = width + 100;
   dx = (TWO_PI / period) * xspacing;
   dx2 = (TWO_PI / period2) * xspacing;
   dx3 = (TWO_PI / period3) * xspacing;
 
   for (var i = 0; i < 1000; i++) {
		stars[i] = new Star();
	}
   yvalues = new Array(floor(w / xspacing));
}


function draw() {
  background(151, 203, 220);
  
  dayOrNight();
  makeNoisyWave();
  strokeWeight(10);
  fill(252, 224, 159)
  circle(width/2, height*10.8, height*20);
  drawAllBottles(width, height);
  
}


//Checks if the Bottles are gone, if not, draws Bottle
function drawAllBottles(width, height){
  for(var i = 0; i < bottles.length; i++){
    if(!bottles[i].gone(width, height))
      bottles[i].display(width, height);
  }
}


//----------------------------------------------------------------------WAVES
//Based off of https://p5js.org/examples/math-sine-wave.html
let xspacing = 60; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let theta2 = 0.0; // Start angle at 0
let amplitude = 50.0; // Height of wave
let amplitude2 = 30.0; // Height of wave
let amplitude3 = 40.0; // Height of wave


let amp_max = 100.0;
let amp_min = 50.0;
let period = 1000.0; // How many pixels before the wave repeats
let period2 = 800.0;
let period3 = 700.0;
let dx; // Value for incrementing x
let dx2;
let dx3;
let yvalues; // Using an array to store height values for the wave
function makeNoisyWave(){
    // Increment theta (try different values for
  // 'angular velocity' here)
  theta += 0.003;
  theta2 += -0.003;

  
  if(amplitude > amp_max){
    amplitude=amp_min;
  }
  //amplitude+=0.02
  

  // For every x value, calculate a y value with sine function
  let x = theta;
  let x2 = theta2+1;
  let x3 = theta*0.5+2;

  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * (amplitude) ;
    x += dx;
  }
  fill(0, 69, 129, 255);
  renderWave();
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x2) * (amplitude2) + (sin(x) * (amplitude))*0.2 + 5;
    x2 += dx2;
  }
  fill(0, 69, 129, 255);
  
  renderWave();
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x3) * (amplitude3) + 10;
    x3 += dx3;
  }
  fill(0, 69, 129, 255);
  renderWave();
}

function renderWave() {
  
  stroke(255);
  strokeWeight(sin(theta)*4 +5);
  
  // A simple way to draw the wave with an ellipse at each location
  beginShape()
  for (let x = 0; x < yvalues.length; x++) {
    
    vertex(x * xspacing, height / 2 + yvalues[x]);
    

  }
 
   vertex(width+1000, height)+100;
   vertex(-1000, height+100);
  
  
  endShape(CLOSE);
  
}



//JSON uses colon not equals


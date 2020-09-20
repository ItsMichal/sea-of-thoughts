const socket = io(); // you don't actually need the url for now, it works magically -Michal 

let sender = ""; // allows people to enter name



/*
* ok guys so 'outgoingBottle and incomingBottle are both gonna have
Bottles as their payload. but these are just the socket.io names like
*/


//Send bottle to server
//socket.emit('outgoingBottle', bottleHere); 

//Receive bottle from server
socket.on('incomingBottle', (bottle) => {
    //do something with the bottle

});


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

let bottle = {
    "empty": false,
    "message": {},
    "timestamp":  new Date(),
    "senders": ["jamie"]
}

function makeBottle() {
  
    //"Enter a message to send:", // temporary text
    //
    //document.getElementById("message").value; //the text inside message if message was a text field
    //document.getElementById("canvas").asdjhasdkj.asdkjashdkjas = message text

}

function requestBottle() {
    // request a bottle from the server
    
}

let bottleHere = {
    "bottle": bottle,
    // other stuff to send out??
}

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

function onInput()
{
  clear();
  text("Write a message and send it out to sea.", 20, 40);

}

function setUpTextBox() 
{
  createCanvas(600, 300); 
  textSize(28); 
  text("Write in the input box to display the text", 20, 40); 
  
  // Create input element 
  let inputElem = createInput(''); 
  inputElem.input(onInput); 
  inputElem.position(30, 60) 
  createCanvas(20, 80);
  textSize(32);
  nameInput = createInput('name');
  messageInput = createInput('message');
  
}

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
  
}


//----------------------------------------------------------------------WAVES
//Based off of https://p5js.org/examples/math-sine-wave.html
let xspacing = 60; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
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
  theta += 0.005;
  
  if(amplitude > amp_max){
    amplitude=amp_min;
  }
  //amplitude+=0.02
  

  // For every x value, calculate a y value with sine function
  let x = theta;
  let x2 = theta+1;
  let x3 = theta+2;

  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * (amplitude) ;
    x += dx;
  }
  fill(0, 69, 129, 255);
  renderWave();
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x2) * (amplitude2) + (sin(x) * (amplitude))*0.2 + 10;
    x2 += dx2;
  }
  fill(0, 69, 129, 255);
  
  renderWave();
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x3) * (amplitude3) + 20;
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


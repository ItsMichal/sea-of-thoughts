//CONFIG AND DEPENDENCIES

const socket = io(); // you don't actually need the url for now, it works magically -Michal 

let user_config = {
  "name": "a friend"
};

//START CLASSES ----------------------------------------------------------------------------------------------------------------

//https://editor.p5js.org/wvnl/sketches/5wnuHAXKd
// star class //
class Star {
	constructor() {
		this.x = random(width);
		this.y = random(height/2);
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
class OceanBottle{ d// for showing bottles in ocean
  constructor (from_left, y_offset, color, bottle){
    this.from_left = from_left;
    ;
    this.y_offset = y_offset+10;
    this.bottle = bottle;
    this.color = color;
    this.distance = 40;
    this.theta = 0;
    this.x = from_left ? -this.distance-10 : width+this.distance
    this.bottleImg = loadImage('/img/SoTBottle.png');
  }

  display(width, height){
    //Display the bottle at x and y
    this.move();
    let wunit = (width)/1920;
    let hunit = (height)/1080;
    fill(this.color);
    // circle(this.x , , 20);
    this.theta+=0.01;
    //rotate(sin(this.theta)/10);
     // load the image from the drawing
    // to actually display the image:
    image(this.bottleImg, this.x, (height/2) + this.y_offset, this.bottleImg.width/6, this.bottleImg.height/6) // for displaying at point 0,0 or sumthin

    //rotate(-sin(this.theta)/10);
    // image(bottleImg, x coordinate, y coordinate, img.width, img.height)
  }

  move(){
    //Move the bottle one frame, side to side
    this.x += (this.from_left) ? 0.3 : -0.3

  }

  clicked(){
    //When it's clicked display the message
    console.log();
    if (!displayParchment && dist(mouseX, mouseY, this.x+this.bottleImg.width/12, (height/2) + this.y_offset + this.bottleImg.height/12) < this.distance){
      displayBottleMessage(this.bottle);
      corkSFX.setVolume(0.3);
      corkSFX.play();
    }
  }

  //Checks if the Bottle is gone from the screen
  gone(width, height){
    if(this.x > width+(this.distance+10) || this.x < 0-(this.distance+10))
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


//AUDIO
let pianoMusic;
let penMusic;
let oceanMusic;
let musicPlaying = false;
let playButton;
let pauseButton;
// let pauseButton; 

function mousePressed(){
  for(let h = 0; h < bottles.length; h++){
    bottles[h].clicked();
  }
}


// START SOCKET-IO SERVER COMMUNICATION
// -----------------------------------------------------------------------------------------------------------------------------

//Send bottle to server
//socket.emit('outgoingBottle', bottleHere); 

//Receive bottle from server
socket.on('incomingBottle', (bottle) => {
    //do something with the bottle

    //Random from left or right
    let from_left = random(0,2) == 0; // 50/50 chance
    bottles.push(new OceanBottle(from_left, random(-50, 50), color(255), bottle));
  
});

let userString = "Getting User Count...";
socket.on('users', (usrStrng) =>{
  userString = usrStrng;
});

// -----------------------------------------------------------------------------------------------------------------------------
// END SOCKET-IO SERVER COMMUNICATION


//BOTTLES ----------------------
let testBottle; 
let bottles = [];

//Checks if the Bottles are gone, if not, draws Bottle
function drawAllBottles(width, height){
  for(var i = 0; i < bottles.length; i++){
    if(!bottles[i].gone(width, height)){
      bottles[i].display(width, height);
    }

      
  }
}
//END BOTTLES

function titleText(){
  fill(255);
  textAlign(LEFT);
  textSize(100/1920 * width);
  textFont('Josefin Sans');
  noStroke();
  text("Sea of Thoughts.", width/24, height/6);
  textSize(40/1920 * width);
  text("A place to connect. A place to write.\nHackMIT 2020", width/24, height/4.5);

}

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

//Buttons and stuff
let writeButton;
let sendButton;
let cancelButton;
let outgoingNameInput; 
let outgoingMessageInput; 
let parchmentImg;
let displayParchment = false;

function setUpTextBoxWrite() 
{
  writeButton.hide();
  displayParchment = true;
  
  textAlign(CENTER);
  textSize(32);
  text("Write a message and send it out to sea.", width/2, height/4);
  // Create input element 
  outgoingMessageInput.show();
  outgoingNameInput.show();
  sendButton.show();
  cancelButton.show();
}


let bottleMsgShowing;
let bottleSenderShowing;
let displayBottleContents = false;
function setUpTextBoxRead(bottle)
{
  bottleMsgShowing = bottle.message;
  bottleSenderShowing = bottle.senders;
  writeButton.hide();
  displayParchment = true;
  displayBottleContents = true;
  cancelButton.show();
  
}

function makeBottle() {
  if (outgoingMessageInput != "")
  {
    // send it to server
    user_config.name = outgoingNameInput.value();
    let newBottle = new Bottle(outgoingMessageInput.value());
    splashSFX.setVolume(0.4);
    splashSFX.play();
    socket.emit('outgoingBottle', newBottle);
    
  }
  else 
  {
    text("No <3");
  }
  
  hideEverything();
}

function displayBottleMessage(bottle)
{
  setUpTextBoxRead(bottle);
}

function requestBottle() {
    // request a bottle from the server
    
}


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


    // maybe should be in draw: ??? 
    // var deltaX = 0;
    // translate(deltaX, 0):
    // deltaX++;

    // add clouds:::
    // noStroke();
    // ellipsde(100, 100, 30);
    // ellipse(110,110,30);
    // ellipse(120,95,50,40);
    // ellipse(130,105,30);
    // ellipse(x coordinate, y coordinate, width of ellipse, height of ellipse)

    // if(deltaX + 85 > width) {
      // deltaX = -145;
    // }
  }
  
  
}


function hideEverything() { // called with the cancel button to hide
  // hide all buttons and text fields
  outgoingMessageInput.hide();
  outgoingNameInput.hide();
  sendButton.hide();
  cancelButton.hide();
  writeButton.show();
  // set parchment display to false
  displayParchment = false;
  displayBottleContents = false;
  
}

function playPause(){
  if(musicPlaying){
    pianoMusic.stop();
    oceanMusic.stop();
    playButton.show();
    pauseButton.hide();
    musicPlaying = false;
  }else{
    oceanMusic.setVolume(0.3);
    pianoMusic.setVolume(0.5);
    pianoMusic.loop();
    oceanMusic.loop();

    pauseButton.show();
    playButton.hide();
    
    musicPlaying = true;
  }
}

function keyPressed(){
  if(displayParchment && !displayBottleContents){
    penSFX.setVolume(0.3);
    penSFX.rate(Math.random()/4+0.75+0.125);
    penSFX.play();
  }
}


// MAIN CANVAS ---------------------------------------

function preload(){
  //preload soundW
  //Sound
  oceanMusic = loadSound("audio/ocean.mp3");
  pianoMusic = loadSound("audio/piano.mp3");
  penSFX = loadSound("audio/pen.mp3");
  splashSFX = loadSound("audio/splash.mp3");
  corkSFX = loadSound("audio/cork.mp3");
  
}

function setup() { 
  createCanvas(windowWidth, windowHeight); 

  //For Wave
  w = width + 180;
  dx = (TWO_PI / period) * xspacing;
  dx2 = (TWO_PI / period2) * xspacing;
  dx3 = (TWO_PI / period3) * xspacing;
  for (var i = 0; i < 100; i++) {
		stars[i] = new Star();
	}

  yvalues = new Array(floor(w / xspacing));

  //testbottle
  let message1 = new Bottle('Welcome to the Sea of Thoughts!');
  let message2 = new Bottle('"Be the change that you want to see in the world!"');
  let message3 = new Bottle('The world is better because you are in it.');
  let testBottle = new OceanBottle(true, 25, color(255), message1);
  bottles.push(testBottle);
  testBottle = new OceanBottle(true, -25, color(255), message2);
  setTimeout(()=>{bottles.push(testBottle);}, 5000);
  testBottle = new OceanBottle(false, -10, color(255), message3);
  bottles.push(testBottle);
  

  parchmentImg = loadImage('/img/parchmentImg.png');

  //Buttons
  writeButton = createButton("Write a Message");
  writeButton.position(width/2, height/4);
  writeButton.size(width/7,height/9);
  writeButton.class("writeButton");

  writeButton.mousePressed(setUpTextBoxWrite);
  
  
  outgoingNameInput = createInput().attribute('placeholder', "Enter name:").hide(); 
  outgoingNameInput.class("outgoingNameTextBox");
  outgoingNameInput.position(width/2 - width/10, (3*height)/4 - height/70);
  outgoingNameInput.size(width/5, height/35);

  outgoingMessageInput = createInput().attribute('placeholder', "Type your message:").hide(); 
  outgoingMessageInput.class("outgoingTextBox");
  outgoingMessageInput.position(width/2 - width/8, height/2-height/6);
  outgoingMessageInput.size(width/4, height/3);
  
  sendButton = createButton("Send Message").hide();
  sendButton.position(width/2 - width/20, (7*height/8)-(3*height/32));
  sendButton.size(width/10, height/8);
  sendButton.class("sendButton");
  sendButton.mousePressed(makeBottle);  

  cancelButton = createButton("Cancel").hide();
  cancelButton.position(width/2 - width/20, (7*height/8));
  cancelButton.size(width/10, height/8);
  cancelButton.class("cancelButton");
  cancelButton.mousePressed(hideEverything);

  playButton = createButton("Play Music").show();
  playButton.position(0,0);
  playButton.size(width/12, height/12);
  playButton.mousePressed(playPause);
  playButton.class("playButtonStyle");

  pauseButton = createButton("Pause Music").hide();
  pauseButton.position(0,0);
  pauseButton.size(width/12, height/12);
  pauseButton.mousePressed(playPause);
  pauseButton.class("pauseButtonStyle");
}

//Make sure canvas is full screen
function windowResized() { 
  resizeCanvas(windowWidth, windowHeight); 
   //For Wave
   w = width + 180;
   dx = (TWO_PI / period) * xspacing;
   dx2 = (TWO_PI / period2) * xspacing;
   dx3 = (TWO_PI / period3) * xspacing;
 
   for (var i = 0; i < 1000; i++) {
		stars[i] = new Star();
	}
   yvalues = new Array(floor(w / xspacing));

   //Resize
   writeButton.position(width/2, height/4);
   writeButton.size(width/7,height/9);
   outgoingNameInput.position(width/2 - width/10, (3*height)/4 - height/70);
   outgoingNameInput.size(width/5, height/35);
   outgoingMessageInput.position(width/2 - width/8, height/2-height/6);
   outgoingMessageInput.size(width/4, height/3);
   sendButton.position(width/2 - width/20, (7*height/8)-(3*height/32));
   sendButton.size(width/10, height/8);
   cancelButton.position(width/2 - width/20, (7*height/8));
   cancelButton.size(width/10, height/8);
   playButton.position(0,0);
   playButton.size(width/12, height/12);
   pauseButton.position(0,0);
   pauseButton.size(width/12, height/12);

   
}


function draw() {
  background(151, 203, 220);
  
  dayOrNight();
  makeNoisyWave(0, false, 1);
  strokeWeight(10);
  
  
  drawAllBottles(width, height);
  makeNoisyWave(100, true, 2);
  makeNoisyWave2(200, true, 3);

  fill(252, 224, 159)
  circle(width/2, height*10.8, height*20); //beach sand
  
  //users list:
  fill(212, 184, 119);
  noStroke(1);
  text(userString, width/4+20, height-height/10, width, height/10);

  
  titleText();

  if(displayParchment){
    image(parchmentImg, width/2 - parchmentImg.width*0.9, (2*height)/3 - parchmentImg.height*0.9, parchmentImg.width*1.8, parchmentImg.height*1.8);
  }

  if(displayBottleContents){
    textAlign(CENTER);
    
    textFont('Architects Daughter');
    fill(0);
    textSize(24);
    text("You've found a bottle!", width/2, height/2-height/5);
    textSize(30);
    text(bottleMsgShowing, width/2 - width/8, height/2-height/6, width/4, height/2);
    textSize(32);
    textStyle(BOLD);
    text("-"+bottleSenderShowing,width/2 - width/10, (5*height)/6 - height/70, width/5, height/10);
    textStyle(NORMAL);
  }
  
}

//END MAIN CANVAS ---------------------------------------





//----------------------------------------------------------------------WAVES
//Based off of https://p5js.org/examples/math-sine-wave.html
let xspacing = 90; // Distance between each horizontal location
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
function makeNoisyWave(offset, transparent, addy){
    // Increment theta (try different values for
  // 'angular velocity' here)
  theta += 0.003;
  theta2 += -0.003;

  
  if(amplitude > amp_max){
    amplitude=amp_min;
  }
  //amplitude+=0.02
  

  // For every x value, calculate a y value with sine function
  let x = theta+addy;
  let x2 = theta2+1+addy;
  let x3 = theta*0.5+2+addy;

  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * (amplitude) + offset;
    x += dx;
  }
  fill(0, 69, 129, 255);
  renderWave(transparent);
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x2) * (amplitude2) + (sin(x) * (amplitude))*0.2 + 5 + offset;
    x2 += dx2;
  }
  fill(0, 69, 129, 255);
  renderWave(transparent);
  // for (let i = 0; i < yvalues.length; i++) {
  //   yvalues[i] = sin(x3) * (amplitude3) + 10 + offset;
  //   x3 += dx3;
  // }
  // fill(0, 69, 129, 255);
  // renderWave();
}

function makeNoisyWave2(offset, transparent, addy){
  // Increment theta (try different values for
// 'angular velocity' here)
theta += 0.003;
theta2 += -0.003;


if(amplitude > amp_max){
  amplitude=amp_min;
}
//amplitude+=0.02


// For every x value, calculate a y value with sine function
let x = theta+addy;
let x2 = theta2+1+addy;
let x3 = theta*0.5+2+addy;

for (let i = 0; i < yvalues.length; i++) {
  yvalues[i] = sin(x) * (amplitude) + offset;
  x += dx;
}
fill(0, 69, 129, 255);
renderWave(transparent);
// for (let i = 0; i < yvalues.length; i++) {
//   yvalues[i] = sin(x3) * (amplitude3) + 10 + offset;
//   x3 += dx3;
// }
// fill(0, 69, 129, 255);
// renderWave();
}

function renderWave(transparent) {
  
  stroke(255);
  strokeWeight(sin(theta)*4 +7);
  if(transparent){
    fill(0, 69, 129, 200);
  }
  // A simple way to draw the wave with an ellipse at each location
  beginShape()
  for (let x = 0; x < yvalues.length; x++) {
    
    vertex(x * xspacing, height / 2 + yvalues[x]);
    

  }
 
   vertex(width+1000, height)+100;
   vertex(-1000, height+100);
  
  
  endShape(CLOSE);
  
}
//END WAVES ------------------------------------------------------
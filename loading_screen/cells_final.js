let on = false;
let pulseStop = false;
let size = 2;

let font;
let song;
let bass;
let wave;
let vehicles = [];
let intervalHandle = null; 
let timeoutHandle = null;
let intervalHandle2 = null;
let growing = true;

let text = ['EXPERIMENTAL','EXPERIMENTAL / MULTI-SENSORY','EXPERIMENTAL / MULTI-SENSORY / IMMERSIVE  ','REELIZE.STUDIO'];
index = 0;
let wordcount= 0;

function preload(){
  font = loadFont('data/NeueHaasUnica-Medium.otf');
  song = loadSound ('data/droning.mp3');
  bass = loadSound ('data/kick.mp3');
  wave = loadSound ('data/waves3.mp3');
}

function setup() {
  createCanvas (windowWidth,windowHeight);  
  song.setVolume(0.35);
  wave.setVolume(0.3);
  bass.setVolume(0.35);
  song.loop();

  let bounds2= font.textBounds('~', 0, 0, width/9);
  let posx2 = width / 2 - bounds2.w / 2;
  let posy2 = height / 2 + bounds2.h / 2;

  let cells = font.textToPoints('~',posx2,posy2,width/9,{ 
    sampleFactor: .3,
  });

for (var i = 0;i < cells.length;i++){
  var cell = cells[i];
  var vehicle = new Vehicle(cell.x,cell.y);
  vehicles.push(vehicle);
  }
   setTimeout(pulsing,5000);
}

function draw() {
  background (0);
  print (wordcount);

  for (var i =0; i < vehicles.length ;i++){
    var vehicle = vehicles [i];
    vehicle.behaviours();
    vehicle.update();
    vehicle.show();
    }      
    
    if (wordcount == text.length + 2){
      pulseStop = false;
    } 
}

function pulsing(){
intervalPulse = setInterval(pulse,70);
}

function pulse () {
  if (pulseStop == true){
    size = 2;
  } else if (size < 5 && growing){
  size = size + 1;
} else if (size == 5 && growing){
  growing = false;}
  else if (size > 2 && growing == false){
  size = size - 1;
  } else if (size == 2 && growing == false) {
    growing = true;
  }
}

 function cycleText (){
   intervalHandle = setInterval(loopingText,2000);
 }
  
 function mousePressed(){  
  timeoutHandle = setTimeout(cycleText,0);
   
   if (on == false){
   timeoutHandle;
   bass.play();
   wave.play();
  //  clearInterval (intervalPulse);

   for (let i = 0; i < vehicles.length; i++){
    vehicles[i].target.x = random(width);
    vehicles[i].target.y = random(height);
      }
   }

   if (on == true){
    bass.play();
    wave.play();
    wordcount = text.length + 5;

      for (let i = 0; i < vehicles.length; i++){
        vehicles[i].target.x = width/2 + random (-100000,100000);
        vehicles[i].target.y = height/2 + random (-100000,100000);
         }

      clearInterval(intervalHandle);
      index = text.length + 1;
   }
    on = true;
    pulseStop = true;
 }

function loopingText (){
  wordcount ++;

  let bounds = font.textBounds(text[index], 0, 0, width/25);
  let posx = width / 2 - bounds.w / 2;
  let posy = height / 2 + bounds.h / 2;

  let cells = font.textToPoints(text[index],posx,posy,width/25,{ 
     sampleFactor: 0.3
  });
    
     if (index < text.length){
   if (cells.length < vehicles.length){
   vehicles.splice(cells.length -1, vehicles.length - cells.length);
   bass.play();
  
  for (let i = 0;i < cells.length; i++){
    vehicles[i].target.x = cells[i].x;
    vehicles[i].target.y = cells[i].y; 
    }
  }
  
  else if (cells.length > vehicles.length){
     bass.play();
      for (let i = vehicles.length; i< cells.length;i++){
      let v = vehicles[i - vehicles.length].clone();
      vehicles.push(v);
    }
    
    for (let i=0; i<cells.length;i++){
      vehicles[i].target.x = cells[i].x;
      vehicles[i].target.y = cells[i].y;
    } 
  } else {
    for (let i = 0; i < cells.length; i++){
      vehicles[i].target.x = cells[i].x;
      vehicles[i].target.y = cells[i].y;
    }
  }
 } 
    
 index ++; 
//  if (index > text.length - 1){
//    index = 0;
//   }
}

class Vehicle {
  constructor(x,y){
    this.pos = createVector(width/2,height/2);
    this.target = createVector(x,y);
    this.vel = createVector();
    this.acc = createVector();
    this.maxspeed = 13;
    this.maxforce = 1.4;
  }
 
  behaviours(){
    let arrive = this.arrive(this.target);  
    this.applyForce(arrive);    
  }
  
  applyForce(f){
    this.acc.add(f);    
  }
  
  arrive (){
    let desired = p5.Vector.sub(this.target,this.pos);
    let d = desired.mag();
    let speed = this.maxspeed;
    if (d<100){
      speed = map(d,0,100,0,this.maxspeed);
    }
    desired.setMag(speed);
    let steer = p5.Vector.sub(desired,this.vel);
    steer.limit(this.maxforce);
    return steer;
  }
  
  update (){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
}

  show () {
    let random_mouseX = map(mouseX,0,width/2,random(-6,6),random(0,0));
    let random_mouseY = map(mouseY,0,height/2,random(-6,6),random(0,0));

    stroke (255);
    strokeWeight(size);
    point(this.pos.x+random(-1,1) ,this.pos.y+random(-1,1));
}

  clone () {
    var v = new Vehicle(this.pos.x,this.pos.y);
    
    v.pos.x =  this.pos.x;
    v.pos.y =  this.pos.y;

    v.vel.x = this.vel.x;
    v.vel.y = this.vel.y;

    v.acc.x = this.acc.x;
    v.acc.y = this.acc.y;

    return v;
    
  }
}

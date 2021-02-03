let on = false;

let font;
let font2;
let song;
let bass;
let wave;
let vehicles = [];
let intervalHandle = null; 
let timeoutHandle = null;

let text0 = '~';
let text1 = 'WELCOME TO,REELIZE.STUDIO,REELIZE.STUDIO,REELIZE.STUDIO.';
let sentences = [text0, text1];

let sentenceIndex = 0;
let words = sentences[sentenceIndex].split(',');
let index = 0;

function preload(){
  font = loadFont('data/Helvetica.otf');
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

  for (var i = 0;i < 500;i++){
    var vehicle = new Vehicle(random(width/2 +30,width/2 -30),random(height/2 +30,height/2 -30));
    vehicles.push(vehicle);    
  } 
}

function draw() {
  background (0);
  
  for (var i =0; i < vehicles.length ;i++){
    var vehicle = vehicles [i];
    vehicle.behaviours();
    vehicle.update();
    vehicle.show(2);
    }      
    
   if (on === false){
     for (let i =0; i < frameCount;i++){
     if (frameCount > 600 * i + 600 && frameCount < 600 * i + 900){
      fill (255);
      textAlign(CENTER);
      noStroke(0);
      text ('(CLICK THROUGH TEXT)',width/2, height/12);
      }
    }
  }
}

 function cycleText (){
   intervalHandle = setInterval(loopingText,3500);
 }
  
 function mousePressed(){  
   words = sentences[sentenceIndex].split(',');
   index = 0;
   timeoutHandle = setTimeout(cycleText,0);
    
   if (on==false){
   timeoutHandle;
   bass.play();
   }
   
   on = true;
   wave.play();
   
   if (on == true){
     
     clearInterval (intervalHandle);
     intervalHandle;
     
     for (let i = 0; i < vehicles.length; i++){
     vehicles[i].target.x = random(width);
     vehicles[i].target.y = random(height);
      }
      
     sentenceIndex ++;

     if (sentenceIndex === sentences.length){
     sentenceIndex = 0;
     }   
   }
 }

function loopingText (){
   
  let bounds = font.textBounds(words[index], 0, 0, width/15);
  let posx = width / 2 - bounds.w / 2;
  let posy = height / 2 + bounds.h / 2;

  let cells = font.textToPoints(words[index],posx,posy,width/15,{ 
     sampleFactor: 0.3
  });
    
    if (index < words.length){
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
 if (index > words.length - 1){
   index = 0;
  }
}

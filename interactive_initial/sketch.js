let textWeight = 1;
let scrollDelta = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(230);
  stroke (0); 
  strokeWeight(textWeight);

  let x1 = map(mouseX,0,width,width/2-84,width/2-21);
  let y1 = map(mouseX,0,width,height/2-140,height/2-140);
  let x2 = map(mouseX,0,width,width/2-84,width/2-131);
  let y2 = map(mouseX,0,width,height/2-20,height/2+140);
  let x3 = map(mouseX,0,width,width/2-84,width/2-91);
  let y3 = map(mouseX,0,width,height/2+140,height/2+140);
  let x4 = map(mouseX,0,width,width/2-44,width/2-59);
  let y4 = map(mouseX,0,width,height/2+140,height/2+55);
  let x5 = map(mouseX,0,width,width/2-44,width/2+59);
  let y5 =map(mouseX,0,width,height/2+20,height/2+55);
  let x6 = map(mouseX,0,width,width/2+84,width/2+91);
  let y6 = map(mouseX,0,width,height/2+20,height/2+140);
  let x7 = map(mouseX,0,width,width/2+84,width/2+131);
  let y7 = map(mouseX,0,width,height/2-20,height/2+140);
  let x8 = map(mouseX,0,width,width/2-44,width/2+21);
  let y8 = map(mouseX,0,width,height/2-20,height/2-140);
  let x9 = map(mouseX,0,width,width/2-44,width/2-21);
  let y9 = map(mouseX,0,width,height/2-80,height/2-140);
  let x10 = map(mouseX,0,width,width/2+84,width/2-47);
  let y10 = map(mouseX,0,width,height/2-80,height/2+26);
  let x11 = map(mouseX,0,width,width/2+84,width/2+47);
  let y11= map(mouseX,0,width,height/2-140,height/2+26);
                
  line (x1,y1,x2,y2);
  line (x2,y2,x3,y3);
  line (x3,y3,x4,y4);
  line (x4,y4,x5,y5);
  line (x5,y5,x6,y6);
  line (x6,y6,x7,y7);
  line (x7,y7,x8,y8);
  line (x8,y8,x9,y9);
  line (x9,y9,x10,y10);
  line (x10,y10,x11,y11);
  line (x11,y11,x1,y1);
}

function mouseWheel (event){
  scrollDelta = event.delta;
  if (event.delta > 0){
    if (textWeight < 62){
    textWeight++;
  }
  } else if (event.delta < 0){
    if (textWeight > 1){
    textWeight--;
  }
  }
  return false;
}
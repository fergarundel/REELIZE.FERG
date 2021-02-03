class Vehicle {
  constructor(x,y){
    this.pos = createVector(width/2,height/2);
    this.target = createVector(x,y);
    this.vel = createVector();
    this.acc = createVector();
    this.maxspeed = 10;
    this.maxforce = 0.7;
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

  show (size) {
    stroke (255);
    strokeWeight(size);
    point(this.pos.x+random(-2,2),this.pos.y+random(-2,2));
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

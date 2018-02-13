const Person = require('./person.js');

class Elevator {
  constructor(){
    this.floor      = 0;    //current floor level of the elevator
    this.MAXFLOOR   = 10;   //maximum number of floors 
    this.requests   = [];   //array to store all the floors that passengers requested (origin + destination)
    this.waitingList = [];  //list of passengers that pressed button and waiting for the elevator
    this.passengers  = [];  //list of passedngers that are inside the elevator
    this.onOff;             //used to set or clear intervals, when it is off then the elevator isn't moving.
    this.direction = "";    //represents direction of the elevator ('up' or 'down'; empty - when elevator is off)
  }

  start() {                 //turning on the elevator
    this.onOff = setInterval(()=>{ 
      this.update(); 
    }, 1000);
   }

  stop() {                //turning off the elevator
    clearInterval(this.onOff);
    this.direction = "up";
   }

  update() {
    this.nextFloor();   
    this._passengersEnter();
    this._passengersLeave();
    this.log();
  }

  _passengersEnter() {
    for(var i = 0; i < this.waitingList.length; i++){
      if(this.waitingList[i].originFloor === this.floor){
        console.log(`${this.waitingList[i].name} has entered the elevator`);
        this.passengers.push(this.waitingList[i]); //adding the passenger from Waiting list to the list of Passengers inside the elevator
        this.requests.push(this.waitingList[i].destinationFloor); //adding destination floor to the requested floors array
        this.requests = this.requests.filter(floor => floor !== this.floor); //removing origin floor from the requested floors array
        this.waitingList.splice(i, 1); //removing the passenger from the waiting list
      }
    }
   }

  _passengersLeave() {
    if(this.passengers.length === 0) //checking if there any passengers left inside the elevator
      return;
    for(var i = 0; i < this.passengers.length; i++){
      if(this.passengers[i].destinationFloor === this.floor){ 
        console.log(`${this.passengers[i].name} has left the elevator`); 
        this.requests = this.requests.filter(floor => floor !== this.floor); //removing the current floor from the requested array
        this.passengers.splice(i, 1); //removing passengers from the elevator
      }
    }
   }

   nextFloor(){ //this function is used to determine the next move of the elevator (up or down)
    if(this.requests.length === 0){
      if(this.floor == 0){ //if no requests - elevator goes to ground level 
        this.stop();      //if it is already on the ground level then it goes off
      }
      else{
        this.floor--; 
        console.log('Currently no requests - heading back to the waiting floor 0');
      }
      return;
    } else if(this.direction.includes('up') && Math.min(this.requests.filter(floor => floor > this.floor)) !== 0) {
        this.floorUp();
    }
    else
      this.floorDown();
   }

  floorUp() { //going 1 floor up
    if(this.floor + 1 > this.MAXFLOOR) { //making sure it doesn't go above the max level
      this.direction = 'down';
      return;
    }
    this.floor++;
    this.direction = 'up';
  }

  floorDown() { //going 1 floor down
    if(this.floor - 1 < 0){ //making sure it doesn't go below ground level
      this.direction = 'up';
      this.floorUp();
      return;
    }
    this.floor--;
    this.direction = 'down';
  }

  call(passenger) {
    if(this.requests.length === 0) //if the elevator's queue is empty - start the elevator
      this.start();
    this.requests.push(passenger.originFloor); //add passenger's origin floor to the requests array 
    this.waitingList.push(passenger); //add passenger to the waiting list
   }

  log() {
    //console.log("      Direction: " + this.floor + " | Floor: " + this.floor);
    console.log(
      `      Floor: ${this.floor}
      Direction: ${this.direction},
      Requsted floor(s): ${this.requests}
      Passenger(s) waiting: ${this.waitingList.map(a => a.name)}
      Passenger(s) inside: ${this.passengers.map(a => a.name)}\n`
    );

   }
}

module.exports = Elevator;

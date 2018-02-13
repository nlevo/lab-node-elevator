const Elevator = require('./elevator.js');
const Person = require('./person.js');

var elevator = new Elevator();



var nicolas = new Person ('Nicolas', 5, 8 );
var natalia = new Person ('Natalia', 5, 7 );
var tatyana = new Person ('Tatyana', 8, 9 );
var oleg = new Person ('Oleg', 3, 0 );
var igor = new Person ('Igor', 9, 5);

setTimeout(function() {
    elevator.call(nicolas);
}, 2000);

setTimeout(function() {
    elevator.call(natalia);
}, 1000);

setTimeout(function() {
    elevator.call(tatyana);
}, 3000);

setTimeout(function() {
    elevator.call(oleg);
}, 4000);

setTimeout(function() {
    elevator.call(igor);
}, 2000);
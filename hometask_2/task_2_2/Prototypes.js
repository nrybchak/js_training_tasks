function Car(color, year) {
    this.color = color;
    this.year = year;
}

Car.prototype.giveInfo = function() {
    console.log("My color is " + this.color + " and year is " +this.year);
}

function BMW(color, year, factory) {
    Car.call(this, color, year);
    this.factory = factory;
}

BMW.prototype = Object.create(Car.prototype);
BMW.prototype.constructor = BMW;

BMW.prototype.giveInfo = function() {
    Car.prototype.giveInfo.call(this);
    console.log("And factory is " + this.factory);
}

function BMWX5(color, year, factory, owner) {
    BMW.call(this,color,year,factory);
    this.owner = owner;
}

BMWX5.prototype = Object.create(BMW.prototype);
BMWX5.prototype.constructor = BMWX5;

BMWX5.prototype.giveInfo = function() {
    BMW.prototype.giveInfo.call(this);
    console.log("Owned by " + this.owner);
}

let myBMWx5 = new BMWX5('black', 2017, 'Munich', 'Super Guy');
myBMWx5.giveInfo();
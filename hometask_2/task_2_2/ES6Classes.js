'use strict';

class Car {
    constructor(color, year) {
        this._color = color;
        this.year = year;
    }

    get color() {
        return this._color;
    }

    set color(color) {
        this._color = color;
    }

    giveInfo() {
        console.log("My color is " + this.color + " and year is " +this.year);
    }
}

class BMW extends Car {
    constructor(color, year, factory) {
        super(color, year);
        this.factory = factory;
    }

    giveInfo() {
        super.giveInfo();
        console.log("And factory is " + this.factory);
    }
}

class BMWX5 extends BMW {
    constructor(color, year, factory, owner) {
            super(color, year, factory);
            this._owner = owner;
    }

    get owner() {
            return this._owner;
        }

    set owner(owner) {
        this._owner = owner;
    }

    giveInfo() {
        super.giveInfo();
        console.log("Owned by " + this._owner);
    }
}

let myBMWx5 = new BMWX5('black', 2017, 'Munich', 'Super Guy');
myBMWx5.giveInfo();
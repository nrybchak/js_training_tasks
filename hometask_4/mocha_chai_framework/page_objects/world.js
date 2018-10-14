'use strict';

const HomePage = require('./pages/HomePage');
const LocationsPage = require('./pages/About/LocationsPage');
// const baseUrl = browser.baseUrl;

class World {
	constructor (){
		this.HomePage = new HomePage();
		this.LocationsPage = new LocationsPage();
		this.HomeUrl = `^${browser.baseUrl}$`;
	}
}

module.exports = new World();
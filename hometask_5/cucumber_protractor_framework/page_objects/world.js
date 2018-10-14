'use strict';

const HomePage = require('./pages/HomePage');
const LocationsPage = require('./pages/About/LocationsPage');
const WhatWeDoPage = require('./pages/About/WhatWeDoPage');

const DevOpsPage = require('./pages/Solutions/DevOpsPage');
// const baseUrl = browser.baseUrl;

class World {
	constructor (){
		this.HomePage = new HomePage();
		this.LocationsPage = new LocationsPage();
		this.WhatWeDoPage = new WhatWeDoPage();
		this.DevOpsPage = new DevOpsPage();
		this.HomeUrl = `^${browser.baseUrl}$`;
	}
}

module.exports = new World();
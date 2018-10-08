'use strict';

const HomePage = require('./pages/HomePage');
const WhatWeDoPage = require('./pages/WhatWeDoPage');
const DevOpsPage = require('./pages/DevOpsPage');

class World {
	constructor (){
		this.HomePage = new HomePage();

		this.HomeUrl = `^${browser.baseUrl}$`;

		this.WhatWeDoPage = new WhatWeDoPage();

		this.DevOpsPage = new DevOpsPage();
	}
}

module.exports = new World();
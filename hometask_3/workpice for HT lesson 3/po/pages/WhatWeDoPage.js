'use strict';

const BasePage = require("./BasePage");

class WhatWeDoPage extends BasePage{
	constructor (){
		super();

        this.DescriptionTitle = element(by.xpath("//div[@class='header-content-container center']/div/h1"));
	}
}

module.exports = WhatWeDoPage;
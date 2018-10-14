'use strict';

const BasePage = require("../BasePage");

class WhatWeDoPage extends BasePage{
	constructor (){
		super();

        this.DescriptionTitle = element(by.css("div.header-content-container.center div h1"));
	}
}

module.exports = WhatWeDoPage;
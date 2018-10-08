'use strict';

const BasePage = require("./BasePage");

class DevOpsPage extends BasePage{
	constructor (){
		super();
        this.DevOpsPractices = element.all(
        by.xpath("//div[@class='et_pb_section top-panel et_pb_section_1 et_pb_with_background et_section_regular']//h4"));
	}
}

module.exports = DevOpsPage;
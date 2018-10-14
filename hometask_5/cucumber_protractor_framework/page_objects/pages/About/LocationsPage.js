'use strict';

const BasePage = require("../BasePage");

class LocationsPage extends BasePage{
	constructor (){
		super();
		this.LocationsHeader = element(by.css('.header-content h1'));
		this.LocationsBelarus = element(by.css("div.et_pb_column.et_pb_column_1_2.et_pb_column_6 p"));
		this.LocationsList = element.all(by.css('.location-blocks__city p'));
	}
}

module.exports = LocationsPage;
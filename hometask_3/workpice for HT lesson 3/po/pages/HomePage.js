'use strict';

const BasePage = require("./BasePage");

class HomePage extends BasePage{
	constructor (){
		super();

        this.ExadelBlock = element(by.css(".et_pb_section:nth-child(1)"));
        this.ExadelInfo = this.ExadelBlock.element(by.css('.header-content p'));
        this.SpeakWithExpertsLink = this.ExadelBlock.element(by.css('.et_pb_more_button'));

        this.ServicesBlock = element(by.css(".et_pb_section:nth-child(2)"));
        this.ViewAllServicesLink = this.ServicesBlock.element(by.css('.no-bg-button'));
        this.ServiceImages = this.ServicesBlock.$$('.et_pb_blurb_content');

        this.NewsBlock = element(by.css(".et_pb_section:nth-child(3)"));
        this.BlogColumn = this.NewsBlock.element(by.css('.et_pb_column_2'));
        this.ReadMoreButton = this.BlogColumn.element(by.css('.read-more-btn'));
        this.LocationColumn = this.NewsBlock.element(by.css('.et_pb_column_3 '));
        this.SeeOurLocationButton = this.LocationColumn.element(by.css('.read-more-btn'));

        this.OurWorkBlock = element(by.css(".et_pb_section:nth-child(4)"));
        this.OurWorkBlockClientsFeedBacksLink = this.OurWorkBlock.element(by.css('.et_pb_more_button'));

        this.ClientslogoBlock = element(by.css(".et_pb_section:nth-child(5)"));
        this.ClientsLogos = this.ClientslogoBlock.$$('img');

        this.ContactUsBlock = element(by.css(".et_pb_section:nth-child(6)"));
        this.ContactUsLink = this.ContactUsBlock.element(by.css('.et_pb_button'));

        this.AcceptCookiesButton = element(by.id("cn-accept-cookie"));
        this.DevOpsButton = element(by.xpath("//li[@id='mega-menu-item-183819']/a[text()='DevOps']"));
	};
}

module.exports = HomePage;
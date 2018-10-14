'use strict';

class Header{
	constructor (){

        this.Header = element(by.css("header#main-header"));

        this.HeaderLogo = this.Header.element(by.css('.large'));
        this.SolutionsButton = this.Header.element(by.css('#mega-menu-item-176024'));
        this.IndustriesButton = this.Header.element(by.css('#mega-menu-item-183744'));
        this.OurWorkButton = this.Header.element(by.css('#mega-menu-item-176030'));
        this.AboutButton = this.Header.element(by.css('#mega-menu-item-176037'));
        this.AboutLocationButton = element(by.css("#mega-menu-item-176039 a"));
        this.NewsButton = this.Header.element(by.css('#mega-menu-item-179671'));
        this.ContactButton = this.Header.element(by.css('.cta-contact-us'));
        this.CallUsNumber = this.Header.element(by.css('.phone-number'));
        
        this.LanguageBlock = this.Header.element(by.css('.langs-switcher'));
        this.SelectedLanguage = this.LanguageBlock.element(by.css('#lang-selected'));
        this.Languages = this.LanguageBlock.$$('#langs .lang');

        this.SolutionsDropdownItems = this.SolutionsButton.$$('.mega-sub-menu .mega-menu-link');
        this.IndustriesDropdownItems = this.IndustriesButton.$$('.mega-sub-menu .mega-menu-link');
        this.OurWorkDropdownItems = this.OurWorkButton.$$('.mega-sub-menu .mega-menu-link');
        this.AboutDropdownItems = this.AboutButton.$$('.mega-sub-menu .mega-menu-link');
        this.NewsDropdownItems = this.NewsButton.$$('.mega-sub-menu .mega-menu-link');
	};
}

module.exports = Header;
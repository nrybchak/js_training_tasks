const { defineParameterType, Then, When, Given } = require('cucumber');
const world = require('../page_objects/world');
let chai = require('chai');
let chaiAsPromised = require("chai-as-promised");

defineParameterType({
      regexp: /"(.*?)"/,
      name: 'menuButton',
      useForSnippets: true,
      transformer: async function (givenValue) {
         let element;
         switch(givenValue) {
            case "Solutions" : element = await world.HomePage.Header.SolutionsButton;
                break;
            case "Industries" : element = await world.HomePage.Header.IndustriesButton;
                break;
            case "Our Work" : element = await world.HomePage.Header.OurWorkButton;
                break;
            case "About" : element = await world.HomePage.Header.AboutButton;
                break;
            case "News" : element = await world.HomePage.Header.NewsButton;
                break;
            case "Locations" : element = await world.HomePage.Header.AboutLocationButton;
                break;
         }
         return element;
      }
});

defineParameterType({
    regexp: /"(.*?)"/,
    name: 'locationCountry',
    useForSnippets: true,
    transformer: async function (givenValue) {
        let element;
        switch(givenValue) {
             case "Belarus" : element = await world.LocationsPage.LocationsBelarus;
                break;
             }
             return element;
          }
});

Given('I am on {string} page', async (page) => {
});

When('I move mouse on {menuButton} menu button', async (button) => {
      await browser.actions().mouseMove(button).perform();
});

When('I click on {menuButton} menu button', async (button) => {
      await browser.actions().click(button).perform();
});

When('I scroll to location {locationCountry}', async (element) => {
      let element_location = await element.getLocation();
      return browser.executeScript(`window.scrollTo(0, "${element_location.y}");`);
});
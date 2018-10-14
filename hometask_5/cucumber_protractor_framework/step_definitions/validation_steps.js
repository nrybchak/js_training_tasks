const { defineParameterType, Then } = require('cucumber');
const world = require('../page_objects/world');
let chai = require('chai');
let chaiAsPromised = require("chai-as-promised");

defineParameterType({
      regexp: /(.*?)/,
      name: 'pageTitle',
      useForSnippets: true,
      transformer: async function (givenValue) {
         let element;
         switch(givenValue) {
            case "Locations Page" : element = world.LocationsPage.LocationsHeader;
                break;
         }
         return element;
      }
});

defineParameterType({
      regexp: /(.*?)/,
      name: 'locationsCities',
      useForSnippets: true,
      transformer: async function (givenValue) {
        let element;
         switch(givenValue) {
            case "Location cities" : element =  await world.LocationsPage.LocationsList.map(function (elm) {
                   return elm.getText();
                });;
                break;
         }
         return element;
      }
});

defineParameterType({
      regexp: /(.*?)/,
      name: 'menuItems',
      useForSnippets: true,
      transformer: async function (givenValue) {
        let element;
         switch(givenValue) {
            case "Solutions" : element =  await world.HomePage.Header.SolutionsDropdownItems;
                break;
            case "Industries" : element = await world.HomePage.Header.IndustriesDropdownItems;
                break;
            case "Our Work" : element = await world.HomePage.Header.OurWorkDropdownItems;
                break;
            case "About" : element = await world.HomePage.Header.AboutDropdownItems;
                break;
            case "News" : element = await world.HomePage.Header.NewsDropdownItems;
                break;
         }
         return element;
      }
});

Then('{pageTitle} title should have text {string}', async (pageTitle, expected) => {
    let actual = await pageTitle.getText();
    let expect = chai.expect;
    return expect(actual).to.deep.equal(expected);
});

Then('{locationsCities} from {int} to {int} should equal to these locations:', async (allCities, startIndex, endIndex, expectedCities) => {
    let arrSize = endIndex - startIndex;
    let belarusianLocations = [arrSize];
    for(let i = startIndex, j = 0; i < endIndex; i++, j++) {
        belarusianLocations[j] = allCities[i];
    }
    let expected = [].concat.apply([], expectedCities.raw());
    return Promise.resolve(belarusianLocations).should.eventually.deep.equal(expected);
});

Then('I see {int} items of {menuItems}', async (number, items) => {
    let result = items.map(async function (elm) {
         return await elm.isDisplayed();
    });;
    let count = 0;
    for(element of result) {
        if(element)
            count++;
    }
    console.log(count);
    return Promise.resolve(number).should.eventually.deep.equal(count);
});
const world = require('../page_objects/world');
const utils = require('../utils/utils.js');
let chai = require('chai');
let chaiAsPromised = require("chai-as-promised");
const TIMEOUT = 20000;

describe("ABOUT LOCATIONS ", async () => {
    let tests_data = utils.readJSON('./tests_data/about_locations_data.json');

    beforeEach(async () => {
        await browser.manage().deleteAllCookies();
        await browser.get(browser.baseUrl);
        await browser.actions().mouseMove(world.HomePage.Header.AboutButton).perform();
        await browser.actions().click(world.HomePage.Header.AboutLocationButton).perform();
    });

    before(() => {
        chai.use(chaiAsPromised);
        chai.should();
    });

    it("verify text on the page is 'Exadel Locations'", async () => {
        let expect = chai.expect;
        let header_text = await world.LocationsPage.LocationsHeader.getText();
        return expect(header_text).to.be.equal('Exadel locations');
    });

    it(`verify Belarusian locations ${tests_data.checkBelarusianLocationsTest.locationsNames}`, async () => {
        let bel_data = tests_data.checkBelarusianLocationsTest;
        utils.scrollToElement(world.LocationsPage.LocationsBelarus);
        let arrSize = bel_data.locationsEndIndex - bel_data.locationsStartIndex;
        let belarusianLocations = [arrSize];
        for(let i = bel_data.locationsStartIndex, j = 0; i < bel_data.locationsEndIndex; i++, j++) {
            belarusianLocations[j] = await world.LocationsPage.LocationsList.get(i).getText();
        }
        return Promise.resolve(belarusianLocations).should.eventually.deep.equal(bel_data.locationsNames);
    });
});
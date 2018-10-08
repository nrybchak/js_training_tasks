const world = require('../../po/world');
const EC = protractor.ExpectedConditions;
const CUSTOM_TIMEOUT = 15 * 1000;

describe("SERVICES PAGE", () => {

    beforeEach(async () => {
        await browser.manage().deleteAllCookies();
        await browser.get(browser.baseUrl);
        await world.HomePage.AcceptCookiesButton.click();
        await browser.wait(EC.invisibilityOf(world.HomePage.AcceptCookiesButton), 5000);
        await world.HomePage.ViewAllServicesLink.click();
    });

    describe("Services page title is valid: ", () => {
        it(`verify that Services Page title is equal to 'What We Do | About | Exadel'`, async () => {
            const title = await browser.getTitle();
            return expect(title).toEqual('What We Do | About | Exadel');
        });
    });

    describe("Description section title is valid: ", () => {
        it(`verify that Description section title is equal to 'What We Do'`, async () => {
             const text = await world.WhatWeDoPage.DescriptionTitle.getText();
             return expect(text).toEqual('What We Do');
        });
    });
});
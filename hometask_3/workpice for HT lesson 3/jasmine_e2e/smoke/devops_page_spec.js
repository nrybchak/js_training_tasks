const world = require('../../po/world');
const EC = protractor.ExpectedConditions;
const CUSTOM_TIMEOUT = 15 * 1000;

describe("DEVOPS PAGE", () => {

    beforeEach(async () => {
        await browser.manage().deleteAllCookies();
        await browser.get(browser.baseUrl);
        await browser.actions().mouseMove(world.HomePage.Header.SolutionButton).perform();
        await browser.wait(EC.visibilityOf(world.HomePage.DevOpsButton), 5000);
        world.HomePage.DevOpsButton.click();
    });

    describe("DevOps process points contain: ", () => {
        it(`verify that DevOps elements equal to [Practice, Transformation, Delivery]`, async () => {
            let expectedList = [
                'DEVOPS PRACTICE',
                'DEVOPS TRANSFORMATION',
                'GLOBAL DELIVERY'
            ];
            let namesCorrect = [3];
            for(let i = 0; i < 3; i++) {
                 namesCorrect[i] = await world.DevOpsPage.DevOpsPractices.get(i).getText();
            }
            console.log(namesCorrect);
            return expect(namesCorrect).toEqual(expectedList);
        });
    });
});
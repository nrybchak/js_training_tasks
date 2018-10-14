'use strict';

let {After, Before, Status, BeforeAll} = require('cucumber');
let {setDefaultTimeout} = require('cucumber');
let chai = require('chai');
let chaiAsPromised = require("chai-as-promised");
const fs = require('fs');
setDefaultTimeout(120 * 1000);

Before("@smoke", async () => {
    await browser.manage().deleteAllCookies();
    browser.ignoreSynchronization = true;
    browser.driver.manage().window().maximize();
    await browser.get(browser.baseUrl);
    chai.use(chaiAsPromised);
    chai.should();
});

After(async function (testCase){
    if (testCase.result.status === Status.FAILED) {
        const screenShot = await browser.takeScreenshot();
        let decodedImage = new Buffer(screenShot, 'base64');
        return this.attach(decodedImage, 'image/png');
    }
});
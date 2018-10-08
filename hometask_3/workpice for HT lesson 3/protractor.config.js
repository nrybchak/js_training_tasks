'use strict';
const path = require("path");
const yargs = require("yargs").argv;
const HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    // directConnect: true,  
    baseUrl: 'https://exadel.com/',
//    capabilities: {
//        browserName: 'chrome',
//        shardTestFiles: true,
//        maxInstances: 2
//        // version: "66.0.3359.139"
//    },
     multiCapabilities: [{
         browserName: 'chrome',
         shardTestFiles: true,
         maxInstances: 2,
         version: "66.0.3359.139"
     }, {
         browserName: 'firefox'
     }],

    specs: [
        `jasmine_e2e/${yargs.spec || "*/*.js"}`
    ],
    // restartBrowserBetweenTests: true,
    onPrepare: function () {
        browser.waitForAngularEnabled(false);
        jasmine.getEnv().addReporter(new HtmlReporter({
                 baseDirectory: 'tmp/screenshots',
                 docTitle: 'My Reporter'
              }).getJasmine2Reporter());
        console.log("Hello from onPrepare()!");
    },
    beforeLaunch: function () {
        console.log("Hello from beforeLaunch()!");
    },
    onComplete: function () {
        console.log("Hello from onComplete()!");
    },
    allScriptsTimeout: 200000,
    getPageTimeout: 100000,
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};
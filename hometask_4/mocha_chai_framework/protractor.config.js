'use strict';

const path = require("path");
const yargs = require("yargs").argv;
const fs = require("fs-extra");

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'https://exadel.com/',
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: false,
        maxInstances: 2,
        version: "66.0.3359.139"
    },
    // multiCapabilities: [{
    //     browserName: 'chrome',
    //     version: "66.0.3359.139"
    // }, {
    //     browserName: 'firefox'
    // }],

     specs: [
         `mocha_smoke/${yargs.tag||"*.js"}`
     ],
    // restartBrowserBetweenTests: true,
    onPrepare: function () {
        browser.ignoreSynchronization = true;
        browser.driver.manage().window().maximize();
    },
    beforeLaunch: function () {
        const dir = path.resolve("./execution_reports/");
        console.log("Cleaning reports folder.");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        } else {
            fs.readdirSync(dir).forEach(file => {
                    let fileWithPath = path.resolve(dir + "/" + file);
                    const stat = fs.lstatSync(fileWithPath);
                    if(stat.isDirectory()) {
                        fs.removeSync(fileWithPath);
                    } else {
                        fs.unlinkSync(fileWithPath);
                    }
            });
        }
    },
    allScriptsTimeout: 200000,
    getPageTimeout: 100000,
    framework: 'mocha',
    mochaOpts: {
        reporter: 'mochawesome',
         reporterOptions: {
             reportDir: 'execution_reports',
             reportName: 'ReportMochaTests',
             reportTitle: 'Exadel.com Tests',
             reportPageTitle: `Report  + ${yargs.tag||"all"}`,
             takePassedScreenshot: true,
             clearOldScreenshots: true,
             shortScrFileNames: false,
             jsonReport: false,
             multiReport: true
         },
         timeout: 250000
    }
};
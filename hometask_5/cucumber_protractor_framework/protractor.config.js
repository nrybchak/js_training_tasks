'use strict';
const path = require("path");
const yargs = require("yargs").argv;
const reporter = require('cucumber-html-reporter');
const fs = require("fs-extra");

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    // directConnect: true,  
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
        './features/**.feature'
    ],
    // restartBrowserBetweenTests: true,
    // onPrepare: function () {
        // browser.ignoreSynchronization = true;
        // browser.driver.manage().window().maximize(); 
    // },
    afterLaunch: function () {
        let options = {
            theme: 'bootstrap',
            jsonDir: './execution_reports',
            // jsonFile: './output/cucumber.json',
            output: './execution_reports/cucumber_report.html',
            reportSuiteAsScenarios: true,
            launchReport: true,
            metadata: {
                "Browser": "Chrome",
                "Platform": "Windows 10",
                "Parallel": "Scenarios",
                "Executed": "Remote"
            }
        };

        reporter.generate(options);
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
    cucumberOpts: {
        require: path.resolve('./step_definitions/**.js'),
        tags: [`${yargs.tag||"@smoke"}`],
        ignoreUncaughtExceptions: true,
        format: ['json:execution_reports/cucumber.json']
    },
    allScriptsTimeout: 200000,
    getPageTimeout: 100000,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework')
};
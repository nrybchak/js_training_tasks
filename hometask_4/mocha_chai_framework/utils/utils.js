'use strict';

const fs = require('fs');

const scrollToElement = async (element) => {
    let element_location = await element.getLocation();
    return browser.executeScript(`window.scrollTo(0, "${element_location.y}");`);
};

const readJSON = function(path) {
    let obj = JSON.parse(fs.readFileSync(path, 'utf8'));
    return obj;
}

module.exports = {
    scrollToElement,
    readJSON
};
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const fs = require('fs');

module.exports.inputParameter = function(message) {
    return new Promise((resolve, reject) => {
        rl.question(message, (answer) => {
          resolve(answer);
        });
      });
}

module.exports.closeStream = function() {
    rl.close();
}

module.exports.readJSON = function(path) {
    obj = JSON.parse(fs.readFileSync(path, 'utf8'));
    return obj;
}

module.exports.outputJsonToFile = function(jsonObj, filePath) {
    json = JSON.stringify(jsonObj);
    fs.writeFileSync(filePath, json);
}
const generalFunc = require('../general/input_output.js');

function checkJSON(path) {
    let jsonObj = generalFunc.readJSON(path);
    let conditions = {};
    if(typeof(jsonObj.flag) !== 'boolean')
        conditions["flag"] = "Is not boolean";
    if(!Array.isArray(jsonObj.myPromises))
        conditions["myPromises"] = "Is not array";
    if(typeof(jsonObj.element) !== "object")
        conditions["element"] = "Is not object";
    if(jsonObj.screenshot !== null)
        conditions["screenshot"] = "Is not null";
    if(typeof(jsonObj.elementText) !== "string")
        conditions["elementText"] = "Is not string";
    if(jsonObj.allElementsText.toString().search("const") === -1)
        conditions["allElementText"] = "Does not contain 'const'";
    if(jsonObj.counter <= 10)
        conditions["counter"] = "Is not more than 10";
    if(jsonObj.config !== "Common")
        conditions["config"] = "Does not equal to 'Common'";
    if(jsonObj.const.toLowerCase() !== "first")
        conditions["const"] = "Does not equal to 'first'";
    if(!Array.isArray(jsonObj.parameters) || (jsonObj.parameters.lenth !== 8))
        conditions["parameters"] = "Is not array with length 8";
    if((typeof(jsonObj.description) !== "string") || ((jsonObj.description.length < 5)
            && jsonObj.description.length > 13))
        conditions["description"] = "Is not string with length more than 5 but less than 13";
    if(conditions === {})
        return "OK";
    generalFunc.outputJsonToFile(conditions, "./task4_jsons/outputs/myTest4.json");
    return conditions;
}

async function runTask4() {
    let path;
    try {
        path = await generalFunc.inputParameter("Input path to JSON: ");
        console.log(checkJSON(path));
    } catch(e) {
        console.log(e);
    } finally {
        generalFunc.closeStream();
    }
}

runTask4();
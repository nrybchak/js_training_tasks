const generalFunc = require('../general/input_output.js');
const xlsx = require('excel4node');

const fs = require('fs-extra');
const path = require('path');

async function readFilesInDir(dir, format) {
    let filenames;
    let formatFiles = [];
    try {
        let filenames = await fs.readdir(dir);
        for(filename of filenames) {
            if(filename.endsWith(format)) {
                formatFiles.push(filename);
            }
        }
        return formatFiles;
    } catch(e) {
        console.log(e);
    }
    return formatFiles;
}

let k = 1;

function traverse(jsonObj,i,j, ws) {
    for(let key in jsonObj) {
        ws.cell(k,j).string(key);
        if(typeof jsonObj[key] == 'object') {
            traverse(jsonObj[key],k,j+1,ws);
        } else {
            ws.cell(k,j+1).string(jsonObj[key].toString());
        }
        k=k+1;
    }
}

async function xlsxConverter(jsonPath, xlsxPath) {
    let jsonFiles = await readFilesInDir(jsonPath, "json");
    if(jsonFiles.length == 0)
        return "No JSONs to be converted!";
    let wb = new xlsx.Workbook();
    jsonFiles.forEach(function(jsonName) {
        let ws = wb.addWorksheet(jsonName);
        let jsonObject = JSON.parse(fs.readFileSync(path.join(jsonPath, jsonName), 'utf8'));
        traverse(jsonObject,1,1, ws);
    });
    wb.write(path.join(xlsxPath, "1.xlsx"));
    return "XLSX is created!";
}

async function runTask2_1() {
    let jsonPath, xlsxPath;
    try {
        jsonPath = await generalFunc.inputParameter("Input path to JSON: ");
        xlsxPath = await generalFunc.inputParameter("Input path where to save XLSX: ");
        console.log(await xlsxConverter(jsonPath, xlsxPath));
    } catch(e) {
        console.log(e);
    } finally {
        generalFunc.closeStream();
    }
}

runTask2_1();

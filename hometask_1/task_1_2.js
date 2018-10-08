const generalFunc = require('../general/input_output.js');

function isPalindrome(str) {
    str = str.toLowerCase();
    let arr = str.split("");
    let new_str = "";
    for(let i = str.length; i > 0; i--) {
        new_str += str[i-1];
    }
    if(new_str === str)
        return "String is palindrome";
    return "String is NOT palindrome";
}

async function runTask2() {
    let str;
    try {
        str = await generalFunc.inputParameter("Input String: ");
        console.log(isPalindrome(str));
    } catch(e) {
        console.log(e);
    } finally {
        generalFunc.closeStream();
    }
}

runTask2();

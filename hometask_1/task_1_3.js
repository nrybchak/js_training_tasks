const generalFunc = require('../general/input_output.js');

function replaceWithWord(str, ch_number, str_replace) {
    let arr = str.split(/\s|\?\s+|\.+\s+|\!\s+|\,\s+|\?\s+/);
    let new_str = str;
    for(let word of arr) {
        let upd_word;
        if(ch_number <= word.length) {
           upd_word = word.replace(word.charAt(ch_number-1), str_replace);
           new_str = new_str.replace(word, upd_word);
        }
    }
    return new_str;
}

async function runTask3() {
    let str, ch_number, str_replace;
    try {
        str = await generalFunc.inputParameter("Input initial text: ");
        ch_number = await generalFunc.inputParameter("Input number of character: ");
        str_replace = await generalFunc.inputParameter("Input word to replace with: ");
        console.log(replaceWithWord(str, ch_number, str_replace));
    } catch(e) {
        console.log(e);
    } finally {
        generalFunc.closeStream();
    }
}

runTask3();

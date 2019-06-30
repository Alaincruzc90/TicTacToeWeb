// Given a number and the number of decimals we need, round that number.
function round(value, decimals) {
    return Number(Math.round(value +'e'+ decimals)+'e-'+decimals);
}

// Given a string parse it to int and return it's int value or 0, if it is NaN.
// Also, check that the text is defined and replace any commas.
function mathParseInt(string) {
    if(string === undefined || string === '') return 0;
    const modifiedString = string.replace(',','');
    const parsed = parseInt(modifiedString);
    if (isNaN(parsed)) return 0;
    return parsed;
}

// Given a string parse it to int and return it's float value or 0, if it is NaN.
// Also, check that the text is defined and replace any commas.
function mathParseFloat(string) {
    if(string === undefined || string === '') return 0;
    const modifiedString = string.replace(',','');
    const parsed = parseFloat(modifiedString);
    if (isNaN(parsed)) return 0;
    return parsed;
}
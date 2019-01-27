/**
 * I'm using old-style JavaScript syntax to be compatble with all browsers.
 * 'var' isntead of 'let' and 'const', no arrow functions, and so on.
 */

// Consts 
var DIGITS = ['0', '1'];
var OPERATORS = ['+', '-', '*', '/'];

// Links to DOM object
var indicator = document.getElementById('res');
var buttons = document.getElementsByClassName('button');
for (var i = 0; i < buttons.length; i++)
    buttons[i].addEventListener("click", onButtonClick);

// Takes a single char for some of buttons 
function enterChar(char) {
    if (char === 'C') {
        // Clear operation
        indicator.innerHTML = '';
        return true;
    }
    if (char === '=') {
        // Evaluate operation
        indicator.innerHTML = calculateAsBinary(indicator.innerHTML);
        return true;
    }
    // Raw input
    indicator.innerHTML += char;
}

// onClick listener for every button
function onButtonClick(e) {
    var char = e.target.innerHTML;
    console.log('Button "%s" pressed', char);
    enterChar(char);
}

// Helper to conver evaluation to binary string
function dec2bin(dec){
//    return (dec >>> 0).toString(2);
    return Math.max(dec, 0).toString(2);
}

// Perform binary calculation for '0110+11001*10011/1001' style string
function calculateAsBinary(s) {
    var operator = '';
    var operand1 = '';
    var operand2 = '';
    var isSecondOperand = false;
    var nextOperationsTail = '';

    // Look for operands, operation and maybe "next operations tail"
    for (var i = 0; i < s.length; i++) {
        var c = s[i];
        if (DIGITS.includes(c)) {
            if (isSecondOperand) operand2 += c; else operand1 += c;
        } else
        if (OPERATORS.includes(c)) {
            if (operator !== '') {
               // Second operator found, there is "next operations tail"
               nextOperationsTail = s.substr(i);
               break;
            } 
            operator = c; 
            isSecondOperand = true;
        }
    }
    
    // Perform evaluation
    operand1 = Math.max(parseInt(operand1, 2), 0);
    operand2 = Math.max(parseInt(operand2, 2), 0);
    var result = '';
    switch (operator) {
        case '+':
            result = dec2bin(operand1 + operand2);
            break;
        case '-':
            result = dec2bin(operand1 - operand2);
            break;
        case '*':
            result = dec2bin(poperand1 * operand2);
            break;
        case '/':
            result = dec2bin(Math.floor(operand1 / operand2))
            break;
    }
    
    // Output resut, use recursion if there is "next operations tail"
    console.log('Result of "%s" operation is: %s, Next operations: %', operator, result, nextOperationsTail);
    if (nextOperationsTail === '') 
        return result;
    else // Recursion is needed
       return calculateAsBinary(result + nextOperationsTail);
}

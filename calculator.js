// All these functions are obsolete. just 1 line return anyway.
/*
function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function exponent(num1, num2){
    return Math.pow(num1, num2);
}

function squareRoot(num1){
    return Math.pow(num1, -2);
}
*/

// This function is just dandy. Very simple.
function operate(num1, operand, num2){
    if(operand == "+")
        return num1 + num2;
    if(operand ==  "-")
        return num1 - num2;
    if(operand == "*")
        return num1 * num2;
    if(operand == "/")
        return num1 / num2;
    if(operand == "^")
        return Math.pow(num1, num2);
    if(operand == "root")
        return Math.pow(num1, 1/num2);
    if(operand == "neg")
        putOnScreen(-num1);
}   

// Add eventListeners to the calculator buttons
function eventCreate(){
    let i = 0;
    for(i = 0; i <= 9; i++)
    {
        let element = document.getElementById(i);
        element.addEventListener("click", putOnScreen);
    }
    document.getElementById(".").addEventListener("click", putOnScreen);
    document.getElementById("clear").addEventListener("click", clear);
    document.getElementById("+").addEventListener("click", storeOperator);
    document.getElementById("-").addEventListener("click", storeOperator);
    document.getElementById("*").addEventListener("click", storeOperator);
    document.getElementById("/").addEventListener("click", storeOperator);
    document.getElementById("^").addEventListener("click", storeOperator);
    document.getElementById("root").addEventListener("click", storeOperator);
    document.getElementById("neg").addEventListener("click", negate);
    document.getElementById("=").addEventListener("click", evaluate);
}

// If I press negative, this will handle that.
function negate(){
    if(displayVal == "")
        return;
    let screen = document.getElementById("display");
    let str = screen.innerText;
    if(str.indexOf("-") > -1)
    {
        let arr = [...str];
        arr[0] = "";
        arr = arr.join("");
        screen.innerText = arr;
    }
    else
        screen.innerText = "-" + screen.innerText;

    displayVal = Number(screen.innerText);
}

// This is probably pretty garbage
let operand = "";
function evaluate(){
    // If there's no prevDisplayVal
    // That means there is not 2 total numbers to use.
    if(displayVal == "")
        return;
    if(prevDisplayVal == "")
        return;
    if(operand == "")
        return;
    let screen = document.getElementById("display");
    displayVal = operate(prevDisplayVal, operand, displayVal);
    screen.innerText = displayVal;
}

let prevOperand = ""; 
function storeOperator(){
    let bob = document.getElementById("display");
    // If there's nothing in display, don't use an operator.
    if(displayVal == "")
        return;
    
    opCount += 1;
    // If there is something in display, proceed.
    if(displayVal != "")
    {
        // Only 1 number, need 1 more
        if(prevDisplayVal == "")
        {
            prevDisplayVal = displayVal;
            operand = this.id;
        }
        // enough nums, proceed!
        else
        {
            evaluate();
            operand = this.id;
            prevDisplayVal = displayVal;
            if(operand == "^" || operand == "root")
            {
                prevDisplayVal = "";
            }
            else
            {
                
            }
        }
    }
    resetScreen = 0;
}

// simple fine.
function clear(){
    let bob = document.getElementById("display");
    bob.innerText = "0";
    opCount = 0;
    prevDisplayVal = "";
    displayVal = "";
    prevOperand = "";
    operand = "";
}

// kinda trash
let opCount = 0;
let prevDisplayVal = "";
let displayVal = "";
let resetScreen = 0;
function putOnScreen(){
    let screen = document.getElementById("display");
    if(opCount >= 1)
    {
        if (resetScreen < 1)
        {
            screen.innerText = "";
            resetScreen = 1;
        }
    }
    let str = screen.innerText;
    if(str.includes("."))
        if(this.id == ".")
            return;
    screen.innerText += this.id;
    if(screen.innerText != "0.")
        displayVal = Number(screen.innerText);
//    alert(displayVal);
}

eventCreate();
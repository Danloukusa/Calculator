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

function operate(num1, operand, num2){
    if(operand == "+")
        return add(num1,num2);
    if(operand ==  "-")
        return subtract(num1,num2);
    if(operand == "*")
        return multiply(num1,num2);
    if(operand == "/")
        return divide(num1,num2);
}

// I didn't feel like manually making each element. buuuut, seems like this was slower anyway.
function fillCalculator(){
    let box = document.getElementById("gridContainer");
    let i = 0;
    for(i = 0; i <= 9; i++)
    {
        let element = document.createElement("button");
        element.id = i;
        element.className = "Number";
        element.innerText = i;
        element.addEventListener("click", putOnScreen);
        box.appendChild(element);
    }
    document.getElementById("clear").addEventListener("click", clear);
    document.getElementById("+").addEventListener("click", storeOperator);
    document.getElementById("-").addEventListener("click", storeOperator);
    document.getElementById("*").addEventListener("click", storeOperator);
    document.getElementById("/").addEventListener("click", storeOperator);
    document.getElementById("=").addEventListener("click", evaluate);
}
let operand = "";
function evaluate(){
    if(operand == "")
        return;
    let screen = document.getElementById("display");
        screen.innerText = operate(prevDisplayVal, operand, displayVal);
}

function storeOperator(){
    let bob = document.getElementById("display");
    if(opCount >= 1)
    {
        bob.innerText = operate(prevDisplayVal, operand, displayVal);
        prevDisplayVal = Number(bob.innerText);
        displayVal = 0;
        operand = this.id;
        opCount += 1;
    }
    if(opCount == 0)
    {
        operand = this.id;
        prevDisplayVal = displayVal;
    
        opCount += 1;
        bob.innerText = "0";
        displayVal = 0;
    }
    resetScreen = 0;
}

function clear(){
    let bob = document.getElementById("display");
    bob.innerText = "0";
    queue = [];
    partialEval = [];
    opCount = 0;
    prevDisplayVal = 0;
    displayVal = 0;
}

let opCount = 0;
let prevDisplayVal = 0;
let displayVal = 0;
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
    
        if(this.id == 0)
        {
            if(displayVal == 0)
                return ;
        }
            screen.innerText += this.id;
    
        displayVal = Number(screen.innerText);


}

fillCalculator();
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
}

let displayVal = "";
function putOnScreen(){
    let screen = document.getElementById("display");
    screen.innerText += this.id;
    displayVal = screen.innerText;
}

fillCalculator();
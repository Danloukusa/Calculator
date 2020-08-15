let a = "dummy", b = "dummy", op = "dummy", opCount = 0, result = "dummy", resetScreen = 0;
let div0 = false;

// add listeners
function eventCreate(){
    let i = 0;
    for(i = 0; i <= 9; i++)
    {
        let element = document.getElementById(i);
        element.addEventListener("click", putOnScreen);
    }
    document.addEventListener("keydown", figureOut);
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

// manage math
function operate(num1, operand, num2){
    // console.log("OPERATION: |NUM1: " + num1 + "|, |NUM2 : " + num2 + "|, |OP: " + operand + "|");
    if(operand == "+")
        return num1 + num2;
    if(operand ==  "-")
        return num1 - num2;
    if(operand == "*")
        return num1 * num2;
    if(operand == "/")
    {
        if(num2 == 0)
        {
            div0 = true;
            let screen = document.getElementById("display");
            screen.innerText = "ERROR: Cannot divide by 0. CLEAR / refresh to proceed";
        }
        else
            return num1 / num2;       
    }
    if(operand == "^")
        return Math.pow(num1, num2);
    if(operand == "root")
    {
       if(num2 == 0)
       {
        div0 = true;
        let screen = document.getElementById("display");
        screen.innerText = "ERROR: Cannot divide by 0. CLEAR / refresh to proceed";
       }
        else
            return Math.pow(num1, 1/num2);
    }
}  

// Manage Keyboard inputs
function figureOut(e){
    let code = Number(e.key);
    if((code >= 0 && code <= 9))
        putOnScreen(code, 0);
    let nonNum = e.key;
    if(nonNum == ".")
        putOnScreen(nonNum, 0);
    if(nonNum == "+" || nonNum == "-" || nonNum == "*" || nonNum == "/" || nonNum == "^")
        storeOperator(nonNum, 0);
    if(nonNum == "Enter")
        evaluate(0);
    if(nonNum == "Backspace")
        backSpace();
}

// If I press negative, this will handle that.
function negate(){
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

    if(opCount == 0)
        a = Number(screen.innerText);
    else
        b = Number(screen.innerText);
}

// clearscreen and memory
function clear(){
    // I'm encountering BS. Innertext will NOT update properly.
    // Therefore, I take shotgun route and refresh page.
    // I gave up.

    window.location.reload(false);
   /*
    let screen = document.getElementById("display");
    screen.innerText = "Cleared";
    opCount = 0;
    a = "dummy";
    b = "dummy";
    op = "dummy";
    resetScreen = 0;
    result = "dummy";
    div0 = false;
    */
}

// Decide which nums to use, update screen
function evaluate(){
    let screen = document.getElementById("display");
    if(opCount < 2)
    {
        if(a == "dummy" || b == "dummy" || op == "dummy")
            return;
        result = operate(a, op, b);
    }
    if(opCount >= 2)
    {
        if(result == "dummy" || b == "dummy" || op == "dummy")
            return;
        result = operate(result, op, b);
    }
    if(div0)
        return;

    // PRESSING or CLICKING the ENTER
    if(arguments.length == 1)
    {
        screen.innerText = result;
        opCount = 0;
        a = result;
        b = "dummy";
        result = "dummy";
        op = "dummy";
        resetScreen = 0;
        return;
        }    
    resetScreen = 0;
    screen.innerText = result;
}

// as name suggests
function putOnScreen(){
    let id;
    // CLICKING BUTTON
    if (arguments.length == 1) 
    {
        id = this.id;
    } 
    // TYPING NUMBER
    if (arguments.length == 2) 
    {
        id = arguments[0]; // take argument
    }

    let screen = document.getElementById("display");
    if (resetScreen < 1)
    {
        screen.innerText = "0";
        resetScreen = 1;
    }

    let str = screen.innerText;
    if(str.includes("."))
        if(id == ".")
            return;

    if(id == "0")
        screen.innerText += "0";
    else
        screen.innerText += id;

    if(opCount < 1)
        a = Number(screen.innerText);
    else
        b = Number(screen.innerText);
}

// store Operator, call evaluator, 
function storeOperator(){
    let screen = document.getElementById("display");

    // CLICKING BUTTON
    if (arguments.length == 1) 
        id = this.id;
    // TYPING NUMBER
    if (arguments.length == 2) 
        id = arguments[0];

    if(opCount < 1)
        if(a == "dummy")
            return;
    
    if(opCount > 0)
    {
        if(b == "dummy")
            return;  
    }

    if(opCount >= 1)
    {
        evaluate();
    }
    op = id;
    resetScreen = 0;
    opCount += 1;
}

// as name suggests
function backSpace(){
    let screen = document.getElementById("display");

    if (screen.innerText == "0")
        return;

    let newString;
    newString = screen.innerText.substring(0, screen.innerText.length - 1);
    screen.innerText = newString;
    if(opCount < 1)
        a = screen.innerText;
    else
    {
        b = screen.innerText;
    }
}

// Add listeners, AKA Start up the calculator
eventCreate();
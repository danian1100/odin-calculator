let n1 = null;
let n2 = null;
let operator = ["+", "-", "*", "/"];
let displayValue = "";

const screen = document.querySelector(".screen");
const digitsBtn = document.querySelectorAll(".digit");
const opBtn = document.querySelectorAll(".operator");
const dotBtn = document.querySelector(".dot");
const clearBtn = document.querySelector(".clear");
const equalBtn = document.querySelector(".equal");

screen.textContent = "MATH IS HARD";

clearBtn.addEventListener('click', () => {
    displayValue = "0";
    n1 = null;
    n2 = null;
    operator = null;
    screen.textContent = displayValue;
    dotBtn.disabled = false;
});

dotBtn.addEventListener("click", () => {
    if (!displayValue.includes(".")) {
        displayValue += ".";
        screen.textContent = displayValue;
    }
    dotBtn.disabled = true; 
}); 

digitsBtn.forEach(button => { 
    button.addEventListener("click", function(e) {
        processingNumber(e.target.textContent);
    });
 });

opBtn.forEach(button => {
    button.addEventListener("click", function(e){
      processingOpe(e.target.textContent);  
    });
});

equalBtn.addEventListener("click", () => {
    if (n1 !== null && operator !== null && displayValue !== "") {
        n2 = displayValue;
        let result = operate(operator, n1, n2);
        screen.textContent = result;
        n1 = result;
        operator = null; 
        displayValue = result; 
        dotBtn.disabled = false;
    };
});

function processingNumber(value) {
    if (displayValue.length >= 6) return;

    if (screen.textContent === "0" || screen.textContent === "MATH IS HARD") {
        displayValue = value;
    } else {
        displayValue += value; 
    }
    if (n1 === null) {
    screen.textContent = displayValue;
    } else if (n1 !== null && displayValue !== "") {
        screen.textContent = `${n1} ${operator}` + " " + displayValue;
    };
};

function processingOpe(op) {
    if (n1 === null) {
        n1 = displayValue; 
        operator = op; 
        displayValue = ""; 
        screen.textContent = `${n1} ${operator}`; 
        dotBtn.disabled = false; 
    } else if (n1 !== null && displayValue !== "") {
        n2 = displayValue; 
        let result = operate(operator, n1, n2);
        n1 = result;
        operator = op;
        displayValue = ""; 
        screen.textContent = `${n1} ${operator}`; 
    };
};

function operate(operator, n1, n2) {
    const nb1 = parseFloat(n1);
    const nb2 = parseFloat(n2);

    switch(operator) {
        case "+": 
            return mathAdd(nb1, nb2);
        case "-":
            return mathSubtract(nb1, nb2);
        case "*":
            return mathMultiply(nb1, nb2);
        case "/":
            return nb2 === 0 ? "Error" : mathDivide(nb1, nb2); 
        default:
            return nb1;
    };
};

function mathAdd(nb1, nb2) {
    return nb1 + nb2;
};

function mathSubtract(nb1, nb2) {
    return nb1 - nb2;
};

function mathMultiply(nb1, nb2) {
    return nb1 * nb2;
};

function mathDivide(nb1, nb2) {
    return nb1 / nb2;
};
// Display: How to show stuff on screen
let keys = document.querySelectorAll();
let displayString = '';
// these are the keys pressed by a person
let display = document.querySelector('#display');

keys.forEach(element => {
    element.addEventListener('click', () => {
        if (!element.value) {
            displayString += element.value;
        }

        let displayP = document.createElement('p');
        let displayT = document.createTextNode(displayString);

        displayP.appendChild(displayT);

        clearDisplay();

        display.appendChild(displayP);
    })
});


// Operate!
function math(a, operate, b) {
    let total = 0;
    if (Number.isInteger(a) && Number.isInteger(b)) {
        if (operate === "+") {
            total = add(a, b);
        } else if (operate === "-") {
            total = subtract(a, b);
        } else if (operate === "*") {
            total = multiply(a, b);
        } else if (operate === "/") {
            total = divide(a, b);
        }
    return total;
    } else {
        return 0;
    }
}


// Basic Math Operators

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// Clear Display

function clearDisplay() {
    while(display.lastChild) {
        display.removeChild(display.lastChild);
        button = '';
    } 
}

// The buttons
// Clear button

let clear = document.querySelector('#clear');
clear.addEventListener('click', clearDisplay());
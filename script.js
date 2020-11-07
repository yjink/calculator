// Operate!
function operate(a, operate, b) {
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

// Numpad
let number = document.querySelector('.numpad');
numpad.addEventListener('click', () => {
    console.log(this.id);
})
// Display: How to show stuff on screen
let keys = document.querySelectorAll('.numpad');
let displayString = '';
// keys pressed that shows up on screen
let display = document.querySelector('#display');
// the screen

keys.forEach(element => {
    element.addEventListener('click', () => {
        // remember to do something about 0 as a number in first position
        displayString += element.value;

        if (displayString[0] === '0') {
            displayString = displayString.slice(1);
        }

        let displayP = document.createElement('p');
        let displayT = document.createTextNode(displayString);

        displayP.appendChild(displayT);

        while(display.lastChild) {
            display.removeChild(display.lastChild);
        }

        display.appendChild(displayP);
    })
});


// Operate: grab string from #display and perform the required math

function operations(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr.length === 3) {
            total = doMath(arr);
        } else {
            let remainder = arr.slice(3);
            let math = doMath(arr.slice(0,3));
            remainder.unshift(nums);
            // placing the total of the first bit of math in the front
            // so that it can be included in the rest of the operations
            operations(remainder);
        }
    }
    return total;
}

function doMath(arr) {
    // once a [num1, operating symbol, num2] has been passed to this function
    // math
    if (arr[1] === '+') {
        return Number(arr[0]) + Number(arr[2]);
    } else if (arr[1] === '-') {
        return Number(arr[0]) - Number(arr[2]);
    } else if (arr[1] === '*') {
        return Number(arr[0]) * Number(arr[2]);
    } else if (arr[1] === '/') {
        return Number(arr[0]) / Number(arr[2]);
    } else return 'Error!';
}


// Clear Display

function clearDisplay() {
    while(display.lastChild) {
        display.removeChild(display.lastChild);
    } 
    displayString = 0;

    let displayP = document.createElement('p');
    let displayT = document.createTextNode(displayString);

    displayP.appendChild(displayT);
    display.appendChild(displayP);
    // this will reset display to '0'
}

// The buttons
// Clear button

let clear = document.querySelector('#clear');
clear.addEventListener('click', () => {
    clearDisplay();
});

// Equals button
let equals = document.querySelector('#equals');
equals.addEventListener('click', () => {
    clearDisplay();
    // first clear display


})
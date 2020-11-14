// Display: How to show stuff on screen
let keys = document.querySelectorAll('.numpad');
let displayString = [];
// keys pressed that shows up on screen
let display = document.querySelector('#display');
// the screen

keys.forEach(element => {
    element.addEventListener('click', () => {
        displayString.push(element.value);
        // adds keys pressed

        if (displayString[0] === '0' || isNaN(displayString[0])) {
            displayString = displayString.slice(1);
        }
        // if '0' is in first position, is removed
        
        displayString = cleanArr(displayString);
        // figure out if two concurrent indexes are operators
        // the later should replace the former


        let displayP = document.createElement('p');
        let displayT = document.createTextNode(displayString.join(' '));

        displayP.appendChild(displayT);

        while(display.lastChild) {
            display.removeChild(display.lastChild);
        }

        display.appendChild(displayP);
    })
});

function cleanArr(arr) {
    let nArr = [];

    for (let i = 0; i < arr.length; i++) {
        if (isNaN(arr[i - 1]) && isNaN(arr[i])) {
            nArr.pop();
            nArr.push(arr[i]); 
        } else {
            nArr.push(arr[i]);
        }
    }
    return nArr;
}

// Operate: grab string from #display and perform the required math
function operations(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr.length === 3) {
            total = doMath(arr);
        } else {
            let remainder = arr.slice(3);
            let math = doMath(arr.slice(0,3));
            remainder.unshift(math);
            // placing the total of the first bit of math in the front
            // so that it can be included in the rest of the operations
            operations(remainder);
            // recursive case
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
    // do math
    let arr = displayString.split(' ');
    displayString = operations(arr);

    let displayP = document.createElement('p');
    let displayT = document.createTextNode(displayString);

    displayP.appendChild(displayT);
    
    // clear screen
    while(display.lastChild) {
        display.removeChild(display.lastChild);
    }

    // return total
    display.appendChild(displayP);
});
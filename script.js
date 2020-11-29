// Display: How to show stuff on screen
let keys = document.querySelectorAll('.numpad');
let display = [];
// keys pressed that shows up on screen
let screen = document.querySelector('#display');
// the screen
let num = "";
// For if user inputs number after calculation

keys.forEach(element => {
    if (display.length < 15) {
        element.addEventListener('click', () => {
            display.push(element.id);
            // adds keys pressed

            if (display[0] === '0' && display[1] === '0') {
                display = display.slice(1);
            } // if '0' pushed, first '0' is removed
            else if (display[0] === '0' && display[1] !== '0') {
                display = display.slice(1);
            } // if '0' in 1st index is removed
            else if (display[0] === num && Number.isInteger(Number(display[1]))) {
                display = display.slice(-1);
            } // if number is entered after equals
            
            display = cleanArr(display);
            // figure out if two concurrent indexes are operators
            // the later should replace the former


            let displayP = document.createElement('p');
            let displayT = document.createTextNode(display.join(''));

            displayP.appendChild(displayT);

            while(screen.lastChild) {
                screen.removeChild(screen.lastChild);
            }

            screen.appendChild(displayP);
        })
    }
});

// If two operators, 2nd replaces 1st
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
    while(screen.lastChild) {
        screen.removeChild(screen.lastChild);
    } 

    display = [];

    display.push('0');

    let displayP = document.createElement('p');
    let displayT = document.createTextNode(display);

    displayP.appendChild(displayT);
    screen.appendChild(displayP);
    // this will reset display to '0'
}


// Clear button

let clear = document.querySelector('#clear');
clear.addEventListener('click', () => {
    clearDisplay();
});


// Equals button
let equals = document.querySelector('#equals');
equals.addEventListener('click', () => {

    // do math
    let answer = String(operations(display.join('').split(' ')));

    let displayP = document.createElement('p');
    let displayT = document.createTextNode(answer);

    displayP.appendChild(displayT);
    
    // clear screen
    while(screen.lastChild) {
        screen.removeChild(screen.lastChild);
    }

    // display total on screen
    screen.appendChild(displayP);


    display = [];
    display.push(answer);
    num = answer;
});
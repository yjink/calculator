let keys = document.querySelectorAll('.key');
let buttons = document.querySelectorAll('button');
let display = []; 
// keys that pressed that show up on screen
let screen = document.querySelector('#display');
// where user input and math is shown;
let total = '';
// total at the end of an equation; for user input after an equation


// THE MECHANICS
keys.forEach(element => {
    element.addEventListener('click', () => {

        if (display.join('').length < 15) {
            // limit length of characters displayed
            let buttonVal = element.value;

            if (total === display[0] && (!display[1])) {
                if (Number.isInteger(Number(buttonVal)) || buttonVal === '.') {
                    clearDisplay();
                }
                display.push(buttonVal);
            } else display.push(buttonVal);


            display = cleanDisplay(display);
            
            let displayP = document.createElement('p');
            let displayText = document.createTextNode(display.join(''));

            displayP.appendChild(displayText);

            while(screen.lastChild) {
                screen.removeChild(screen.lastChild);
            }

            screen.appendChild(displayP);
        }
    })
});

function cleanDisplay(arr) {
    let input = arr.join('');
    let num = '';
    display = [];
    // emptying display to clean it up 

    for (let i = 0; i < input.length; i++) {
        let element = input[i];

        if (element === '0') {

            if (num) {
                num+= element;
            } else if (i > 1 && isNaN(Number(input[i - 1]))) {
                num+= element;
            }
        }

        else if (Number(element)) {

            if (num[0] === '0') {
                // num += element;
                num = element;
            } else {
                num += element;
            } 
        }

        else if (element === '.') {

            if (!num.includes('.')) {
                if (Number(num[0])) {
                    num += element;
                } else {
                    num = '0' + element;
                }
            }
        } 

        else {
            if (num) {
                // prevents blank spaces in the array
                display.push(num);
                num = '';
            }

            if (!isNaN(Number(input[i - 1]))) {
                display.push(element);
            } else {
                display.pop();
                display.push(element);
            }
        }
    }

    if (num) {
        display.push(num);
    }

    return display;
}

function operations(arr) {
    let answer;
    for (let i = 0; i < arr.length; i++) {
        if (isNaN(Number(arr[0])) && arr[0] !== '0') {
            arr.unshift('0');
            operations(arr);
        }
        else if (arr.length < 3) {
            if (isNaN(Number(arr[arr.length - 1]))) {
                return arr.join('').slice(0,-1);
                // if the input equation is incomplete, return the numbers only
            } else return display.join('');
        }
        else if (arr.length === 3) {
            answer = doMath(arr); 
        }
        else {
            let remainder = arr.slice(3);
            let math = doMath(arr.slice(0,3));
            remainder.unshift(math);
            // places answer of the first equation in the front of the array
            answer = operations(remainder);
            // recursive case
        }
    }
    return answer;
}

function doMath(arr) {
    // arr should be [a, operator, b]
    let answer = 0;

    if (arr[1] === '+') {
        answer = Number(arr[0]) + Number(arr[2]);
    } 
    else if (arr[1] === '-') {
        answer = Number(arr[0]) - Number(arr[2]);
    }
    else if (arr[1] === '×') {
        answer = Number(arr[0]) * Number(arr[2]);        
    }
    else if (arr[1] === '÷') {
        answer = Number(arr[0]) / Number(arr[2]);        
    } 
    else return 'Error!';

    if (answer < 1 && answer > 0) {
        answer = '0' + String(answer);
    }

    return +(answer).toFixed(14);
}

function clearDisplay() {
    while (screen.lastChild) {
        screen.removeChild(screen.lastChild);
    }

    display = [];

    display.push('0');

    let displayP = document.createElement('p');
    let displayText = document.createTextNode(display);

    displayP.appendChild(displayText);
    screen.appendChild(displayP);
    // this will reset display to 0;
}

// Clear Button
let clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
    clearDisplay();
});

// Equals Button
let equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', () => {
    let answer = String(operations(display));
    let displayP = document.createElement('p');
    let displayText = document.createTextNode(answer);

    displayP.appendChild(displayText);

    while (screen.lastChild) {
        screen.removeChild(screen.lastChild);
    }

    screen.appendChild(displayP);

    display = [];
    display.push(answer);
    total = answer;
})

// Backspace Button
let backspace = document.querySelector('#back');
backspace.addEventListener('click', () => {
    if (display.join('').length > 1) {
        let lastElement = display.pop();
        if (lastElement.length > 1) {
            let elementPart = lastElement.slice(0, -1);
            if (elementPart) {
                // if elementPart is not empty
                display.push(elementPart)
            }
        }
        
        let displayP = document.createElement('p');
        let displayText = document.createTextNode(display.join(''));

        displayP.appendChild(displayText);

        while (screen.lastChild) {
            screen.removeChild(screen.lastChild);
        }

        screen.appendChild(displayP);
    } else {
        display.pop();

        let displayP = document.createElement('p');
        let displayText = document.createTextNode('0');

        displayP.appendChild(displayText);

        while (screen.lastChild) {
            screen.removeChild(screen.lastChild);
        }

        screen.appendChild(displayP);
    }
})


// THE DESIGN
buttons.forEach(element => {
    element.addEventListener('mousedown', () => {
        element.style.backgroundColor = "rgba(240,248,255,0.35)";
        element.style.boxShadow = "inset 0.35em 0.15em rgba(240,248,255,0.75)";
    })
    
    element.addEventListener('mouseup', () => {
        if (element.id === 'clear' || element.id === 'equals') {
          element.style.backgroundColor = "rgba(240,248,255,0.1)";
          element.style.boxShadow = "none";
        } else {
          element.style.backgroundColor = "transparent";
          element.style.boxShadow = "none";
        }
    })  
})
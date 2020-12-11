let keys = document.querySelectorAll('.key');
let display = []; 
// keys that pressed that show up on screen
let screen = document.querySelector('#display');
// where user input and math is shown;
let total = '';
// total at the end of an equation; for user input after an equation


// THE MECHANICS
keys.forEach(element => {
    element.addEventListener('click', () => {
        if (display.length < 15) {
            // limit length of characters displayed

            display.push(element.value);
            
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




// THE DESIGN
// highlighter: highlights key when pressed
keys.forEach(element => {
    element.addEventListener('mousedown', () => {
        element.style.backgroundColor = "rbga(240,248,255,0.2)";
    }) 

    element.addEventListenener('mouseup', () => {
        element.style.backgroundColor = "transparent";
    })
})
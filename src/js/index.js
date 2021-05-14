
function changeTotal(number) {
    let total = document.getElementById('total');
    total.innerHTML = number;
}

// When digit button is clicked
function onDigitButtonClick(event) {
    const digit = event.target.dataset.value;
    let total = document.getElementById('total').innerHTML;

    if (total.length >= 3 && !prevDigitExists) {
        return;
    }

    if (total === '0') {
        changeTotal(Number(total) + Number(digit));
    } else {
        if (prevDigitExists) {
            total = 0;
            changeTotal(total);
            changeTotal(Number(total) + Number(digit));
            prevDigitExists = false;
        } else {
            changeTotal(total + digit);
        }
    }
}


function onModifierButtonClick() {
    changeTotal(0);
    queue = [];
}


function onOperationButtonClick(event) {
    const operator = event.target.dataset.value;
    let total = document.getElementById('total').innerHTML;

    queue.push(total);

    if (operator === '/') {
        prevDigitExists = true;
        queue.push(operator);
    } else if (operator === 'X') {
        prevDigitExists = true;
        queue.push(operator);
    } else if (operator === '-') {
        prevDigitExists = true;
        queue.push(operator);
    } else if (operator === '+') {
        prevDigitExists = true;
        queue.push(operator);
    } else {
        let result = 0;
        
        for (let i = 0; i < queue.length; i++) {
            if (queue[i] === '/') {
                i++
                result /= Number(queue[i]);
            } else if (queue[i] === 'X') {
                i++
                result *= Number(queue[i]);
            } else if (queue[i] === '-') {
                i++
                result -= Number(queue[i]);
            } else if (queue[i] === '+') {
                i++
                result += Number(queue[i]);
            } else {
                result += Number(queue[i]);
            }
        }
        
        result = Math.floor(result);
        changeTotal(result);
        queue = [];
        prevDigitExists = true;
    }
}


// Set event listeners
function setEventListeners() {
    const digitButton = document.querySelector('.digits');
    const modifierButton = document.querySelector('.modifier');
    const operationButton = document.querySelector('.operations');

    digitButton.addEventListener('click', () => onDigitButtonClick(event));
    modifierButton.addEventListener('click', () => onModifierButtonClick());
    operationButton.addEventListener('click', () => onOperationButtonClick(event));
}


// main
setEventListeners();
let prevDigitExists = false;
let queue = [];
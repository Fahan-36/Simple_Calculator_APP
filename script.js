let display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = '';
let displayHistory = '';
let currentFunction = '';

function appendNumber(num) {
    if (currentFunction !== '') {
        currentInput += num;
        display.value = getDisplayValue();
    } else {
        currentInput += num;
        updateDisplay();
    }
}

function getDisplayValue() {
    const funcNames = {
        'sin': 'sin',
        'cos': 'cos',
        'tan': 'tan',
        'log': 'log',
        'ln': 'ln',
        'sqrt': '√'
    };
    
    if (currentFunction !== '') {
        return `${funcNames[currentFunction]}(${currentInput})`;
    }
    return currentInput;
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        if (currentInput === '') {
            currentInput = '0.';
        } else {
            currentInput += '.';
        }
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '') return;
    
    if (previousInput !== '') {
        calculate();
    }
    
    operator = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function calculate() {
    if (currentFunction !== '') {
        completeFunctionCalculation();
    } else if (previousInput === '' || currentInput === '' || operator === '') {
        return;
    } else {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        switch(operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = current !== 0 ? prev / current : 0;
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }
        
        currentInput = result.toString();
        previousInput = '';
        operator = '';
        updateDisplay();
    }
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    displayHistory = '';
    currentFunction = '';
    updateDisplay();
}

function deleteLast() {
    if (currentFunction !== '') {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '') {
            display.value = getDisplayValue().slice(0, -1);
        } else {
            display.value = getDisplayValue();
        }
    } else {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
}

function applyFunction(func) {
    currentFunction = func;
    currentInput = '';
    
    // Show function name on display
    const funcNames = {
        'sin': 'sin(',
        'cos': 'cos(',
        'tan': 'tan(',
        'log': 'log(',
        'ln': 'ln(',
        'sqrt': '√('
    };
    
    display.value = funcNames[func];
}

function completeFunctionCalculation() {
    if (currentFunction === '' || currentInput === '') return;
    
    let result;
    const num = parseFloat(currentInput);
    const inputValue = currentInput;
    const funcNames = {
        'sin': 'sin',
        'cos': 'cos',
        'tan': 'tan',
        'log': 'log',
        'ln': 'ln',
        'sqrt': '√'
    };
    
    switch(currentFunction) {
        case 'sin':
            result = Math.sin(num * Math.PI / 180);
            break;
        case 'cos':
            result = Math.cos(num * Math.PI / 180);
            break;
        case 'tan':
            result = Math.tan(num * Math.PI / 180);
            break;
        case 'log':
            result = Math.log10(num);
            break;
        case 'ln':
            result = Math.log(num);
            break;
        case 'sqrt':
            result = Math.sqrt(num);
            break;
        default:
            return;
    }
    
    displayHistory = `${funcNames[currentFunction]}(${inputValue}) = ${result.toFixed(4)}`;
    currentInput = result.toString();
    currentFunction = '';
    operator = '';
    previousInput = '';
    updateDisplay();
}

function updateDisplay() {
    if (displayHistory) {
        display.value = displayHistory;
        displayHistory = '';
    } else if (operator && previousInput) {
        display.value = previousInput + ' ' + operator + ' ' + currentInput;
    } else {
        display.value = currentInput;
    }
}

// Allow keyboard input
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key);
    } else if (event.key === '.') {
        appendDecimal();
    } else if (event.key === '+' || event.key === '-') {
        appendOperator(event.key);
    } else if (event.key === '*') {
        appendOperator('*');
        event.preventDefault();
    } else if (event.key === '/') {
        appendOperator('/');
        event.preventDefault();
    } else if (event.key === 'Enter' || event.key === '=') {
        calculate();
        event.preventDefault();
    } else if (event.key === 'Backspace') {
        deleteLast();
        event.preventDefault();
    } else if (event.key === 'Escape') {
        clearDisplay();
        event.preventDefault();
    }
});

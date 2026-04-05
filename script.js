let currentInput = '';           // Holds the full equation (e.g., "2000+8000+5000+1000")
let numbers = [];                // Stores the numbers in the equation
let operations = [];             // Stores the operations (+ or -)
let result = 0;                  // Stores the final result after calculation
let exchangeRate = 1;            // Default exchange rate

// Event listener for number and operation buttons
document.querySelectorAll('.num').forEach(button => {
    button.addEventListener('click', function() {
        const value = button.textContent;

        if (value === 'C') {
            clearCalculator();
        } else if (value === '=') {
            calculateResult();
        } else if (value === '+' || value === '-') {
            setOperation(value);
        } else {
            addNumber(value);
        }
    });
});

// Event listener for the delete button
document.getElementById("deleteButton").addEventListener("click", function() {
    if (currentInput !== '') {
        // If there's current input, delete the last character typed (digit or operator)
        currentInput = currentInput.slice(0, -1);
        updateCurrencyADisplay();  // Update the display for Currency A
    }
});

// Add a number to the current input for the calculation (Currency A)
function addNumber(value) {
    currentInput += value;
    updateCurrencyADisplay();
}

// Set the operation (+ or -) for the calculation (Currency A)
function setOperation(op) {
    if (currentInput === '') return;

    // Append the operation to the current input
    currentInput += op;
    updateCurrencyADisplay();
}

// Calculate the result and update Currency B with the converted amount
function calculateResult() {
    if (currentInput === '') return;

    // Split the currentInput into numbers and operations
    let parts = currentInput.split(/[+\-]/);
    numbers = parts.map(part => parseFloat(part));  // Store all numbers

    operations = [];  // Store operations (+ or -)
    for (let i = 0; i < currentInput.length; i++) {
        if (currentInput[i] === '+' || currentInput[i] === '-') {
            operations.push(currentInput[i]);
        }
    }

    // Perform the calculation based on operations
    result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (operations[i - 1] === '+') {
            result += numbers[i];
        } else if (operations[i - 1] === '-') {
            result -= numbers[i];
        }
    }

    updateCurrencyADisplay(true);
    updateCurrencyBDisplay();
}

// Update the Currency A display (original input + ongoing result)
function updateCurrencyADisplay(final = false) {
    let displayString = currentInput || '0';

    // If the result is final, show the full equation with the result
    if (final) {
        displayString = `${numbers.join(' ' + operations.join(' ') + ' ')} = ${result}`;
    }

    document.getElementById('currency-a-input').textContent = displayString || '0';
}

// Update the Currency B display (converted amount)
function updateCurrencyBDisplay() {
    const convertedAmount = (result * exchangeRate).toFixed(2);
    document.getElementById('currency-b-input').textContent = convertedAmount;
}

// Clear all inputs
function clearCalculator() {
    currentInput = '';
    numbers = [];
    operations = [];
    result = 0;
    updateCurrencyADisplay();
    updateCurrencyBDisplay();
}

// Handle exchange rate input
document.getElementById("rate").addEventListener("input", function() {
    exchangeRate = parseFloat(this.value) || 1;
    updateCurrencyBDisplay();
});
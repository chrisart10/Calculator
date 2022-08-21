const buttons = document.querySelectorAll('button');
const display = document.querySelector('p');

let typedNumber = '';
let result = 0;
let resultString = '';
let operandsArray = [];
let lastOperator = '';
let lastOperand = 0;

buttons.forEach(button => {
    button.addEventListener('click', event => {

        if (event.target.textContent === 'AC') {
            resetCalculator();
        } else if (event.target.classList.contains('number-button')) {
            typedNumber += event.target.textContent;
            lastOperand = Number(typedNumber);
            display.textContent = cropString(typedNumber);
        } else if (event.target.classList.contains('operator-button')) {

            operandsArray.push(lastOperand);
            operandsArray = calculte(operandsArray[0], operandsArray[1], event.target.textContent);

            typedNumber = '';

            resultString = String(operandsArray[0]);

            display.textContent = cropString(resultString);;
            result = operandsArray[0];
            lastOperand = result;
        }

        if (event.target.textContent === "=") {
            resetCalculator(deleteResult = false);
            display.textContent = cropString(resultString);

            //Se necesita almacenar el resultado en el acomulador para que pueda realizar la siguiente operacion en base al resultado.
            typedNumber = resultString;
        }
    });
});

function calculte(operandA, operandB, currentOperator) {
    /*
    lastOperator = currentOperator;
    Guarda el ultimo operador para que recuerde que operacion debe hacerse. 
        Por ejemplo 2+2 = 4.
        1- entras el primer operando "2" 
        2- entras el signo "+", luego retorna 2 y guarda el ultimo signo
        3- entras el segundo operando "2" entonces al entrar el siguiente operador calcula los 2 operando anteriores.
    */

    let newOperandsArray = [];

    if (operandA == undefined) return [];
    if (operandB == undefined) {
        // se necesita almacenar el ultimo operador cuando no existe operandB para que recuerde que operacion debe hacerse.
        lastOperator = currentOperator;
        return [operandA];
    }
    if (lastOperator === '+') {
        newOperandsArray.push(add(operandA, operandB));
    } else if (lastOperator === '-') {
        newOperandsArray.push(substract(operandA, operandB));
    } else if (lastOperator === 'x') {
        newOperandsArray.push(multiply(operandA, operandB));
    } else if (lastOperator === '/') {
        newOperandsArray.push(divide(operandA, operandB));
    } else if (lastOperator === '=') {
        return calculte(operandA, operandB, lastOperator);
    }

    // se necesita almacenar el ultimo operador para que recuerde que operacion debe hacerse.
    lastOperator = currentOperator;

    return newOperandsArray;
}

function resetCalculator(deleteResult = true) {
    if (deleteResult) {
        resultString = '';
        lastOperand = 0;
    }
    display.textContent = '';
    typedNumber = '';
    operandsArray = [];
    lastOperator = '';
}

function cropString(string) {
    stringCroped = (string.length > 17) ? string.substring(0, 17) : string;
    string = detectError(stringCroped);
    return string;
}
function detectError(string) {
    if (string === 'Infinity' || string === 'NaN') return "bruh";
    return string;
}

function add(operandA, operandB) {
    return operandA + operandB;
}

function substract(operandA, operandB) {
    return operandA - operandB;
}

function multiply(operandA, operandB) {
    return operandA * operandB;
}

function divide(operandA, operandB) {
    return operandA / operandB;
}
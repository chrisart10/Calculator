const buttons = document.querySelectorAll('button');
const display = document.querySelector('p');

let acomulator = '';
let result = 0;
let resultString = '';
let operandsArray = [];
let lastOperator = '';

buttons.forEach(button => {
    button.addEventListener('click', event => {

        if (event.target.textContent === 'AC') {
            display.textContent = '';
            acomulator = '';
            operandsArray = [];
            lastOperator = '';
        } else if (event.target.classList.contains('number-button')) {
            acomulator += event.target.textContent;
            display.textContent = cropString(acomulator);
        } else if (event.target.classList.contains('operator-button') && acomulator !== '') {
            // FIXME No se cambia la operacion al ingresar otro signo. 

            operandsArray.push(Number(acomulator));
            operandsArray = calculte(operandsArray[0], operandsArray[1], event.target.textContent);

            acomulator = '';
            resultString = String(operandsArray[0]);
            //
            display.textContent = cropString(resultString) ;
            result = operandsArray[0];
        }
        if (event.target.textContent === "=") {
            //[x] Agregar resultado
            display.textContent = cropString(resultString);

            // Guarda el resultado en el acomulador para que pueda realizar la siguiente operacion en base al resultado.
            acomulator = resultString;

            operandsArray = [];
            lastOperator = '';
        }
        console.log(operandsArray);
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
        //  Guarda el ultimo operador para que recuerde que operacion debe hacerse.
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

    //  Guarda el ultimo operador para que recuerde que operacion debe hacerse.
    lastOperator = currentOperator;

    return newOperandsArray;
}
function cropString(string){
    string = (string.length > 17) ? string.substring(0, 17) : string
    return string
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
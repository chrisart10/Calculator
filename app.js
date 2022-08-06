const buttons = document.querySelectorAll('button');
const display = document.querySelector('p');
let acomulator = '';
let array = [];
buttons.forEach(button => {
    button.addEventListener('click', event => {
       
        if (event.target.textContent === "AC") {
            array = [];
            acomulator = '';
            display.textContent = ''
            console.log(array);
        }else if(event.target.textContent === "="){
            array.push(acomulator);
            console.log(array);

            //TODO Agregar resultado
            display.textContent = 'Resultado';
            acomulator = '';
            array = [];
        }else if (event.target.classList.contains('number-button')) {
            acomulator += event.target.textContent;
            display.textContent = acomulator;
            console.log(array);
            
        } else if (event.target.classList.contains('operator-button')) {
            // TODO agregar resultado en vez del acomulador
            
            array.push(acomulator);
            array.push(event.target.textContent);
            console.log(array);

            acomulator = '';
            display.textContent = ''
            
        }
        

        //TODO Seguir con la validacion de cuando presionan igual y tira el resultado de la operacion.

        // if ( == ){

        // }
    });
});


function addition(operandA, operandB) {
    operandA, operandB = Number(operandA), Number(operandB);
    return String(operandA + operandB);
}

function substraction(operandA, operandB) {
    operandA, operandB = Number(operandA), Number(operandB);
    return String(operandA - operandB);
}
function multiplication(operandA, operandB) {
    operandA, operandB = Number(operandA), Number(operandB);
    return String(operandA * operandB);
}

function divition(operandA, operandB) {
    operandA, operandB = Number(operandA), Number(operandB);
    return String(operandA / operandB);
}
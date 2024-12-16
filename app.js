/*-------------------------------- Constants --------------------------------*/
const calculations = {
  '+': () => firstNumber + secondNumber,
  '-': () => firstNumber - secondNumber,
  '*': () => firstNumber * secondNumber,
  '/': () => firstNumber / secondNumber
}

/*-------------------------------- Variables --------------------------------*/
let firstNumber = secondNumber = operator = null; 
let operationPerformed = false;

/*------------------------ Cached Element References ------------------------*/
const calculator = document.querySelector('#calculator');
const displayElement = document.querySelector('.display');

/*----------------------------- Event Listeners -----------------------------*/
calculator.addEventListener('click', buttonInput);

/*-------------------------------- Functions --------------------------------*/

//big messy if statement function 
function buttonInput(e) {
  //clears calculator variables and screen if an operation has been performed
  //resets operationPerformed to false so that new operands/operator can be assigned
  if(operationPerformed === true) {
    clear(); 
    operationPerformed = false;
  }

  //clears if user selects the 'C' button
  if(e.target.innerText === 'C') {
    clear();
    return;
  }

  //logic for getting the first operand
  if(e.target.classList.contains('number') && operator === null) {
    displayElement.innerText += e.target.innerText;
    firstNumber = Number(displayElement.innerText);
  } 

  //logic for getting the operator
  if(e.target.classList.contains('operator') && firstNumber !== null && operator === null) {
    operator = e.target.innerText;
    displayElement.innerText = `${firstNumber}${operator}`;
  } 

  //logic for getting the second operand
  if(e.target.classList.contains('number') && firstNumber !== null && operator !== null) {
    displayElement.innerText += e.target.innerText;
    secondNumber = Number(displayElement.innerText.substring(displayElement.innerText.indexOf(operator) + 1));
  }

  //runs the calculate function if all three values are found
  if(e.target.classList.contains('equals')) {
    calculate();
  }
}

//calls the performOperation function, updates display, sets operationPerformed to true
function calculate() {  
  if(firstNumber && operator && secondNumber !== null) {
    displayElement.innerHTML = calculations[operator]();
    operationPerformed = true;
  }
}

//clears screen and operator/operand variables 
function clear() {
  firstNumber = secondNumber = operator = null;
  displayElement.innerText = '';
}



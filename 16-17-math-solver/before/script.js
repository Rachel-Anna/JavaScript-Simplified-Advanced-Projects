/* 
MATH SOLVER



What does the app do?
---------------------
Take an equation like ex. 5 + 4 - 2 * 8 / 2 in string form and then give the answer of the equation.
It is performing an unknown number of operations, meaning we should use recursion.
We look for a number followed by an operator followed by another number, they might have spaces in between

The answer could be a:
-------------------------
-Decimal number
-Minus number
-e number (scientific notation)

Approach:
----------

Find out in this order if these operations exist:
  - Division or Multiply 
  - Add or Subtract -
If they exist take the number before and number after and perform that operation. 
Then replace the result of this into the equation.
Do this until there is only one number remaining in the equation (recursion)
return the result 

Edge cases:
--------------
If the user types in an invalid operation, return NaN



*/

const form = document.getElementById("equation-form");
const input = document.getElementById("equation");
const results = document.getElementById("results");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  results.innerHTML = "";
  parse(input.value);
  input.value = "";
});

function parse(equation) {
  if (/[a-z!"£$%\^&]/.test(equation)) {
    results.append(NaN);
    return NaN;
  }

  let number1;
  let number2;
  let operator;
  let step;

  let powerOf = /(?<Operand1>\d+)\s*(?<Operator>\*{2})\s*(?<Operand2>\d+)/.exec(
    equation
  );

  let divideOrMultiply =
    /(?<Operand1>\d+)\s*(?<Operator>[\/\*])\s*(?<Operand2>\d+)/.exec(equation);

  if (divideOrMultiply) {
    [number1, operator, number2, step] = getRegexData(divideOrMultiply);
  } else {
    let addOrSubtract =
      /(?<Operand1>\d+)\s*(?<Operator>[\+\-])\s*(?<Operand2>\d+)/.exec(
        equation
      );
    if (addOrSubtract) {
      [number1, operator, number2, step] = getRegexData(addOrSubtract);
    }
  }

  let result = solve(number1, operator, number2);

  let newEquation = replaceNextStep(equation, step, result);

  if (/^-*\d+\.?\d*e*\d*$/.test(newEquation)) {
    results.append(newEquation);
    return newEquation;
  } else {
    parse(newEquation);
  }
}

function getRegexData(operation) {
  let number1 = parseFloat(operation.groups.Operand1);
  let number2 = parseFloat(operation.groups.Operand2);
  let operator = operation.groups.Operator;
  let step = operation[0];

  return [number1, operator, number2, step];
}

function solve(number1, operator, number2) {
  switch (operator) {
    case "/": {
      return number1 / number2;
    }
    case "*": {
      return number1 * number2;
    }
    case "+": {
      return number1 + number2;
    }
    case "-": {
      return number1 - number2;
    }
    default: {
      return NaN;
    }
  }
}

function replaceNextStep(equation, step, result) {
  let newEquation = equation.replace(step, result);
  console.log(`${JSON.stringify(newEquation)} equation res`);
  return newEquation;
}

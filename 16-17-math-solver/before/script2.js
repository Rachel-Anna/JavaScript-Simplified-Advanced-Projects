/* 
MATH SOLVER

ex. 5 + 4 - 2 * 8

1. Grab the contents of the input field
2. Find out in this order if these operations exist:
  - Division /
  - Multiply *
  - Add +
  - Subtract -
3. If they exist take the number before and number after and 
   perform that operation. Then replace the result of this into the 
   equation.
4. Do this until there is only one number remaining in the equation (recursion)
5. return the result 
*/

const form = document.getElementById("equation-form");
const input = document.getElementById("equation");
const results = document.getElementById("results");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  results.innerHTML = "";
  let answer = parse(input.value);
  results.append(answer); // to change later
  input.value = "";
});

function parse(equation) {
  let operations = {
    division: /(?<Operand1>\d+)\s*(?<Operator>\/)\s*(?<Operand2>\d+)/,
    multiply: /(?<Operand1>\d+)\s*(?<Operator>\*)\s*(?<Operand2>\d+)/,
    add: /(?<Operand1>\d+)\s*(?<Operator>\+)\s*(?<Operand2>\d+)/,
    subtract: /(?<Operand1>\d+)\s*(?<Operator>-)\s*(?<Operand2>\d+)/,
  };

  let division = operations.division.exec(equation);
  if (division) {
    let result = solve(
      parseFloat(division.groups.Operand1),
      division.groups.Operator,
      parseFloat(division.groups.Operand2)
    );
    let step = division[0];
    newEquation = replaceNextStep(equation, step, result);
    if (/\//.test(newEquation)) {
      return parse(newEquation);
    } else {
      return newEquation;
    }
  }
  let multiply = operations.multiply.exec(equation);
  if (multiply) {
    let result = solve(
      parseFloat(multiply.groups.Operand1),
      multiply.groups.Operator,
      parseFloat(multiply.groups.Operand2)
    );
    let step = multiply[0];
    newEquation = replaceNextStep(equation, step, result);
    if (/\*/.test(newEquation)) {
      return parse(newEquation);
    } else {
      return newEquation;
    }
  }
  let add = operations.division.exec(equation);
  if (add) {
    let result = solve(
      parseFloat(add.groups.Operand1),
      add.groups.Operator,
      parseFloat(add.groups.Operand2)
    );
    let step = add[0];
    newEquation = replaceNextStep(equation, step, result);
    if (/\+/.test(newEquation)) {
      return parse(newEquation);
    } else {
      return newEquation;
    }
  }
  let subtract = operations.division.exec(equation);
  if (subtract) {
    let result = solve(
      parseFloat(subtract.groups.Operand1),
      subtract.groups.Operator,
      parseFloat(subtract.groups.Operand2)
    );
    let step = subtract[0];
    newEquation = replaceNextStep(equation, step, result);
    if (/\-/.test(newEquation)) {
      return parse(newEquation);
    } else {
      return newEquation;
    }
  }
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

//recursive functions

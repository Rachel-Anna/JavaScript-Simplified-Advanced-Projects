/*
add event listeners to the buttons of the calculator (numbers and operations) via
keyboard and click 

display the equation on the calculator

display the result on the calculator

if AC is clicked on, clear the equation/result

add commas

edge cases:
enums
minus numbers
bodmas

dividing by 0



What could be a class? calc


*/

const MULTIPLY_DIVIDE_REGEX =
  /(?<operand1>\S+)\s*(?<operation>[\/\*])\s*(?<operand2>\S+)/;
const EXPONENT_REGEX = /(?<operand1>\S+)\s*(?<operation>\^)\s*(?<operand2>\S+)/;
const ADD_SUBTRACT_REGEX =
  /(?<operand1>\S+)\s*(?<operation>(?<!e)[\-\+])\s*(?<operand2>\S+)/;

const element = document.querySelector("[data-calc]");

class Calc {
  static equationString = [];

  static getInput() {}

  static globalListener() {
    element.addEventListener("click", (e) => {
      if (
        e.target.matches("[data-operation]") ||
        e.target.matches("[data-number]")
      ) {
        this.equationString.push(e.target.innerText);
      } else if (e.target.matches("[data-equals]")) {
        let stringForm = this.equationString.toString().replace(/,/g, "");
        this.performCalc(stringForm);
      }
    });
  }

  static delete() {}

  static allclear() {}

  static handleMath({ operand1, operand2, operation }) {
    const number1 = parseFloat(operand1);
    const number2 = parseFloat(operand2);

    switch (operation) {
      case "*":
        return number1 * number2;
      case "/":
        return number1 / number2;
      case "+":
        return number1 + number2;
      case "-":
        return number1 - number2;
      case "^":
        return number1 ** number2;
    }
  }

  static performCalc(equation) {
    if (equation.match(MULTIPLY_DIVIDE_REGEX)) {
      const result = this.handleMath(
        equation.match(MULTIPLY_DIVIDE_REGEX).groups
      );
      const newEquation = equation.replace(MULTIPLY_DIVIDE_REGEX, result);
      return this.performCalc(newEquation);
    } else if (equation.match(ADD_SUBTRACT_REGEX)) {
      const result = this.handleMath(equation.match(ADD_SUBTRACT_REGEX).groups);

      const newEquation = equation.replace(ADD_SUBTRACT_REGEX, result);

      return this.performCalc(newEquation);
    } else {
      console.log(equation);
      return parseFloat(equation);
    }
  }
}

Calc.globalListener();

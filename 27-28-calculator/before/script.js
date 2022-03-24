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

// function addGlobalEventListener(type, element) {
//   document.addEventListener(type, (e) => {
//     if (e.target.matches(element)) {
//       console.log(e.target);
//     }
//   });
// }

const calc = document.querySelector("data-calc");

calc.addEventListener("click", (e) => {
  if (e.target.matches("[data-all-clear]")) {
    Calc.allclear();
  } else if (e.target.matches("[data-delete]")) {
    Calc.delete();
  } else if (e.target.matches("[data-operation]")) {
    Calc.checkOperation();
  } else if (e.target.matches("[data-number]")) {
    Calc.checkNumber();
  } else if (e.target.matches("[data-equals]")) {
    Calc.performCalc();
  }
});

class Calc {
  static add(a, b) {
    return a + b;
  }
  static subtract(a, b) {
    a - b;
  }
  static divide(a, b) {
    a / b;
  }
  static multiply(a, b) {
    a * b;
  }
  static delete() {}
  static allclear() {}
  static checkOperation() {}
  static checkNumber() {}
  static performCalc() {}
}

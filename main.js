// Displays
let upperDisplay = document.querySelector("#upperDisplay");
let lowerDisplay = document.querySelector("#lowerDisplay");

// + - / *
let operations = document.querySelectorAll("#operator");

// 0,1,2,3,4,5,6,7,8,9 and .
let digits = document.querySelectorAll("#digit");

// AC and delete
let AC = document.querySelector("#ac");
let del = document.querySelector("#delete");

// =
let equal = document.querySelector("#equal");

// selected operator, initialized as empty string
let selectedOperator = "";

// current and previous entered number, initialized as empty string
// this is where we stored the digits
// used for calculation when equal is pressed
let previousEnteredNumber = "";
let currentEnteredNumber = "";

// isEqualIsClicked is a boolean to check if the equal button is clicked,
// so when the user start clicking digits we reset the display
// which is the final result
let isEqualIsClicked = false; // initialized as false

// Function to calculate two numbers based on the operator and numbers passed and return the result
function calculate(operator, number1, number2) {
  // since we are working with strings we need to convert it into number before performing any calculation
  // we use float since there could be decimal points in the number
  let num1 = parseFloat(number1);
  let num2 = parseFloat(number2);
  if (operator === "+") {
    return num1 + num2;
  }
  if (operator === "-") {
    return num1 - num2;
  }
  if (operator === "*") {
    return num1 * num2;
  }
  if (operator === "/") {
    return num1 / num2;
  }
}

// Function to reset everything to default
function reset() {
 // reset everything including the displays
 selectedOperator = "";
 previousEnteredNumber = "";
 currentEnteredNumber = "";
 upperDisplay.innerHTML = "";
 lowerDisplay.innerHTML = "";
 isEqualIsClicked = false;
}

// Loop through digit buttons and listen for any clicked "event"
for (let i = 0; i < digits.length; i++) {
  // If any digits is clicked run the code below
  digits[i].addEventListener("click", function (event) {
    // get the value of the button
    let value = event.target.value;

    // If equal is clicked before, we need to reset everything because the display is the final result
    // and the current and previous entered number variables are not empty
    if(isEqualIsClicked) {
     reset();
    }

    // append the value to the currentEnteredNumber variable
    currentEnteredNumber = currentEnteredNumber + value;
    // store the currentEnteredNumber into the lower display
    lowerDisplay.innerHTML = currentEnteredNumber;
  });
}

// Loop through operator buttons and listen for any clicked "event"
for (let i = 0; i < operations.length; i++) {
  // If any operator is clicked run the code below
  operations[i].addEventListener("click", function (event) {
    // get the value of the button
    let operator = event.target.value;

    // If equal is clicked before, we need to reset everything because the display is the final result
    // and the current and previous entered number variables are not empty
    if(isEqualIsClicked) {
     reset();
    }

    // if the currentEnteredNumber is empty then exit and do nothing
    if (currentEnteredNumber === "") {
      // exit
      return;
    }

    // check if previousEnteredNumber is not empty
    if (previousEnteredNumber !== "") {
      // calculate and store the result of the previousEnteredNumber and currentEnteredNumber
      let currentOperator = operator;
      // check if there is previous pressed operator
      if (selectedOperator !== "") {
        currentOperator = selectedOperator;
      }
      previousEnteredNumber = calculate(currentOperator, previousEnteredNumber, currentEnteredNumber);
    } else {
      // we append the currentEnteredNumber to the previousEnteredNumber
      previousEnteredNumber = currentEnteredNumber;
    }
    // store the clicked operator in the selectedOperator variable
    selectedOperator = operator;
    // update display
    upperDisplay.innerHTML = upperDisplay.innerHTML + " " + currentEnteredNumber + " " + operator;

    // clear the currentEnteredNumber
    // clear the lower display
    currentEnteredNumber = "";
    lowerDisplay.innerHTML = "";
  });
}

// When delete or AC is clicked
AC.addEventListener("click", function () {
  reset();
});
del.addEventListener("click", function () {
  // remove one character at the end of the string(-1) in the lower display if not empty
  let lowerDisplayHTML = lowerDisplay.innerHTML;
  if (lowerDisplayHTML !== "") {
    // slice takes two argument start and target, 0 means the start of the string and -1 is the last character
    lowerDisplay.innerHTML = lowerDisplayHTML.slice(0, -1);
  }
  // remove one character at the end of the string(-1) in the currentEnteredNumber if not empty
  if (currentEnteredNumber !== "") {
    // slice takes two argument start and target, 0 means the start of the string and -1 is the last character
    currentEnteredNumber = currentEnteredNumber.slice(0, -1);
  }
});

// If equal is click, we lastly calculate the currentEnteredNumber and previousEnteredNumber then show the result
// then reset everything except the display
equal.addEventListener("click", function () {
  // first we make sure that, selectedOperator, currentEnteredNumber, and previousEnteredNumber is all not empty
  if ( selectedOperator !== "" && currentEnteredNumber !== "" && previousEnteredNumber !== "" ) {
    upperDisplay.innerHTML = upperDisplay.innerHTML + " " + currentEnteredNumber + " " + selectedOperator;
    let finalResult = calculate(selectedOperator, previousEnteredNumber, currentEnteredNumber);
    lowerDisplay.innerHTML = finalResult;
    // we set the isEqualIsClicked to true
    isEqualIsClicked = true;
  }
});
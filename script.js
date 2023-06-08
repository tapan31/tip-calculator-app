// Get elements
const bill = document.getElementById("bill");
const numberOfPeople = document.getElementById("people");
const tipSpans = document.querySelectorAll(".tip");
const customTip = document.getElementById("custom-tip");
const resetButton = document.getElementById("reset");

// Event listeners for input fields
bill.addEventListener("input", handleBillInput);
numberOfPeople.addEventListener("input", handleNumberOfPeopleInput);
customTip.addEventListener("input", handleCustomTipInput);

// Event listener for tip spans
tipSpans.forEach((span) => {
  span.addEventListener("click", handleTipSpanClick);
});

// Event listener for custom tip input
customTip.addEventListener("click", handleCustomTipClick);

// Event listener for document click
document.addEventListener("click", handleDocumentClick);

// Calculate tip on input change
function calculateTip() {
  // Get the values from the input fields
  const billAmount = parseFloat(bill.value);
  const numberOfPeopleValue = parseInt(numberOfPeople.value);
  let selectedTip = null;
  let customTipValue = null;

  if (previousSpan !== null) {
    selectedTip = parseFloat(previousSpan.innerText);
  } else if (customTip.value !== "") {
    customTipValue = parseFloat(customTip.value);
  }

  // Check if all the fields have valid values
  if (
    !isNaN(billAmount) &&
    numberOfPeopleValue > 0 &&
    (selectedTip !== null || !isNaN(customTipValue))
  ) {
    const tipAmount = selectedTip
      ? (billAmount * selectedTip) / 100
      : (billAmount * customTipValue) / 100;

    const totalAmount = billAmount + tipAmount;

    // Calculate tip per person
    const tipAmountPerPerson = tipAmount / numberOfPeopleValue;
    const totalAmountPerPerson = totalAmount / numberOfPeopleValue;

    // Display the calculation
    document.getElementById(
      "tip-amount"
    ).textContent = `$${tipAmountPerPerson.toFixed(2)}`;
    document.getElementById(
      "total-amount"
    ).textContent = `$${totalAmountPerPerson.toFixed(2)}`;
  }
}

// Event handler for bill input
function handleBillInput() {
  if (bill.value < 0) {
    bill.classList.add("error");
    document.getElementById("error").classList.add("error-message");
  } else {
    bill.classList.remove("error");
    document.getElementById("error").classList.remove("error-message");
  }
  calculateTip();
}

// Event handler for number of people input
function handleNumberOfPeopleInput() {
  const errorSpan = document.getElementById("error1");
  if (numberOfPeople.value < 0) {
    numberOfPeople.classList.add("error");
    errorSpan.innerText = "Enter a positive value";
    errorSpan.classList.add("error-message");
  } else if (numberOfPeople.value === "0") {
    numberOfPeople.classList.add("error");
    errorSpan.innerText = "People cannot be 0";
    errorSpan.classList.add("error-message");
  } else {
    numberOfPeople.classList.remove("error");
    errorSpan.classList.remove("error-message");
  }
  calculateTip();
}

// Event handler for custom tip input
function handleCustomTipInput() {
  if (customTip.value < 0) {
    customTip.classList.add("error");
    document.getElementById("error3").classList.add("error-message");
  } else {
    customTip.classList.remove("error");
    document.getElementById("error3").classList.remove("error-message");
  }
  calculateTip();
}

// Variables for tracking selected tip span and value
let previousSpan = null;
let spanValue = null;

// Event handler for tip span click
function handleTipSpanClick() {
  if (previousSpan !== null) {
    previousSpan.style.backgroundColor = "";
    previousSpan.style.color = "";
  }

  // Change style of clicked span
  this.style.backgroundColor = "hsl(183, 43%, 70%)";
  this.style.color = "black";

  // Update selected tip value
  spanValue = this.innerText;

  // Set previous span to the clicked span
  previousSpan = this;

  calculateTip();
}

// Event handler for custom tip click
function handleCustomTipClick() {
  // Reset styles of tip spans
  tipSpans.forEach((span) => {
    span.style.backgroundColor = "";
    span.style.color = "";
  });

  // Reset selected tip value
  previousSpan = null;
}

// Event handler for document click
function handleDocumentClick(event) {
  const clickedElement = event.target;

  // Reset styles of previous span if clicked element is not a tip span or input
  if (
    !clickedElement.classList.contains("tip") &&
    clickedElement.tagName !== "INPUT"
  ) {
    if (previousSpan !== null) {
      previousSpan.style.backgroundColor = "";
      previousSpan.style.color = "";
      previousSpan = null;
    }
  }
}

// Reset button event listener
resetButton.addEventListener("click", handleResetClick);

// Event handler for reset button click
function handleResetClick() {
  bill.value = "";
  numberOfPeople.value = "";
  customTip.value = "";
  document.getElementById(
    "tip-amount"
  ).innerHTML = `<i class="fa-solid fa-dollar-sign"></i> 0.00`;
  document.getElementById(
    "total-amount"
  ).innerHTML = `<i class="fa-solid fa-dollar-sign"></i> 0.00`;
}

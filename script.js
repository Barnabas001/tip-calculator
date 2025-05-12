const containerContent = document.querySelector(".containerJs");

const amountInput = document.querySelector(".inputJs");
const numberInput = document.querySelector(".numberPersonJs");
const percentButton = document.querySelectorAll(".percentage-button");
const tipAmount = document.querySelector(".tipAmount");
const totalAmount = document.querySelector(".totalFigure");
const resetButton = document.querySelector(".reset-button");
const customInput = document.getElementById("customInputJs");
const customToggle = document.getElementById("customToggle");

let selectedPercentage = null;

function reset() {
  amountInput.value = "0";
  numberInput.value = "0";
  selectedPercentage = null;

  tipAmount.innerText = "$0.00";
  totalAmount.innerText = "$0.00";

  percentButton.forEach((btn) => btn.classList.remove("active-button"));
  resetButton.classList.remove("active");

  amountInput.classList.remove("invalid");
  numberInput.classList.remove("invalid");

  document.getElementById("billWarning").style.display = "none";
  document.getElementById("peopleWarning").style.display = "none";

  // Reset custom input toggle
  customInput.value = "";
  customInput.style.display = "none";
  customToggle.style.display = "inline-block";
}

function updateResetButtonState() {
  const tip = parseFloat(tipAmount.innerText.replace("$", ""));
  const total = parseFloat(totalAmount.innerText.replace("$", ""));
  if (tip > 0 && total > 0) {
    resetButton.classList.add("active");
  } else {
    resetButton.classList.remove("active");
  }
}

function validateInputs() {
  let valid = true;
  const bill = parseFloat(amountInput.value);
  const people = parseInt(numberInput.value);
  const billWarning = document.getElementById("billWarning");
  const peopleWarning = document.getElementById("peopleWarning");

  if (isNaN(bill) || bill <= 0) {
    amountInput.classList.add("invalid");
    billWarning.style.display = "block";
    valid = false;
  } else {
    amountInput.classList.remove("invalid");
    billWarning.style.display = "none";
  }

  if (isNaN(people) || people <= 0) {
    numberInput.classList.add("invalid");
    peopleWarning.style.display = "block";
    valid = false;
  } else {
    numberInput.classList.remove("invalid");
    peopleWarning.style.display = "none";
  }

  return valid;
}

function performCalculation() {
  const bill = parseFloat(amountInput.value);
  const people = parseInt(numberInput.value);

  if (!validateInputs() || selectedPercentage === null || isNaN(selectedPercentage)) {
    tipAmount.innerText = "$0.00";
    totalAmount.innerText = "$0.00";
    return;
  }

  const tip = bill * selectedPercentage;
  const total = bill + tip;
  const tipPerPerson = tip / people;
  const totalPerPerson = total / people;

  tipAmount.innerText = `$${tipPerPerson.toFixed(2)}`;
  totalAmount.innerText = `$${totalPerPerson.toFixed(2)}`;

  updateResetButtonState();
}

// calculation on input changes
amountInput.addEventListener("input", performCalculation);
numberInput.addEventListener("input", performCalculation);

// Preset percentage buttons
percentButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    percentButton.forEach((btn) => btn.classList.remove("active-button"));
    e.target.classList.add("active-button");

    selectedPercentage = parseFloat(e.target.innerText) / 100;

    customInput.style.display = "none";
    customToggle.style.display = "inline-block";
    customInput.value = "";

    performCalculation();
  });
});

// Custom toggle button
customToggle.addEventListener("click", () => {
  customToggle.style.display = "none";
  customInput.style.display = "inline-block";
  customInput.focus();

  percentButton.forEach((btn) => btn.classList.remove("active-button"));
});

// Custom input handler
customInput.addEventListener("input", () => {
  selectedPercentage = parseFloat(customInput.value) / 100;
  performCalculation();
});


customInput.addEventListener("blur", () => {
  if (customInput.value === "") {
    selectedPercentage = null;
    customInput.style.display = "none";
    customToggle.style.display = "inline-block";
    performCalculation();
  }
});

// Reset button
resetButton.addEventListener("click", () => {
  reset();
});

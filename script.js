const containerContent = document.querySelector(".containerJs");

containerContent.innerHTML = `
<div class="header-unit">
  <h3>SPLI</h3>
  <h3>TTER</h3>
</div>

<div class="page-content">
  <section class="input-section">
    <div class="subInput">
      <p>Bill</p>
      <p class="input-warning" id="billWarning">Can't be zero</p>
    </div>
    <div class="input-box">
      <span class="icon"><img src="images/icon-dollar.svg" alt="" /></span>
      <input type="number" value="0" class="number-input inputJs" />
    </div>
    <p>Select Tip %</p>
    <div class="grid-container">
      <button class="percentage-button">5%</button>
      <button class="percentage-button">10%</button>
      <button class="percentage-button">15%</button>
      <button class="percentage-button">25%</button>
      <button class="percentage-button">50%</button>
      <button class="percentage-button custom-toggle" id="customToggle">Custom</button>
      <input type="number" placeholder="%" id="customInputJs" class="custom-input" style="display: none;" />
    </div>

    <div class="subInput">
      <p>Number of People</p>
      <p class="input-warning" id="peopleWarning">Can't be zero</p>
    </div>

    <div class="input-box">
      <span class="icon"><img src="images/icon-person.svg" alt="" /></span>
      <input type="number" value="0" class="number-input numberPersonJs" />
    </div>
  </section>

  <section class="tipCalculated">
    <div>
      <div class="subTipCalculated">
        <div>
          <p class="tip-total-paragraph">Tip Amount</p>
          <p class="person">/ person</p>
        </div>
        <div>
          <p class="calculated-percentages tipAmount">&#36;0.00</p>
        </div>
      </div>
      <div class="subTipCalculated">
        <div>
          <p class="tip-total-paragraph">Total</p>
          <p class="person">/ person</p>
        </div>
        <div>
          <p class="calculated-percentages totalFigure">&#36;0.00</p>
        </div>
      </div>
    </div>

    <button class="reset-button">RESET</button>
  </section>
</div>
`;

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

// Handle preset percentage button clicks
percentButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    percentButton.forEach((btn) => btn.classList.remove("active-button"));
    e.target.classList.add("active-button");

    selectedPercentage = parseFloat(e.target.innerText) / 100;

    // Reset custom input field
    customInput.style.display = "none";
    customToggle.style.display = "inline-block";
    customInput.value = "";
  });
});

// Show input on custom button click
customToggle.addEventListener("click", () => {
  customToggle.style.display = "none";
  customInput.style.display = "inline-block";
  customInput.focus();

  percentButton.forEach((btn) => btn.classList.remove("active-button"));
});

// Update selected percentage from custom input
customInput.addEventListener("input", () => {
  selectedPercentage = parseFloat(customInput.value) / 100;
});

// Hide custom input if left empty
customInput.addEventListener("blur", () => {
  if (customInput.value === "") {
    selectedPercentage = null;
    customInput.style.display = "none";
    customToggle.style.display = "inline-block";
  }
});

// Handle calculation on Enter
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (
      !validateInputs() ||
      selectedPercentage === null ||
      isNaN(selectedPercentage)
    ) {
      alert("Please enter valid values and select a tip percentage.");
      return;
    }

    const bill = parseFloat(amountInput.value);
    const people = parseInt(numberInput.value);
    const tip = bill * selectedPercentage;
    const total = bill + tip;
    const tipPerPerson = tip / people;
    const totalPerPerson = total / people;

    tipAmount.innerText = `$${tipPerPerson.toFixed(2)}`;
    totalAmount.innerText = `$${totalPerPerson.toFixed(2)}`;

    updateResetButtonState();
  }
});

// Reset everything
resetButton.addEventListener("click", () => {
  reset();
});

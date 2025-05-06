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
            <span class="icon"
              ><img src="images/icon-dollar.svg" alt=""
            /></span>
            <input type="number" value="0" class="number-input inputJs" />
          </div>
          <p>Select Tip %</p>
          <div class="grid-container">
            <button class="percentage-button">5%</button>
            <button class="percentage-button">10%</button>
            <button class="percentage-button">15%</button>
            <button class="percentage-button">25%</button>
            <button class="percentage-button">50%</button>
            <button class="custom-button" id='customJs'>Custom</button>
          </div>

          <div class="subInput">
          <p>Number of People</p>
          <p class="input-warning" id="peopleWarning">Can't be zero</p>
          </div>

          <div class="input-box">
            <span class="icon"
              ><img src="images/icon-person.svg" alt=""
            /></span>
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
const customButton = document.getElementById("customJs");
const tipAmount = document.querySelector(".tipAmount");
const totalAmount = document.querySelector(".totalFigure");
const resetButton = document.querySelector(".reset-button");

function reset() {
  amountInput.value = "0";
  numberInput.value = "0";
  tipAmount.innerText = "$0.00";
  totalAmount.innerText = "$0.00";

  percentButton.forEach((btn) => btn.classList.remove("active-button"));
  resetButton.classList.remove("active");

  amountInput.classList.remove("invalid");
  numberInput.classList.remove("invalid");

  document.getElementById("billWarning").style.display = "none";
  document.getElementById("peopleWarning").style.display = "none";
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

  // Validate bill input
  if (isNaN(bill) || bill <= 0) {
    amountInput.classList.add("invalid");
    billWarning.style.display = "block";
    valid = false;
  } else {
    amountInput.classList.remove("invalid");
    billWarning.style.display = "none";
  }

  // Validate number of people input
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

percentButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    // Remove active class from all buttons
    percentButton.forEach((btn) => btn.classList.remove("active-button"));

    // Add active class to the clicked button
    e.target.classList.add("active-button");

    const percentage = parseFloat(e.target.innerText) / 100;
    const bill = parseFloat(amountInput.value);
    const people = parseInt(numberInput.value);

    if (validateInputs()) {
      const tip = bill * percentage;
      const total = bill + tip;
      const tipPerPerson = tip / people;
      const totalPerPerson = total / people;

      tipAmount.innerText = `$${tipPerPerson.toFixed(2)}`;
      totalAmount.innerText = `$${totalPerPerson.toFixed(2)}`;

      updateResetButtonState(); // Update reset button state
    }
  });
});

customButton.addEventListener("click", () => {
  const input = prompt("Enter custom percentage:");
  const customValue = parseFloat(input) / 100;
  const bill = parseFloat(amountInput.value);
  const people = parseInt(numberInput.value);

  if (validateInputs()) {
    const tip = bill * customValue;
    const total = bill + tip;
    const tipPerPerson = tip / people;
    const totalPerPerson = total / people;

    tipAmount.innerText = `$${tipPerPerson.toFixed(2)}`;
    totalAmount.innerText = `$${totalPerPerson.toFixed(2)}`;

    updateResetButtonState(); // Update reset button state
  }
});

resetButton.addEventListener("click", () => {
  reset();
  percentButton.forEach((btn) => btn.classList.remove("active-button"));
});

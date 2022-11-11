import { differenceEuro, differencePercent } from "./calculations.mjs";

let data = {
  year: [2022, 2023],

  // only kWh values
  cost2021: {
    electricity: 0.28,
    gas: 0.0641,
    oil: 0.07,
    districtHeating: 0.094,
    heatPump: 0.258,
    woodPellets: 0.046,
  },

  cost: {
    2021: {},
    2022: {},
    2023: {},
  },

  // only % values
  costIncrease: {
    2022: {
      electricity: 10,
      gas: 108,
      oil: 100,
      districtHeating: 20,
      heatPump: 16,
      woodPellets: 65,
    },
    2023: {
      electricity: 35,
      gas: -17,
      oil: 20,
      districtHeating: 166,
      heatPump: 26,
      woodPellets: 15,
    },
  },
};

// to save fixed2023 costs for slider
let fixed2023Cost = {};

// User Input for kwH electricity TEMP
let consumption, consumptionHeater;
// TEMP; should be come from User
consumption = consumptionHeater = 4500;

// value is set by prepareCostCalculation()
let dropdownSelect;

export function init(router) {
  /* document.getElementById("to-home").addEventListener("click", (e) => {

        // change route
        router.changeRoute("/");
    }); */
  document
    .getElementById("calculateElectricity")
    .addEventListener("click", (e) => {
      prepareCostCalculation("electricity");
      showSliderElectricity("show");
    });

  document.getElementById("calculateHeater").addEventListener("click", (e) => {
    let selectEnergy = document.getElementById("heater-select").value;
    let showError = document.getElementById("errorHandling").style;
    if (selectEnergy === "selectEnergyValue") {
      if ((showError.cssText = "none")) {
        showError.cssText = "block";
        showError.padding = "0.5rem";
      } else {
        showError.cssText = "none";
      }
    } else {
      prepareCostCalculation("heater");
      showSliderHeater("showSlider", "showError");
    }
  });

  document
    .getElementById("range-slider-electricity")
    .addEventListener("input", (e) => {
      prepareSlider(e, "electricity");
    });

  document
    .getElementById("range-slider-heater")
    .addEventListener("input", (e) => {
      prepareSlider(e, "heater");
    });
}
export const template = `
<div class="home w3-flat-turquoise" style="padding:1rem">
    <h2 class="text-center">Willkommen auf ERB!</h2>
    <hr>
    <div class="container mb-3">
      <div class="border rounded-2" style="padding: 5px 15px 5px 15px">
         <h2>Stromquelle</h2>
          <button id="calculateElectricity" class="btn btn-warning">Stromkosten berechnen</button>
          <label for="user-input-electricity">Vorjahresverbrauch (in kw/h):</label>
          <input type="number" id="user-input-electricity" value="4500">
          <input style="display:none" type="range" class="form-range" min="-100" max="100" id="range-slider-electricity">
          <p class="text-center" id="range-slider-electricity-value"></p>
          <div class="table-responsive" style="display:none" id="table-electricity">
            <table class="table table-light table-borderless" style="text-align: center;">
              <thead>
                <tr>
                  <th scope="col">2021</th>
                  <th scope="col">Differenz €/%</th>
                  <th scope="col">2022</th>
                  <th scope="col">Differenz €/%</th>
                  <th scope="col">2023</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowspan="2" style="vertical-align: middle"><div id="calc-result-electricity2021"></div></td> 
                  <td>500</td>
                  <td rowspan="2" style="vertical-align: middle"><div id="calc-result-electricity2022"></div></td>
                  <td>750</td>
                  <td rowspan="2" style="vertical-align: middle"><div id="calc-result-electricity"></div></td>
                </tr>
                <tr>
                  <td>50%</td>
                  <td>50%</td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
      <br />
      <div class="border rounded-2" style="padding: 5px 15px 5px 15px">
        <h2> Andere Energiequellen </h2>
        <select class="form-select" style="width: 250px !important" aria-label="Heizung Dropdown" id="heater-select">
          <option id="selectEnergyValue" value="selectEnergyValue" selected>Such eine Heizquelle aus</option> 
          <option value="gas">Gas</option>
          <option value="oil">Öl</option>
          <option value="districtHeating">Fernwärme</option>
          <option value="heatPump">Wärmepumpe</option>
          <option value="woodPellets">Holzpellets</option>
        </select>
        <br />
        <button id="calculateHeater" class="btn btn-danger">Heizkosten berechnen</button>
        <label for="user-input-heater">Vorjahresverbrauch (in kw/h):</label>
        <input type="number" id="user-input-heater" value="4500">
        <input style="display:none" type="range" class="form-range" min="-100" max="100" id="range-slider-heater">
        <p class="text-center" id="range-slider-heater-value"></p>
        <h4 class="text-center w3-flat-pomegranate" style="display:none;" id="errorHandling">Bitte wähl eine Energiequelle aus.</h4>
        <div class="table-responsive" style="display:none" id="table-heater">
        <table class="table table-light table-borderless" style="text-align: center;">
          <thead>
            <tr>
              <th scope="col">2021</th>
              <th scope="col">Differenz €/%</th>
              <th scope="col">2022</th>
              <th scope="col">Differenz €/%</th>
              <th scope="col">2023</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan="2" style="vertical-align: middle">10</td> 
              <td>500</td>
              <td rowspan="2" style="vertical-align: middle">20</td>
              <td>750</td>
              <td rowspan="2" style="vertical-align: middle"><div id="calc-result-heater"></div></td>
            </tr>
            <tr>
              <td>50%</td>
              <td>50%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</div>
`;

// This function show the Slider and Table under the button if it pressed.
function showSliderElectricity(showSlider) {
  showSlider = document.getElementById("range-slider-electricity").style;
  let showTable = document.getElementById("table-electricity").style;
  if (showSlider.cssText && showTable.cssText == "none") {
    showSlider.cssText = "block";
    showTable.cssText = "block";
  } else {
    showSlider.cssText = "none";
    showTable.cssText = "none";
  }
}

// This function show the Slider and Table under the button if it pressed.
function showSliderHeater(showSlider, showError) {
  showSlider = document.getElementById("range-slider-heater").style;
  let showTable = document.getElementById("table-heater").style;
  document.getElementById("errorHandling").style.display = "none";
  if (showSlider.cssText && showTable.cssText == "none") {
    showSlider.cssText = "block";
    showTable.cssText = "block";
  } else {
    showSlider.cssText = "none";
    showTable.cssText = "none";
  }
}

function prepareCostCalculation(type) {
  // TODO
  // get input value (something linke document.getElementById('input-'+type))
  // set value in global value

  let costType;

  switch (type) {
    case "heater":
      consumption = document.getElementById("user-input-heater").value;
      costType = document.getElementById("heater-select").value;
      dropdownSelect = costType;
      break;
    case "electricity":
      consumption = document.getElementById("user-input-electricity").value;
      costType = "electricity";
    default:
      break;
  }

  // eg costType = "gas", type = "heater"
  calculateYearCosts(costType, type);
}

function calculateYearCosts(type, resultType) {
  let calcCost2021 = parseInt((data.cost2021[type] * consumption).toFixed(0));
  data.cost[2021][type] = calcCost2021;

  for (let [key, value] of Object.entries(data.costIncrease)) {
    // will get electricity value increase of current year and add it with costs of year before
    let cost =
      (value[type] / 100) * data.cost[key - 1][type] + data.cost[key - 1][type];

    // round result
    data.cost[key][type] = parseInt(cost.toFixed(0));
  }

  // calculation of the difference between the years
  // Difference from 2021 to 2022
  let difEuro2122 = differenceEuro(
    data.cost[2021][type],
    data.cost[2022][type]
  );
  let difPerc2122 = differencePercent(difEuro2122, data.cost[2021][type]);

  // Difference from 2022 to 2023
  let difEuro2223 = differenceEuro(
    data.cost[2022][type],
    data.cost[2023][type]
  );
  let difPerc2223 = differencePercent(difEuro2223, data.cost[2021][type]);

  // TODO: Add difference into HTML
  let newElements = [];

  // 3. set output
  // create 3 elements for 3 years
  for (let [key, value] of Object.entries(data.cost)) {
    let newElement = document.createElement("p");
    //if (data.cost[2021][type] == data.cost[2021][electricity]) {
    //console.log("Ja");
    //}
    console.log(data.cost[2021]);
    newElement.className = "p" + key;
    newElement.textContent = `${value[type]}€`;
    newElements.push(newElement);
  }
  document
    .getElementById("calc-result-electricity2021")
    .replaceChildren(data.cost[2021].electricity);
  document
    .getElementById("calc-result-electricity2022")
    .replaceChildren(data.cost[2022].electricity);
  document
    .getElementById("calc-result-" + resultType)
    .replaceChildren(...newElements);
}

function prepareSlider(e, type) {
  let value = e.target.valueAsNumber;

  let costType;

  switch (type) {
    case "heater":
      // abort here if dropdown was not set from prepareCostCalculation before
      if (!dropdownSelect) return;
      costType = dropdownSelect;
      break;
    case "electricity":
      costType = "electricity";
    default:
      break;
  }

  calculate2023Slider(value, costType, type);

  sliderValue(value, type);
}

function calculate2023Slider(value, type, resultType) {
  // set initial value, only for first time
  if (typeof fixed2023Cost[type] == "undefined")
    fixed2023Cost[type] = data.cost[2023][type];

  // calculating the new 2023 value
  let calculation = fixed2023Cost[type] - fixed2023Cost[type] * (value / 100);
  calculation = parseInt(calculation.toFixed(0));
  data.cost[2023][type] = calculation;

  // calculating the new difference
  let difEuro2223 = differenceEuro(
    data.cost[2022][type],
    data.cost[2023][type]
  );
  let difPerc2223 = differencePercent(difEuro2223, data.cost[2021][type]);

  // TODO: Add difference into HTML

  // take last child (should be the value of 2023)
  let lastChild = document.getElementById(
    "calc-result-" + resultType
  ).lastChild;

  // replace textContent with new calculation
  lastChild.textContent = `${calculation}€`;
}

// trigger by slider()
// this function will handle the "XX% Einsparung" or "xx% höherer Verbrauch"
function sliderValue(value, resultType) {
  let element = document.getElementById(
    "range-slider-" + resultType + "-value"
  );

  let negative = value < 0;

  // always get absolut number
  value = Math.abs(value);

  element.textContent =
    value + "%" + (negative ? " höherer Verbrauch" : " Einsparung");

  element.classList.remove("text-bg-success", "text-bg-danger");

  if (!negative) element.classList.add("text-bg-success");
  else element.classList.add("text-bg-danger");
}

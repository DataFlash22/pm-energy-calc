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

// User Input for kwH (both electricity and heater)
let consumption;

// default value
consumption = 4500;

// value is set by prepareCostCalculation()
let dropdownSelect;

export function init(router) {

  // Button Click "Stromkosten berechnen"
  document
    .getElementById("calculateElectricity")
    .addEventListener("click", (e) => {
      prepareCostCalculation("electricity");
      showSlider("electricity");
    });

  // Input Enter "Stromkosten berechnen"
  document.getElementById('user-input-electricity').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      prepareCostCalculation("electricity");
      showSlider("electricity");
    }
  });

  // Button Click "Heizkosten berechnen"
  document.getElementById("calculateHeater").addEventListener("click", (e) => {
    prepareCostCalculation("heater");
    showSlider("heater");
  });

  // Input Enter "Heizkosten berechnen"
  document.getElementById('user-input-heater').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      prepareCostCalculation("heater");
      showSlider("heater");
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

  document
    .getElementById("heater-select")
    .addEventListener("change", (e) => {
      document.getElementById("calculateHeater").removeAttribute("disabled");
    })
}

function showSlider(type){

  // get slider style
  let sliderStyle = document.getElementById("range-slider-" + type).style;

  if(sliderStyle.cssText == "none") {
    sliderStyle.cssText = "block";
  } else {
    sliderStyle.cssText = "none";
  }

}


// triggered by buttons "... berechnen"
function prepareCostCalculation(type) {

  let costType;

  switch (type) {
    case "heater":
      consumption = document.getElementById("user-input-heater").value;
      costType = document.getElementById("heater-select").value;
      dropdownSelect = costType;

      // reset slider to 0
      document.getElementById("range-slider-heater").value = 0;
      sliderValue(0, "heater");

      break;
    case "electricity":
      consumption = document.getElementById("user-input-electricity").value;
      costType = "electricity";

      // reset slider to 0
      document.getElementById("range-slider-electricity").value = 0;
      sliderValue(0, "electricity");
    default:
      break;
  }

  // reset fixed 2023 for slider
  delete fixed2023Cost[costType];

  // eg costType = "gas", type = "heater"
  calculateYearCosts(costType, type);
}

function calculateYearCosts(type, resultType) {

  // calculate 2021
  let calcCost2021 = parseInt((data.cost2021[type] * consumption).toFixed(0));
  data.cost[2021][type] = calcCost2021;

  for (let [key, value] of Object.entries(data.costIncrease)) {
    // will get electricity value increase of current year and add it with costs of year before
    let cost =
      (value[type] / 100) * data.cost[key - 1][type] + data.cost[key - 1][type];

    // round result
    data.cost[key][type] = parseInt(cost.toFixed(0));
  }

  // show values (for years) in table
  for (let [key, value] of Object.entries(data.cost)) {

    // take element in table
    let elementTable = document.getElementById('calc-result-' + resultType + '-' + key);

    // set value
    elementTable.textContent = `${value[type]}€`;
  }


  // calculation of the difference between the years
  // Difference from 2021 to 2022
  let difEuro2122 = parseInt(differenceEuro(data.cost[2021][type], data.cost[2022][type]).toFixed(0));
  let difPerc2122 = parseInt(differencePercent(difEuro2122, data.cost[2021][type]).toFixed(0));

  // Difference from 2022 to 2023
  let difEuro2223 = parseInt(differenceEuro(data.cost[2022][type], data.cost[2023][type]).toFixed(0));
  let difPerc2223 = parseInt(differencePercent(difEuro2223, data.cost[2022][type]).toFixed(0));

  // show values (difference) in table
  let diffTd = document.getElementById("calc-result-" + resultType + "-diff-2122-euro");

  diffTd.textContent = (difEuro2122 > 0 ? "+" : "") + difEuro2122+"€";
  diffTd.classList.value = "";
  diffTd.classList.add( (difEuro2122 > 0 ? "text-danger" : "text-success") );


  diffTd = document.getElementById("calc-result-" + resultType + "-diff-2122-perc");

  diffTd.textContent = (difPerc2122 > 0 ? "+" : "") + difPerc2122+"%";
  diffTd.classList.value = "";
  diffTd.classList.add( (difPerc2122 > 0 ? "text-danger" : "text-success") );


  diffTd = document.getElementById("calc-result-" + resultType + "-diff-2223-euro");

  diffTd.textContent = (difEuro2223 > 0 ? "+" : "") + difEuro2223+"€";
  diffTd.classList.value = "";
  diffTd.classList.add( (difEuro2223 > 0 ? "text-danger" : "text-success") );


  diffTd = document.getElementById("calc-result-" + resultType + "-diff-2223-perc");

  diffTd.textContent = (difPerc2223 > 0 ? "+" : "") + difPerc2223+"%";
  diffTd.classList.value = "";
  diffTd.classList.add( (difPerc2223 > 0 ? "text-danger" : "text-success") );

  // show scenario
  document.getElementById("scenario-" + resultType).textContent = data.cost2021[type];

  // show table (remove display: none)
  document.getElementById("table-" + resultType).style = "";
}

/* 
* Slider
*/


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


  // take element in table
  let elementTable = document.getElementById('calc-result-' + resultType + '-2023');

  // set value
  elementTable.textContent = `${calculation}€`;


  // calculating the new difference
  let difEuro2223 = parseInt(differenceEuro(data.cost[2022][type], data.cost[2023][type]).toFixed(0));
  let difPerc2223 = parseInt(differencePercent(difEuro2223, data.cost[2022][type]).toFixed(0));

  let diffTd = document.getElementById("calc-result-" + resultType + "-diff-2223-euro");

  diffTd.textContent = (difEuro2223 > 0 ? "+" : "") + difEuro2223+"€";
  diffTd.classList.value = "";
  diffTd.classList.add( (difEuro2223 > 0 ? "text-danger" : "text-success") );

  
  diffTd = document.getElementById("calc-result-" + resultType + "-diff-2223-perc");

  diffTd.textContent = (difPerc2223 > 0 ? "+" : "") + difPerc2223+"%";
  diffTd.classList.value = "";
  diffTd.classList.add( (difPerc2223 > 0 ? "text-danger" : "text-success") );
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

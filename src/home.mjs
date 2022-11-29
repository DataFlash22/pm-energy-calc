import { differenceEuro, differencePercent } from "./calculations.mjs";

export let template = `<div class="home" style="padding:1rem">
<h2 class="text-center">Willkommen auf ERB!</h2>
<hr>
<div class="container mb-3">

  <div class="pb-4">
    Diese Webseite wurde im Rahmen der Veranstaltung Projektmanagement an der Hochschule Flensburg von Daniel Brügge, Pascal Ahlf, Tim Schmidt und Tobias S. Rönnau entwickelt.
    Sie versucht die Folgen der Energiekrise abzumildern, indem wir durch Prognoserechnungen die Höhe von kommenden Energierechnungen ermitteln.
  </div>

  <div class="border rounded-2" style="padding: 5px 15px 5px 15px">
    <h2>Strom</h2>

    <div class="input-group mb-3">
      <span class="input-group-text">Vorjahresverbrauch (in kWh):</span>
      <textarea type="number" class="form-control" placeholder="Vorjahresverbrauch (in kWh)..." aria-label="Recipient's username" aria-describedby="button-addon2" id="user-input-electricity" value="4500">
      <button id="calculateElectricity" class="btn btn-warning" type="button">Stromkosten berechnen</button>
    </div>

    <!-- <button id="calculateElectricity" class="btn btn-warning">Stromkosten berechnen</button>
    <label for="user-input-electricity">Vorjahresverbrauch (in kw/h):</label>
    <input type="number" id="user-input-electricity" value="4500"> -->

    <input style="display:none" type="range" class="form-range mt-2" min="-100" max="100" id="range-slider-electricity">
    <p class="text-center" id="range-slider-electricity-value"></p>
    <div class="table-responsive" style="display:none" id="table-electricity">
      <p>Szenario: <span id="scenario-electricity"></span>€ pro kWh in 2021</p>

      <table class="table table-light table-borderless" style="text-align: center;">
        <thead>
          <tr class="border-bottom">
            <th scope="col">2021</th>
            <th scope="col" style="width: 30px"></th>
            <th scope="col">Differenz</th>
            <th scope="col" style="width: 30px"></th>
            <th scope="col">2022</th>
            <th scope="col" style="width: 30px"></th>
            <th scope="col">Differenz</th>
            <th scope="col" style="width: 30px"></th>
            <th scope="col">2023</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="2" style="vertical-align: middle"><div id="calc-result-electricity-2021"></div></td>
            <td rowspan="2"><div class="arrow">⇒</div></td>
            <td>
              <span id="calc-result-electricity-diff-2122-euro"></span>
            </td>
            <td rowspan="2"><div class="arrow">⇒</div></td>
            <td rowspan="2" style="vertical-align: middle"><div id="calc-result-electricity-2022"></div></td>
            <td rowspan="2"><div class="arrow">⇒</div></td>
            <td>
              <span id="calc-result-electricity-diff-2223-euro"></span>
            </td>
            <td rowspan="2"><div class="arrow">⇒</div></td>
            <td rowspan="2" style="vertical-align: middle"><div id="calc-result-electricity-2023"></div></td>
          </tr>
          <tr>
            <td>
              <span id="calc-result-electricity-diff-2122-perc"></span>
            </td>
            <td>
              <span id="calc-result-electricity-diff-2223-perc"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  
  <br />

  <div class="border rounded-2" style="padding: 5px 15px 5px 15px">
    <h2> Andere Energieträger </h2>

    <div class="input-group mb-3">
      <select class="form-select" aria-label="Heizung Dropdown" id="heater-select" style="flex-basis: 320px; flex-grow: 0;">
        <option value="" disabled selected hidden>Wähle einen Energieträger</option> 
        <option value="gas">Gas</option>
        <option value="oil">Öl</option>
        <option value="districtHeating">Fernwärme</option>
        <option value="heatPump">Wärmepumpe</option>
        <option value="woodPellets">Holzpellets</option>
      </select>
      <span class="input-group-text">Vorjahresverbrauch (in kWh):</span>
      <textarea type="number" class="form-control" placeholder="Vorjahresverbrauch (in kWh)..." aria-label="Recipient's username" aria-describedby="button-addon2" id="user-input-heater" value="4500">
      <button id="calculateHeater" class="btn btn-danger" type="button" disabled>Heizkosten berechnen</button>
    </div>


    <!-- <select class="form-select" style="width: 280px !important" aria-label="Heizung Dropdown" id="heater-select">
      <option value="" disabled selected hidden>Wähle einen Energieträger</option> 
      <option value="gas">Gas</option>
      <option value="oil">Öl</option>
      <option value="districtHeating">Fernwärme</option>
      <option value="heatPump">Wärmepumpe</option>
      <option value="woodPellets">Holzpellets</option>
    </select>
    <br />
    <button id="calculateHeater" class="btn btn-danger" disabled>Heizkosten berechnen</button>
    <label for="user-input-heater">Vorjahresverbrauch (in kw/h):</label>
    <input type="number" id="user-input-heater" value="4500"> -->

    <input style="display:none" type="range" class="form-range mt-2" min="-100" max="100" id="range-slider-heater">
    <p class="text-center" id="range-slider-heater-value"></p>
    <h4 class="text-center w3-flat-pomegranate" style="display:none;" id="errorHandling">Bitte wähl eine Energiequelle aus.</h4>
    <div class="table-responsive" style="display:none" id="table-heater">
      <p>Szenario: <span id="scenario-heater"></span>€ pro kWh in 2021</p>

      <table class="table table-light table-borderless" style="text-align: center;">
        <thead>
          <tr class="border-bottom">
            <th scope="col">2021</th>
            <th scope="col" style="width: 30px"></th>
            <th scope="col">Differenz</th>
            <th scope="col" style="width: 30px"></th>
            <th scope="col">2022</th>
            <th scope="col" style="width: 30px"></th>
            <th scope="col">Differenz</th>
            <th scope="col" style="width: 30px"></th>
            <th scope="col">2023</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="2" style="vertical-align: middle"><div id="calc-result-heater-2021"></div></td>
            <td rowspan="2"><div class="arrow">⇒</div></td>
            <td>
              <span id="calc-result-heater-diff-2122-euro"></span>
            </td>
            <td rowspan="2"><div class="arrow">⇒</div></td>
            <td rowspan="2" style="vertical-align: middle"><div id="calc-result-heater-2022"></div></td>
            <td rowspan="2"><div class="arrow">⇒</div></td>
            <td>
              <span id="calc-result-heater-diff-2223-euro"></span>
            </td>
            <td rowspan="2"><div class="arrow">⇒</div></td>
            <td rowspan="2" style="vertical-align: middle"><div id="calc-result-heater-2023"></div></td>
          </tr>
          <tr>
            <td>
              <span id="calc-result-heater-diff-2122-perc"></span>
            </td>
            <td>
              <span id="calc-result-heater-diff-2223-perc"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="pt-4">
    <p>Falls du deinen Stromverbrauch gerade nicht vorliegen hast, haben wir hier ein paar Standardszenarien für Sie durchgerechnet:</p>
    <h4>Ein Einfamilienhaus mit 4 Personen</h4>
    <p>hat im deutschen Schnitt einen Verbrauch von 4.000kWh. Daraus ergeben sich bei unseren Kakulationen folgende Werte:
      <ul>
        <li>2021: 1120€</li>
        <li>2022: 1232€</li>
        <li>2023: 1663€</li>
      </ul>
    </p>

    <h4>Eine Wohnung mit 1 Person</h4>
    <p>hat im deutschen Schnitt einen Verbrauch von 1.500kWh. Daraus ergeben sich bei unseren Kakulationen folgende Werte:
      <ul>
        <li>2021: 420€</li>
        <li>2022: 462€</li>
        <li>2023: 624€</li>
      </ul>
    </p>

    <h4>Eine Wohnung mit 2 Personen</h4>
    <p>hat im deutschen Schnitt einen Verbrauch von 2.100kWh. Daraus ergeben sich bei unseren Kakulationen folgende Werte:
      <ul>
        <li>2021: 588€</li>
        <li>2022: 647€</li>
        <li>2023: 873€</li>
      </ul>
    </p>
  </div>

  <div class="pb-4">
    Zur besseren Vergleichbarkeit nutzt der Rechner für alle Typen von Heizsystemen die Einheit kWh. Da diese jedoch nicht bei jedem Energieträger die Handelseinheit ist, muss es vorher umgerechnet werden. Hierzu empfiehlt es sich den Brennwert beim Versorger zu erfragen. Alternativ können sie mit Hilfe  <a href="https://www.energie-umwelt.ch/tools/835-einheiten-umrechner-fuer-verschiedene-heizenergie">dieser Website (kWh Umrechner)</a> anhand gängiger Durchschnittswerte den ungefähren Verbrauch ermitteln.
  </div>

  <div class="disclaimer pt-3">
    Die Berechnungen basieren auf den Daten mehrerer Quellen und wurden nach bestem Wissen und Gewissen von den Projektteilnehmern zusammengetragen. Trotzdem handelt es sich hierbei um eine Prognose. Dementsprechend können unsere Berechnungen mitunter stark von der tatsächlichen Abrechnung abweichen.
  </div>
</div>
</div>
`;

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

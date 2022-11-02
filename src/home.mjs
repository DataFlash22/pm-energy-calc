let data = {
    year : [2022, 2023],
    //yearKwh : [0.28, 0.30, 0.60],

    cost2021 : {
        electricity: 0.28,
        gas: 0.50,
        oil: 0.43,
        districtHeating: 0,
        heatPump: 0,
        woodPellets: 0,
    },

    cost : {
        2021 : {},
        2022 : {},
        2023 : {},
    },

    costIncrease : {
        /* 2021 : {
            electricity: 0,
            gas: 0,
            oil: 0,
            districtHeating: 0,
            heatPump: 0,
            woodPellets: 0,
        }, */
        2022 : {
            electricity: 10,
            gas: 106,
            oil: 120,
            districtHeating: 20,
            heatPump: 66,
            woodPellets: 100
        },
        2023 : {
            electricity: 100,
            gas: 80, // Temp, for test
            oil: 70, // Temp, for test
            districtHeating: 0,
            heatPump: 0,
            woodPellets: 0,
        }
    }
};

// User Input for kwH electricity
let consumption, consumptionHeater;
// TEMP; should be come from User
consumption = consumptionHeater = 4500;

let consumptionSliderResult;
let consumptionSliderResultHeater;

let fixed2023ElectricityCost = null;
let fixed2023HeaterCost = null;

let dropdownSelect;

export function init(router){

    /* document.getElementById("to-home").addEventListener("click", (e) => {

        // change route
        router.changeRoute("/");
    }); */

    document.getElementById("calculateElectricity").addEventListener("click", (e) => {
        calculateElectricity();
    });

    document.getElementById("calculateHeater").addEventListener("click", (e) => {
        calculateHeater();
    });

    document.getElementById("range-slider-electricity").addEventListener("input", (e) => {
        slider(e);
    });

    document.getElementById("range-slider-heater").addEventListener("input", (e) => {
        sliderHeater(e);
    });
}

export const template = `
<div class="home">
    <h2 class="text-center">Willkommen auf ERB!</h2>
    <hr>

    <div class="container mb-3">
        <div class="border border-dark rounded-2" style="height: 300px;"></div>
        </div>
    
    <!--<button id="to-home" class="btn btn-primary">Das ist ein Button</button>-->
    <button id="calculateElectricity" class="btn btn-warning">Stromkosten berechnen</button>

    <input type="range" class="form-range" min="-100" max="100" id="range-slider-electricity">
    <p class="text-center" id="range-slider-electricity-value"></p>

    <div id="calc-result-electricity"></div>

    <select class="form-select" aria-label="Heizung Dropdown" id="heater-select">
        <option value="gas" selected>Gas</option>
        <option value="oil">Öl</option>
        <option value="districtHeating">Fernwärme</option>
        <option value="heatPump">Wärmepumpe</option>
        <option value="woodPellets">Holzpellets</option>
      </select>

    <button id="calculateHeater" class="btn btn-danger">Heizkosten berechnen</button>

    <input type="range" class="form-range" min="-100" max="100" id="range-slider-heater">
    <p class="text-center" id="range-slider-heater-value"></p>

    <div id="calc-result-heater"></div>

    </div>
`;

// will trigger by button "Berechnen"
function calculateElectricity(){

    // 1. get input
    // verbrauch
    // TEMP
    // consumption = document.get...value

    // calculate cost of 2021
    let calcCost2021 = parseInt((data.cost2021.electricity * consumption).toFixed(0));
    data.cost[2021].electricity = calcCost2021;

    for(let [key, value] of Object.entries(data.costIncrease)){

        // will get electricity value increase of current year and add it with costs of year before
        let cost = (value.electricity / 100 * data.cost[(key-1)].electricity) + data.cost[(key-1)].electricity;

        // round result
        data.cost[key].electricity = parseInt(cost.toFixed(0));
        }

    let newElements = [];

    // 3. set output
    // create 3 elements for 3 years
    for (let [key, value] of Object.entries(data.cost)){

        let newElement = document.createElement('p');
        newElement.textContent = `${value.electricity}€`;

        newElements.push(newElement);
    }

    document.getElementById('calc-result-electricity').replaceChildren(...newElements);
}

// trigger by slider action
// this function will get the value of the slider and will calculate the consumption from the consumption the user entered
function slider(e){

    let value = e.target.valueAsNumber;

    // will calculate the consumption after slider touched
    // eg. 0% -> 4000 then 100% -> 0, -100% -> 8000
    consumptionSliderResult = (consumption - ((value / 100) * consumption)).toFixed(0);

    calculateLastSlider(value);

    sliderValue(value);
}

// this function will calculate the last costs
// trigger by slider()
function calculateLastSlider(value){

    // set initial value, only for first time
    if(!fixed2023ElectricityCost) fixed2023ElectricityCost = data.cost[2023].electricity;

    // calculating the new 2023 value
    let calculation = fixed2023ElectricityCost - (fixed2023ElectricityCost * (value / 100));
    calculation = parseInt(calculation.toFixed(0));
    data.cost[2023].electricity = calculation;

    let lastChild = document.getElementById('calc-result-electricity').lastChild;

    lastChild.textContent = `${calculation}€`;
}

// trigger by slider()
// this function will handle the "XX% Einsparung" or "xx% höherer Verbrauch"
function sliderValue(value){

    let element = document.getElementById("range-slider-electricity-value");

    let negative = value < 0;

    // always get absolut number
    value = Math.abs(value);

    element.textContent = value + "%" + (negative ? " höherer Verbrauch" : " Einsparung");

    element.classList.remove("text-bg-success", "text-bg-danger");

    if(!negative) element.classList.add("text-bg-success");
    else element.classList.add("text-bg-danger");
}

function calculateHeater(){

    // 1. get input
    // verbrauch & dropdown
    // TEMP

    dropdownSelect = document.getElementById("heater-select").value;

    let calcCost2021 = parseInt((data.cost2021[dropdownSelect] * consumption).toFixed(0));
    data.cost[2021][dropdownSelect] = calcCost2021;

    for(let [key, value] of Object.entries(data.costIncrease)){

        // will get electricity value increase of current year and add it with costs of year before
        let cost = (value[dropdownSelect] / 100 * data.cost[(key-1)][dropdownSelect]) + data.cost[(key-1)][dropdownSelect];

        // round result
        data.cost[key][dropdownSelect] = parseInt(cost.toFixed(0));
        }

    let newElements = [];

    // 3. set output
    // create 3 elements for 3 years
    for (let [key, value] of Object.entries(data.cost)){

        let newElement = document.createElement('p');
        newElement.textContent = `${value[dropdownSelect]}€`;

        newElements.push(newElement);
    }

    document.getElementById('calc-result-heater').replaceChildren(...newElements);
}

// trigger by slider action
// this function will get the value of the slider and will calculate the consumption from the consumption the user entered
function sliderHeater(e){

    let value = e.target.valueAsNumber;

    // will calculate the consumption after slider touched
    // eg. 0% -> 4000 then 100% -> 0, -100% -> 8000
    consumptionSliderResultHeater = (consumptionHeater - ((value / 100) * consumptionHeater)).toFixed(0);

    calculateLastSliderHeater(value);

    sliderValueHeater(value);
}

// this function will calculate the last costs
// trigger by slider()
function calculateLastSliderHeater(value){

    // set initial value, only for first time
    if(!fixed2023HeaterCost) fixed2023HeaterCost = data.cost[2023][dropdownSelect];

    // calculating the new 2023 value
    let calculation = fixed2023HeaterCost - (fixed2023HeaterCost * (value / 100));
    calculation = parseInt(calculation.toFixed(0));
    data.cost[2023][dropdownSelect] = calculation;

    let lastChild = document.getElementById('calc-result-heater').lastChild;

    lastChild.textContent = `${calculation}€`;
}

// trigger by slider()
// this function will handle the "XX% Einsparung" or "xx% höherer Verbrauch"
function sliderValueHeater(value){

    let element = document.getElementById("range-slider-heater-value");

    let negative = value < 0;

    // always get absolut number
    value = Math.abs(value);

    element.textContent = value + "%" + (negative ? " höherer Verbrauch" : " Einsparung");

    element.classList.remove("text-bg-success", "text-bg-danger");

    if(!negative) element.classList.add("text-bg-success");
    else element.classList.add("text-bg-danger");
}
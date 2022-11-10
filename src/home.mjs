import { differenceEuro, differencePercent } from "./calculations.mjs";

let data = {
    year : [2022, 2023],

    // only kWh values
    cost2021 : {
        electricity: 0.28,
        gas: 0.0641,
        oil: 0.07,
        districtHeating: 0.094,
        heatPump: 0.258,
        woodPellets: 0.046,
    },

    cost : {
        2021 : {},
        2022 : {},
        2023 : {},
    },

    // only % values
    costIncrease : {
        2022 : {
            electricity: 10,
            gas: 108,
            oil: 100,
            districtHeating: 20,
            heatPump: 16,
            woodPellets: 65
        },
        2023 : {
            electricity: 35,
            gas: -17,
            oil: 20,
            districtHeating: 166,
            heatPump: 26,
            woodPellets: 15,
        }
    }
};

// to save fixed2023 costs for slider
let fixed2023Cost = {};

// User Input for kwH electricity TEMP
let consumption, consumptionHeater;
// TEMP; should be come from User
consumption = consumptionHeater = 4500;

// value is set by prepareCostCalculation()
let dropdownSelect;



export function init(router){

    /* document.getElementById("to-home").addEventListener("click", (e) => {

        // change route
        router.changeRoute("/");
    }); */

    document.getElementById("calculateElectricity").addEventListener("click", (e) => {
        prepareCostCalculation("electricity");
    });

    document.getElementById("calculateHeater").addEventListener("click", (e) => {
        prepareCostCalculation("heater");
    });

    document.getElementById("range-slider-electricity").addEventListener("input", (e) => {
        prepareSlider(e, "electricity");
    });

    document.getElementById("range-slider-heater").addEventListener("input", (e) => {
        prepareSlider(e, "heater");
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


function prepareCostCalculation(type){

    // TODO
    // get input value (something linke document.getElementById('input-'+type))
    // set value in global value

    let costType;

    switch (type) {
        case "heater":
            costType = document.getElementById("heater-select").value;
            dropdownSelect = costType;
            break;
        case "electricity":
            costType = "electricity";
        default:
            break;
    }

    // eg costType = "gas", type = "heater"
    calculateYearCosts(costType, type);
}

function calculateYearCosts(type, resultType){

    let calcCost2021 = parseInt((data.cost2021[type] * consumption).toFixed(0));
    data.cost[2021][type] = calcCost2021;

    for(let [key, value] of Object.entries(data.costIncrease)){

        // will get electricity value increase of current year and add it with costs of year before
        let cost = (value[type] / 100 * data.cost[(key-1)][type]) + data.cost[(key-1)][type];

        // round result
        data.cost[key][type] = parseInt(cost.toFixed(0));
        }

    let newElements = [];

    // calculation of the difference between the years
    // Difference from 2021 to 2022
    let difEuro2122 = differenceEuro(data.cost[2021][type], data.cost[2022][type]);
    let difPerc2122 = differencePercent(difEuro2122, data.cost[2021][type]);

    // Difference from 2022 to 2023
    let difEuro2223 = differenceEuro(data.cost[2022][type], data.cost[2023][type]);
    let difPerc2223 = differencePercent(difEuro2223, data.cost[2021][type]);

    // TODO: Add difference into HTML

    // 3. set output
    // create 3 elements for 3 years
    for (let [key, value] of Object.entries(data.cost)){

        let newElement = document.createElement('p');
        newElement.textContent = `${value[type]}€`;

        newElements.push(newElement);
    }

    document.getElementById('calc-result-'+resultType).replaceChildren(...newElements);
}

function prepareSlider(e, type){

    let value = e.target.valueAsNumber;

    let costType;

    switch (type) {
        case "heater":

            // abort here if dropdown was not set from prepareCostCalculation before
            if(!dropdownSelect) return;

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

function calculate2023Slider(value, type, resultType){

    // set initial value, only for first time
    if(typeof fixed2023Cost[type] == "undefined") fixed2023Cost[type] = data.cost[2023][type];

    // calculating the new 2023 value
    let calculation = fixed2023Cost[type] - (fixed2023Cost[type] * (value / 100));
    calculation = parseInt(calculation.toFixed(0));
    data.cost[2023][type] = calculation;

    // calculating the new difference
    let difEuro2223 = differenceEuro(data.cost[2022][type], data.cost[2023][type]);
    let difPerc2223 = differencePercent(difEuro2223, data.cost[2021][type]);

    // TODO: Add difference into HTML

    // take last child (should be the value of 2023)
    let lastChild = document.getElementById('calc-result-'+resultType).lastChild;

    // replace textContent with new calculation
    lastChild.textContent = `${calculation}€`;
}

// trigger by slider()
// this function will handle the "XX% Einsparung" or "xx% höherer Verbrauch"
function sliderValue(value, resultType){

    let element = document.getElementById("range-slider-"+resultType+"-value");

    let negative = value < 0;

    // always get absolut number
    value = Math.abs(value);

    element.textContent = value + "%" + (negative ? " höherer Verbrauch" : " Einsparung");

    element.classList.remove("text-bg-success", "text-bg-danger");

    if(!negative) element.classList.add("text-bg-success");
    else element.classList.add("text-bg-danger");
}
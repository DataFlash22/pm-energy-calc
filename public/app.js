(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/router.mjs
  var Router = class {
    constructor() {
      __publicField(this, "routes", /* @__PURE__ */ new Map());
      __publicField(this, "containerElement", document.getElementById("container-content"));
      this.routes.set(404, { template: "<h2>404 - not found</h2>", callback: null, callbackParam: [] });
      for (const element of document.getElementsByClassName("nav-link")) {
        element.addEventListener("click", (e) => {
          e.preventDefault();
          this.changeRoute(e.target.getAttribute("link"));
        });
      }
      ;
      window.onpopstate = () => this.loadContent(window.location.pathname);
    }
    registerRoute(path, obj) {
      this.routes.set(path, obj);
    }
    loadContent(path) {
      var _a;
      const obj = (_a = this.routes.get(path)) != null ? _a : this.routes.get(404);
      const newElement = document.createElement("template");
      if (typeof obj === "object" && "template" in obj) {
        if (obj.template.endsWith(".html")) {
          var text = "";
          function loadHtml() {
            return __async(this, null, function* () {
              const response = yield fetch(obj.template);
              text = yield response.text();
            });
          }
          loadHtml().then(() => {
            newElement.innerHTML = text;
            this.containerElement.replaceChildren(...newElement.content.childNodes);
            if (typeof obj.callback === "function")
              obj.callback(...obj.callbackParam);
          });
        } else {
          newElement.innerHTML = obj.template.trim();
          this.containerElement.replaceChildren(...newElement.content.childNodes);
          if (typeof obj.callback === "function")
            obj.callback(...obj.callbackParam);
        }
      }
      const menuElementList = document.getElementsByClassName("nav-link");
      const menuElementSelected = document.querySelectorAll(`[link="${path}"]`);
      for (const element of menuElementList) {
        element.classList.remove("active");
      }
      for (const element of menuElementSelected) {
        element.classList.add("active");
      }
    }
    changeRoute(path) {
      window.history.pushState({ path }, "", path);
      this.loadContent(path);
    }
  };

  // src/calculations.mjs
  function differenceEuro(lastYearCosts, currentYearCost) {
    return currentYearCost - lastYearCosts;
  }
  function differencePercent(euroDif, lastYearCosts) {
    return euroDif / lastYearCosts * 100;
  }

  // src/home.mjs
  var data = {
    year: [2022, 2023],
    cost2021: {
      electricity: 0.28,
      gas: 0.0641,
      oil: 0.07,
      districtHeating: 0.094,
      heatPump: 0.258,
      woodPellets: 0.046
    },
    cost: {
      2021: {},
      2022: {},
      2023: {}
    },
    costIncrease: {
      2022: {
        electricity: 10,
        gas: 108,
        oil: 100,
        districtHeating: 20,
        heatPump: 16,
        woodPellets: 65
      },
      2023: {
        electricity: 35,
        gas: -17,
        oil: 20,
        districtHeating: 166,
        heatPump: 26,
        woodPellets: 15
      }
    }
  };
  var fixed2023Cost = {};
  var consumption;
  consumption = 4500;
  var dropdownSelect;
  function init(router2) {
    document.getElementById("calculateElectricity").addEventListener("click", (e) => {
      prepareCostCalculation("electricity");
      showSlider("electricity");
    });
    document.getElementById("user-input-electricity").addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        prepareCostCalculation("electricity");
        showSlider("electricity");
      }
    });
    document.getElementById("calculateHeater").addEventListener("click", (e) => {
      prepareCostCalculation("heater");
      showSlider("heater");
    });
    document.getElementById("user-input-heater").addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        prepareCostCalculation("heater");
        showSlider("heater");
      }
    });
    document.getElementById("range-slider-electricity").addEventListener("input", (e) => {
      prepareSlider(e, "electricity");
    });
    document.getElementById("range-slider-heater").addEventListener("input", (e) => {
      prepareSlider(e, "heater");
    });
    document.getElementById("heater-select").addEventListener("change", (e) => {
      document.getElementById("calculateHeater").removeAttribute("disabled");
    });
  }
  function showSlider(type) {
    let sliderStyle = document.getElementById("range-slider-" + type).style;
    if (sliderStyle.cssText == "none") {
      sliderStyle.cssText = "block";
    } else {
      sliderStyle.cssText = "none";
    }
  }
  function prepareCostCalculation(type) {
    let costType;
    switch (type) {
      case "heater":
        consumption = document.getElementById("user-input-heater").value;
        costType = document.getElementById("heater-select").value;
        dropdownSelect = costType;
        document.getElementById("range-slider-heater").value = 0;
        sliderValue(0, "heater");
        break;
      case "electricity":
        consumption = document.getElementById("user-input-electricity").value;
        costType = "electricity";
        document.getElementById("range-slider-electricity").value = 0;
        sliderValue(0, "electricity");
      default:
        break;
    }
    delete fixed2023Cost[costType];
    calculateYearCosts(costType, type);
  }
  function calculateYearCosts(type, resultType) {
    let calcCost2021 = parseInt((data.cost2021[type] * consumption).toFixed(0));
    data.cost[2021][type] = calcCost2021;
    for (let [key, value] of Object.entries(data.costIncrease)) {
      let cost = value[type] / 100 * data.cost[key - 1][type] + data.cost[key - 1][type];
      data.cost[key][type] = parseInt(cost.toFixed(0));
    }
    for (let [key, value] of Object.entries(data.cost)) {
      let elementTable = document.getElementById("calc-result-" + resultType + "-" + key);
      elementTable.textContent = `${value[type]}\u20AC`;
    }
    let difEuro2122 = parseInt(differenceEuro(data.cost[2021][type], data.cost[2022][type]).toFixed(0));
    let difPerc2122 = parseInt(differencePercent(difEuro2122, data.cost[2021][type]).toFixed(0));
    let difEuro2223 = parseInt(differenceEuro(data.cost[2022][type], data.cost[2023][type]).toFixed(0));
    let difPerc2223 = parseInt(differencePercent(difEuro2223, data.cost[2022][type]).toFixed(0));
    let diffTd = document.getElementById("calc-result-" + resultType + "-diff-2122-euro");
    diffTd.textContent = (difEuro2122 > 0 ? "+" : "") + difEuro2122 + "\u20AC";
    diffTd.classList.value = "";
    diffTd.classList.add(difEuro2122 > 0 ? "text-danger" : "text-success");
    diffTd = document.getElementById("calc-result-" + resultType + "-diff-2122-perc");
    diffTd.textContent = (difPerc2122 > 0 ? "+" : "") + difPerc2122 + "%";
    diffTd.classList.value = "";
    diffTd.classList.add(difPerc2122 > 0 ? "text-danger" : "text-success");
    diffTd = document.getElementById("calc-result-" + resultType + "-diff-2223-euro");
    diffTd.textContent = (difEuro2223 > 0 ? "+" : "") + difEuro2223 + "\u20AC";
    diffTd.classList.value = "";
    diffTd.classList.add(difEuro2223 > 0 ? "text-danger" : "text-success");
    diffTd = document.getElementById("calc-result-" + resultType + "-diff-2223-perc");
    diffTd.textContent = (difPerc2223 > 0 ? "+" : "") + difPerc2223 + "%";
    diffTd.classList.value = "";
    diffTd.classList.add(difPerc2223 > 0 ? "text-danger" : "text-success");
    document.getElementById("scenario-" + resultType).textContent = data.cost2021[type];
    document.getElementById("table-" + resultType).style = "";
  }
  function prepareSlider(e, type) {
    let value = e.target.valueAsNumber;
    let costType;
    switch (type) {
      case "heater":
        if (!dropdownSelect)
          return;
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
    if (typeof fixed2023Cost[type] == "undefined")
      fixed2023Cost[type] = data.cost[2023][type];
    let calculation = fixed2023Cost[type] - fixed2023Cost[type] * (value / 100);
    calculation = parseInt(calculation.toFixed(0));
    data.cost[2023][type] = calculation;
    let elementTable = document.getElementById("calc-result-" + resultType + "-2023");
    elementTable.textContent = `${calculation}\u20AC`;
    let difEuro2223 = parseInt(differenceEuro(data.cost[2022][type], data.cost[2023][type]).toFixed(0));
    let difPerc2223 = parseInt(differencePercent(difEuro2223, data.cost[2022][type]).toFixed(0));
    let diffTd = document.getElementById("calc-result-" + resultType + "-diff-2223-euro");
    diffTd.textContent = (difEuro2223 > 0 ? "+" : "") + difEuro2223 + "\u20AC";
    diffTd.classList.value = "";
    diffTd.classList.add(difEuro2223 > 0 ? "text-danger" : "text-success");
    diffTd = document.getElementById("calc-result-" + resultType + "-diff-2223-perc");
    diffTd.textContent = (difPerc2223 > 0 ? "+" : "") + difPerc2223 + "%";
    diffTd.classList.value = "";
    diffTd.classList.add(difPerc2223 > 0 ? "text-danger" : "text-success");
  }
  function sliderValue(value, resultType) {
    let element = document.getElementById(
      "range-slider-" + resultType + "-value"
    );
    let negative = value < 0;
    value = Math.abs(value);
    element.textContent = value + "%" + (negative ? " h\xF6herer Verbrauch" : " Einsparung");
    element.classList.remove("text-bg-success", "text-bg-danger");
    if (!negative)
      element.classList.add("text-bg-success");
    else
      element.classList.add("text-bg-danger");
  }

  // src/app.js
  var router = new Router();
  router.registerRoute("/", { template: "home.html", callback: init, callbackParam: [router] });
  router.registerRoute("/imprint", { template: "impressum.html", callback: null, callbackParam: [] });
  router.loadContent(window.location.pathname);
})();

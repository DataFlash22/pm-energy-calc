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
  var template = `<div class="home" style="padding:1rem">
<h2 class="text-center">Willkommen auf ERB!</h2>
<hr>
<div class="container mb-3">

  <div class="pb-4">
    Diese Webseite ist im Rahmen der Veranstaltung Projektmanagement an der Hochschule Flensburg von Daniel Br\xFCgge, Pascal Ahlf, Tim Schmidt und Tobias S. R\xF6nnau entwickelt worden.
    Diese Webseite versucht die Folgen der Energiekrise abzumildern, indem wir durch Prognoserechnungen die H\xF6he von kommenden Energierechnungen ermitteln.
  </div>

  <div class="border rounded-2" style="padding: 5px 15px 5px 15px">
    <h2>Strom</h2>

    <div class="input-group mb-3">
      <span class="input-group-text">Vorjahresverbrauch (in kWh):</span>
      <input type="number" class="form-control" placeholder="Vorjahresverbrauch (in kWh)..." aria-label="Recipient's username" aria-describedby="button-addon2" id="user-input-electricity" value="4500">
      <button id="calculateElectricity" class="btn btn-warning" type="button">Stromkosten berechnen</button>
    </div>

    <!-- <button id="calculateElectricity" class="btn btn-warning">Stromkosten berechnen</button>
    <label for="user-input-electricity">Vorjahresverbrauch (in kw/h):</label>
    <input type="number" id="user-input-electricity" value="4500"> -->

    <input style="display:none" type="range" class="form-range mt-2" min="-100" max="100" id="range-slider-electricity">
    <p class="text-center" id="range-slider-electricity-value"></p>
    <div class="table-responsive" style="display:none" id="table-electricity">
      <p>Szenario: <span id="scenario-electricity"></span>\u20AC pro kWh in 2021</p>

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
            <td rowspan="2"><div class="arrow">\u21D2</div></td>
            <td>
              <span id="calc-result-electricity-diff-2122-euro"></span>
            </td>
            <td rowspan="2"><div class="arrow">\u21D2</div></td>
            <td rowspan="2" style="vertical-align: middle"><div id="calc-result-electricity-2022"></div></td>
            <td rowspan="2"><div class="arrow">\u21D2</div></td>
            <td>
              <span id="calc-result-electricity-diff-2223-euro"></span>
            </td>
            <td rowspan="2"><div class="arrow">\u21D2</div></td>
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
    <h2> Andere Energietr\xE4ger </h2>

    <div class="input-group mb-3">
      <select class="form-select" aria-label="Heizung Dropdown" id="heater-select" style="flex-basis: 320px; flex-grow: 0;">
        <option value="" disabled selected hidden>W\xE4hle einen Energietr\xE4ger</option> 
        <option value="gas">Gas</option>
        <option value="oil">\xD6l</option>
        <option value="districtHeating">Fernw\xE4rme</option>
        <option value="heatPump">W\xE4rmepumpe</option>
        <option value="woodPellets">Holzpellets</option>
      </select>
      <span class="input-group-text">Vorjahresverbrauch (in kWh):</span>
      <input type="number" class="form-control" placeholder="Vorjahresverbrauch (in kWh)..." aria-label="Recipient's username" aria-describedby="button-addon2" id="user-input-heater" value="4500">
      <button id="calculateHeater" class="btn btn-danger" type="button" disabled>Heizkosten berechnen</button>
    </div>


    <!-- <select class="form-select" style="width: 280px !important" aria-label="Heizung Dropdown" id="heater-select">
      <option value="" disabled selected hidden>W\xE4hle einen Energietr\xE4ger</option> 
      <option value="gas">Gas</option>
      <option value="oil">\xD6l</option>
      <option value="districtHeating">Fernw\xE4rme</option>
      <option value="heatPump">W\xE4rmepumpe</option>
      <option value="woodPellets">Holzpellets</option>
    </select>
    <br />
    <button id="calculateHeater" class="btn btn-danger" disabled>Heizkosten berechnen</button>
    <label for="user-input-heater">Vorjahresverbrauch (in kw/h):</label>
    <input type="number" id="user-input-heater" value="4500"> -->

    <input style="display:none" type="range" class="form-range mt-2" min="-100" max="100" id="range-slider-heater">
    <p class="text-center" id="range-slider-heater-value"></p>
    <h4 class="text-center w3-flat-pomegranate" style="display:none;" id="errorHandling">Bitte w\xE4hl eine Energiequelle aus.</h4>
    <div class="table-responsive" style="display:none" id="table-heater">
      <p>Szenario: <span id="scenario-heater"></span>\u20AC pro kWh in 2021</p>

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
            <td rowspan="2"><div class="arrow">\u21D2</div></td>
            <td>
              <span id="calc-result-heater-diff-2122-euro"></span>
            </td>
            <td rowspan="2"><div class="arrow">\u21D2</div></td>
            <td rowspan="2" style="vertical-align: middle"><div id="calc-result-heater-2022"></div></td>
            <td rowspan="2"><div class="arrow">\u21D2</div></td>
            <td>
              <span id="calc-result-heater-diff-2223-euro"></span>
            </td>
            <td rowspan="2"><div class="arrow">\u21D2</div></td>
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
    <p>Falls du deinen Stromverbrauch gerade nicht vorliegen hast haben wir hier ein paar Standartszenarien durchgerechnet:</p>
    <h4>Einfamilienhaus mit 4 Personen</h4>
    <p>Ein Einfamilienhaus hat im deutschen Schnitt einen Verbrauch von 4.000kWh. Daraus ergeben sich bei unseren Kakulationen folgende Werte:
      <ul>
        <li>2021: 1120\u20AC</li>
        <li>2022: 1232\u20AC</li>
        <li>2023: 1663\u20AC</li>
      </ul>
    </p>

    <h4>Wohnung mit 1 Person</h4>
    <p>Eine Wohnung mit einer Person hat im deutschen Schnitt einen Verbrauch von 1.500kWh. Daraus ergeben sich bei unseren Kakulationen folgende Werte:
      <ul>
        <li>2021: 420\u20AC</li>
        <li>2022: 462\u20AC</li>
        <li>2023: 624\u20AC</li>
      </ul>
    </p>

    <h4>Wohnung mit 2 Personen</h4>
    <p>Eine Wohnung mit zwei Personen hat im deutschen Schnitt einen Verbrauch von 2.100kWh. Daraus ergeben sich bei unseren Kakulationen folgende Werte:
      <ul>
        <li>2021: 588\u20AC</li>
        <li>2022: 647\u20AC</li>
        <li>2023: 873\u20AC</li>
      </ul>
    </p>
  </div>

  <div class="pb-4">
    Zur besseren Vergleichbarkeit nutzt der Rechner f\xFCr alle Typen von Heizsystemen die Einheit kWh. Da diese jedoch nicht bei jedem Energietr\xE4ger die Handelseinheit ist, muss es vorher umgerechnet werden. Hierzu empfiehlt es sich, den Brennwert beim Versorger zu erfragen. Alternativ k\xF6nnen sie mit Hilfe dieser Website <a href="https://www.energie-umwelt.ch/tools/835-einheiten-umrechner-fuer-verschiedene-heizenergie">kWh Umrechner</a> anhand g\xE4ngiger Durchschnittswerte den ungef\xE4hren Verbrauch zu ermitteln.
  </div>

  <div class="disclaimer pt-3">
    Die get\xE4tigten Berechnungen sind basierend auf den Daten mehrerer Quellen und nach bestem Wissen und Gewissen von den Projektteilnehmern get\xE4tigt, trotzdem handelt es sich hierbei um eine Prognose. Dementsprechend k\xF6nnen unsere Berechnungen mitunter stark von der tats\xE4chlichen Abrechnung abweichen.
  </div>
</div>
</div>
`;
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

  // src/imprint.mjs
  var template2 = `
<div class='impressum'><h1>Impressum</h1><p>Angaben gem\xE4\xDF \xA7 5 TMG</p><p>Daniel Br\xFCgge <br> 
    Schreiberstra\xDFe 26<br> 
    24937 Flensburg <br> 
    </p><p> <strong>Vertreten durch: </strong><br>
    Daniel Br\xFCgge<br>
    Pascal Ahlf<br>
    Tobias R\xF6nnau<br>
    Tim Schmidt<br>
    </p><p><strong>Kontakt:</strong> <br>
    Telefon: 0152-09879864<br>
    E-Mail: <a href='mailto:privat@d-bruegge.de'>privat@d-bruegge.de</a></br></p><p><strong>Haftungsausschluss: </strong><br><br><strong>Haftung f\xFCr Inhalte</strong><br><br>
    Die Inhalte unserer Seiten wurden mit gr\xF6\xDFter Sorgfalt erstellt. F\xFCr die Richtigkeit, Vollst\xE4ndigkeit und Aktualit\xE4t der Inhalte k\xF6nnen wir jedoch keine Gew\xE4hr \xFCbernehmen. Als Diensteanbieter sind wir gem\xE4\xDF \xA7 7 Abs.1 TMG f\xFCr eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach \xA7\xA7 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, \xFCbermittelte oder gespeicherte fremde Informationen zu \xFCberwachen oder nach Umst\xE4nden zu forschen, die auf eine rechtswidrige T\xE4tigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unber\xFChrt. Eine diesbez\xFCgliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung m\xF6glich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.<br><br><strong>Urheberrecht</strong><br><br>
    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielf\xE4ltigung, Bearbeitung, Verbreitung und jede Art der Verwertung au\xDFerhalb der Grenzen des Urheberrechtes bed\xFCrfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur f\xFCr den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.<br><br><strong>Datenschutz</strong><br><br>
    Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten m\xF6glich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit m\xF6glich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdr\xFCckliche Zustimmung nicht an Dritte weitergegeben. <br>
    Wir weisen darauf hin, dass die Daten\xFCbertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitsl\xFCcken aufweisen kann. Ein l\xFCckenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht m\xF6glich. <br>
    Der Nutzung von im Rahmen der Impressumspflicht ver\xF6ffentlichten Kontaktdaten durch Dritte zur \xDCbersendung von nicht ausdr\xFCcklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdr\xFCcklich widersprochen. Die Betreiber der Seiten behalten sich ausdr\xFCcklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.<br>
    </p><br> 
    Website Impressum von <a href="https://www.impressum-generator.de">impressum-generator.de</a>
     </div>
`;

  // src/app.js
  var router = new Router();
  router.registerRoute("/pm-energy-calc/", { template, callback: init, callbackParam: [router] });
  router.registerRoute("/pm-energy-calc/imprint", { template: template2, callback: null, callbackParam: [] });
  router.loadContent(window.location.pathname);
})();

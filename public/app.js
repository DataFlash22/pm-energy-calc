(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // src/router.mjs
  var Router = class {
    constructor() {
      __publicField(this, "routes", /* @__PURE__ */ new Map());
      __publicField(this, "containerElement", document.getElementById("container-content"));
      this.routes.set(404, { template: "<h2>404 - not found</h2>", callback: null, callbackParam: [] });
      for (const element of document.getElementsByClassName("menu-link")) {
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
        newElement.innerHTML = obj.template.trim();
        this.containerElement.replaceChildren(...newElement.content.childNodes);
        if (typeof obj.callback === "function")
          obj.callback(...obj.callbackParam);
      }
    }
    changeRoute(path) {
      window.history.pushState({ path }, "", path);
      this.loadContent(path);
    }
  };

  // src/home.mjs
  function init(router2) {
    document.getElementById("to-home").addEventListener("click", (e) => {
      router2.changeRoute("/home");
    });
  }
  var template = `
    <div class="home">
    <h2>Willkommen, Spieler!</h2>
    <div style="text-align: center;">
    <p>
        Default
    </p>
    <button id="to-home" class="menu-link" link="/home">Das ist ein Button</button>
    </div>
    </div>
`;

  // src/app.js
  var router = new Router();
  router.registerRoute("/", { template, callback: init, callbackParam: [router] });
  router.loadContent(window.location.pathname);
})();

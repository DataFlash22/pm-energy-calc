import {Router} from "./router.mjs"
import * as home from "./home.mjs"
import * as imprint from "./imprint.mjs"
import "normalize.css"
import "./app.css"

const router = new Router();

// router.registerRoute("/", {template: "home.html", callback: home.init, callbackParam: [router]});
// router.registerRoute("/imprint", {template: "impressum.html", callback: null, callbackParam: []});

router.registerRoute("/pm-energy-calc/", {template: home.template, callback: home.init, callbackParam: [router]});
router.registerRoute("/pm-energy-calc/imprint", {template: imprint.template, callback: null, callbackParam: []});

// take current pathname
router.loadContent(window.location.pathname);

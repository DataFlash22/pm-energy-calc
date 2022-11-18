import {Router} from "./router.mjs"
import * as home from "./home.mjs"
import "normalize.css"
import "./app.css"

const router = new Router();

router.registerRoute("/", {template: "home.html", callback: home.init, callbackParam: [router]});
router.registerRoute("/imprint", {template: "impressum.html", callback: null, callbackParam: []});

// take current pathname
router.loadContent(window.location.pathname);

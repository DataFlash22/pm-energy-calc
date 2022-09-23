import {Router} from "./router.mjs"
import * as home from "./home.mjs"
import "normalize.css"
import "./app.css"

const router = new Router();

router.registerRoute("/", {template: home.template, callback: home.init, callbackParam: [router]});

// take current pathname
router.loadContent(window.location.pathname);

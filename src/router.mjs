export class Router {

    routes = new Map();
    containerElement = document.getElementById("container-content");
    
    constructor() {

        // define default 404 route
        this.routes.set(404, {template: "<h2>404 - not found</h2>", callback: null, callbackParam: []});

        // for every menu-link in menu, add EventListener for Click and change Route
        for(const element of document.getElementsByClassName("menu-link")){
            element.addEventListener("click", (e) => {
                e.preventDefault();
                this.changeRoute(e.target.getAttribute("link"));
            });
        };

        // on popstate event
        window.onpopstate = () => this.loadContent(window.location.pathname);
    }

    // register new route
    registerRoute(path, obj){

       // set route to routes
        this.routes.set(path, obj);
    }

    // function to load content in dom module
    loadContent(path){

        // take obj from route
        const obj = this.routes.get(path) ?? this.routes.get(404);

        // create new element template
        const newElement = document.createElement("template");

        // if obj is an object and the template key is presented
        if(typeof obj === "object" && "template" in obj){

            // set template in HTML of newElement
            newElement.innerHTML = obj.template.trim();

            // set childrens of newElement in container element
            this.containerElement.replaceChildren(...newElement.content.childNodes);

            // if route has a callback function, run it
            if(typeof obj.callback === "function") obj.callback(...obj.callbackParam);
        }

        /* 
        * Can be activated again if a menu exists
        */
       
        // show selected in menu
        /* const menuElementList = document.getElementsByClassName("menu-link");
        const menuElementSelected = document.querySelectorAll(`[link="${path}"]`);

        // remove selected class from all menu-links
        for(const element of menuElementList){
            element.classList.remove("selected");
        }
    
        // add selected class only for wanted element
        for(const element of menuElementSelected){
            element.classList.add("selected");
        } */
    }

    // change route if menu-link was clicked or popstate event was triggered
    changeRoute(path){

        // set new history entry
        window.history.pushState({path: path}, '', path);

        // load content for path
        this.loadContent(path);
    }
}

var data = {

};

export function init(router){

    document.getElementById("to-lobby").addEventListener("click", (e) => {

        // change route
        router.changeRoute("/lobby");
    });

    document.getElementById("calculate").addEventListener("click", (e) => {
        calculate();
    });
}

export const template = `
<div class="home">
    <h2 class="text-center">Willkommen auf ERB!</h2>
    <hr>

    <div class="container mb-3">
        <div class="border border-dark rounded-2" style="height: 300px;"></div>
        </div>
    
    <button id="to-home" class="btn btn-primary">Das ist ein Button</button>
    <button id="calculate" class="btn btn-danger">Berechnen</button>
    <p id="calc-result"></p>
    </div>
`;


function calculate(){

    // 1. get input
    // 2. calculate
    // 3. set output
}

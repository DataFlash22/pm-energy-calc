export function init(router){

    document.getElementById("to-home").addEventListener("click", (e) => {

        // change route
        router.changeRoute("/");
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
    </div>
`;

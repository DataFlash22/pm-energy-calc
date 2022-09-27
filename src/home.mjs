export function init(router){

    document.getElementById("to-home").addEventListener("click", (e) => {

        // change route
        router.changeRoute("/home");
    });
}

export const template = `
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
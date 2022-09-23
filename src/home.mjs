export function init(router){

    document.getElementById("to-lobby").addEventListener("click", (e) => {

        // change route
        router.changeRoute("/lobby");
    });
}

export const template = `
    <div class="home">
    <h2>Willkommen, Spieler!</h2>
    <div style="text-align: center;">
    <p>
        Hier hast du die Möglichkeit, gegen andere Spieler das Spiel <b>Vier gewinnt</b> zu spielen. Klicke auf den Button und du gelangst zur Lobby, um Spieler zu finden, mit denen du zusammen spielen kannst.
    </p>
    <button id="to-lobby" class="menu-link" link="/lobby">Zur Lobby</button>
    </div>
    </div>
`;
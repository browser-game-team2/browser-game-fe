import { pageCreation,changeBoxContent2 } from "./pageCreation.js";
import { ComposeArmy, Player, GameBoard } from "./playersCompose.js";

const facebookAuthentication = document.getElementById("fb__logo");
const googleAuthentication = document.getElementById("google__logo");
const authentication = document.getElementById("authentication");

(function init() {
    const confirmButton = document.getElementById("confirm__button");
    const startGame = document.querySelector(".start-game__btn");
    // request for choose test
    fetch("https://browsergameteam2.herokuapp.com/choose/", {
    method: 'GET', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
        'Cookie': getCookie('sessionid')
    },
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
        
        pageCreation(data.planets, data.prices, data["F"]);
        
        // compose the army of human an cpu players
        const humanArmy = new ComposeArmy("Human", data.prices, data.budget);
        const cpuArmy = new ComposeArmy("CPU", data.prices, data.budget, data["F"]);

        // call create method for the human and Cpu
        const humanCreation = humanArmy.create();
        const cpuCreation = cpuArmy.create();
        // instance the gameBoard object 
        const game = new GameBoard();
        /*push inside the gameBoard attacker and defender the Player object with this property:
                this.type = type;
                this.username = username;
                this.army = {};   empty object
                this.planet = planet;
        */
        const humanPlayer = game.attacker = (new Player("Human", data.username, document.getElementById("input__planet__name").value));
        const CpuPlayer = game.defender = (new Player("virtual", "Computer1", "Venus"));

        startGame.addEventListener("click", function() {
            // after pressing start, push inside the army object the human create and cpu create func to generate the army selected
            humanPlayer.army = humanCreation;
            console.log(humanPlayer);
            CpuPlayer.army = cpuCreation;
            // pass the strategy selected inside humanPlayer
            humanPlayer.army["F"] = parseInt(document.querySelector(".select-strategy__selector").value);
            // press play game to play and making the api call passing the token
            game.playGame(data.token)
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
    confirmButton.addEventListener("click", changeBoxContent2);
})();

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}










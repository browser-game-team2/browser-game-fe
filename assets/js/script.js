const facebookAuthentication = document.getElementById("fb__logo");
const googleAuthentication = document.getElementById("google__logo");
const authentication = document.getElementById("authentication");
const inputs = document.getElementById("inputs");
const confirmButton = document.getElementById("confirm__button");
const createArmy = document.getElementById("create__army");
const userName = document.getElementById("username");
const planetName = document.getElementById("planet__name");
const resources = document.getElementById("resources");
const startGame = document.querySelector(".start-game__btn");


const playButton = document.querySelector(".play__btn");



class Unities {
    constructor (army, cost) {
        this.army = army;
        this.cost = cost;
    }
}

class ComposeArmy {
    constructor(type) {
        this.type = type;
        this.army = [];
    }
    create() {
        let gold = 30;
        const event = this;
        const armySelection = {
            "SpaceShip": 1,
            "spaceCruiser": 2,
            "spaceDestroyer": 5,
        }
        if(this.type === "Human") {
            document.querySelectorAll(".army-type").forEach(e => e.addEventListener("click", function() {
                const armyCost = armySelection[this.innerText];
                if(event.army.length < 10 && gold > armyCost) {
                    event.army.push(new Unities(this.innerText, armyCost));
                    gold -= armyCost;
                    resources.innerHTML = "You Have " + gold + " Gold to craft your army";
                } else {
                    return resources.innerHTML = "You can't spend more than " + 30 + "gold to craft your army"
                }
            }));  
            return event.army;
        } else {
            while(gold > 0 && event.army.length < 10) {
                const army = Object.keys(armySelection);
                //take a random type of army and find the cost in armyCost;
                const randomArmy = army[Math.floor(Math.random() * army.length)];
                const armyCost = armySelection[randomArmy];

                if(gold >= armyCost) {
                    event.army.push(new Unities(randomArmy, armyCost));
                    gold -= armyCost;
                    
                } else {
                    // if the armyCost is bigger than goldCpu then call the function again to generate another random army
                    return create();
                }
            }
            return event.army;
        }
         
    }
}

class Player {
    constructor(type, name, email, planet) {
        this.type = type;
        this.name = name;
        this.email = email;
        this.planet = planet;
        this.playerArmy = [];
    }
}

class GameBoard {
    constructor() {
        this.players = [];
    }
    createGame() {
        console.log(this.players);
    } 
}

const humanArmy = new ComposeArmy("Human");
const cpuArmy = new ComposeArmy("CPU");
cpuArmy.create()
humanArmy.create();
const game = new GameBoard();

(function init() {
    confirmButton.addEventListener("click", changeBoxContent2);
    playButton.addEventListener("click", playGame);
})();



const data = 
    {
        "attacker": {
            "uid": "108403865994034697381",
            "username":"human player 1",
             "army":{
                "S":2,
                "C":1,
                "D":0,
                "F":1
             },
             "planet":"Venus"
          }

      }

function playGame() {
    fetch("https://browsergameteam2.herokuapp.com/battle/", {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data1 => {
    console.log('Success:', data1);
    displayBattleReport(data1);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
    
    
}


//display nickname and planet name choosen by user and the quantity of gold to craft the army
function changeBoxContent2(){
    inputs.style.display = "none";
    createArmy.style.display = "flex";
    planetName.innerHTML = "Planet name:" + " " + document.getElementById("input__planet__name").value;
    game.players.push(new Player("Human", document.getElementById("input__username").value, "test@gmail.com", document.getElementById("input__planet__name").value));
    game.players.push(new Player("CPU", "Computer1", "", "Venus"));
   
}

startGame.addEventListener("click", function() {
    game.players[0].playerArmy.push(humanArmy.create());
    game.players[1].playerArmy.push(cpuArmy.create())
    game.createGame();
});



//display battle report 

function displayBattleReport(data1){
    document.getElementById("box").innerHTML = " ";
    var result = document.createElement("div");
    result.className = "battle__result";
    document.getElementById("box").appendChild(result);
    //a function to check if the player is the winner or the loser of the battle
    function checkScore(data1) {
        if (data1.winner = "true"){
        result.innerHTML = "Congratulations" + "<br>" + "You Win!";
    } else (result.innerHtml = "You Lose!");
    }
    checkScore(data1);
    //create a new element to display the report of the battle
    var battleReport = document.createElement("div");
    battleReport.className = "battle__report";
    result.appendChild(battleReport);
    battleReport.innerHTML = "Unities left after the battle:" + "<br>" + "<br>" + "C =" + " " + data1.army.C + "<br>" + "<br>" +  "S =" + " " + data1.army.S + "<br>" + "<br>" + " " +  "D =" + " " + data1.army.D;
}
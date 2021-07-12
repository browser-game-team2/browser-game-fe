const facebookAuthentication = document.getElementById("fb__logo");
const googleAuthentication = document.getElementById("google__logo");
const authentication = document.getElementById("authentication");
const inputs = document.getElementById("inputs");
const inputPlanet = document.querySelector(".input__field");
const confirmButton = document.getElementById("confirm__button");
const createArmy = document.getElementById("create__army");
const userName = document.getElementById("username");
const planetName = document.getElementById("planet__name");
const resources = document.getElementById("resources");
const startGame = document.querySelector(".start-game__btn");
const armyChoice = document.querySelector(".army");

const playButton = document.querySelector(".play__btn");


(function init() {
    // request for choose test
    fetch("https://browsergameteam2.herokuapp.com/choosetemp/", {
    method: 'GET', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    //function to create all the planet selection
        for(const planet of data.planets) {
            createPlanet(planet);
        }
    //function to create all the army and the cost before starting the game 
        for(const [army,values] of Object.entries(data.prices)) {
            createArmySelection(army, values);
        }
        // compose the army of human an cpu players
        const humanArmy = new ComposeArmy("Human");
        const cpuArmy = new ComposeArmy("CPU");

        // call create method passing the budget and the army with the price object
        cpuArmy.create(data.budget, data.prices)
        humanArmy.create(data.budget, data.prices);
        // instance the gameBoard object 
        const game = new GameBoard();
        /*push inside the players array (property of gameBoard) the player created, Human or CPU with the property:
                this.type = type;
                this.name = name;
                this.id = id;
                this.planet = planet;
                this.playerArmy = [];  empty array
        */
        game.players.push(new Player("Human", "", "test@gmail.com", document.getElementById("input__planet__name").value));
        game.players.push(new Player("CPU", "Computer1", "", "Venus"));

        startGame.addEventListener("click", function() {
            // inside the playerArmy array (now inside the players array that is inside GameBoard) push the army created
            game.players[0].playerArmy.push(humanArmy.create());
            game.players[1].playerArmy.push(cpuArmy.create())
            game.createGame();
        });
    })
    .catch((error) => {
    console.error('Error:', error);
    });
    
    confirmButton.addEventListener("click", changeBoxContent2);
    playButton.addEventListener("click", playGame);
})();


function createPlanet(planet) {
    const optionPlanet = document.createElement("option");
    optionPlanet.className = "planet";
    optionPlanet.value = planet;
    optionPlanet.innerText = planet;
    inputPlanet.appendChild(optionPlanet);
}

function createArmySelection(army, values) {
    const chooseArmy = document.createElement("div");
    chooseArmy.className = "army__unities";
    const armyType = document.createElement("div");
    armyType.className = "army-type";
    armyType.setAttribute("id", army);
    if(army === "S") {
        armyType.innerText = "SpaceShip";
    } else if(army === "C") {
        armyType.innerText = "SpaceCruiser";
    } else {
        armyType.innerText = "SpaceDestroyer";
    }
    const armyCost = document.createElement("div");
    armyCost.className = "army-cost";
    armyCost.innerText = values;
    armyChoice.appendChild(chooseArmy);
    chooseArmy.appendChild(armyType);
    chooseArmy.appendChild(armyCost);
    
}


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
    create(budget, armySelection) {
        //the initial budget i'll use for the error message
        const initial = budget;
        const event = this;
        //if the type of the army is "Human"
        if(this.type === "Human") {
            // select all the army-type (spaceCruiser, Destroyer ...)
            document.querySelectorAll(".army-type").forEach(e => e.addEventListener("click", function() {
                //find the cost of them with the armySelection object using the id {S:5 ecc}
                const armyCost = armySelection[this.getAttribute("id")];
                // if there are less than 10 army and the budget is more than the army cost
                if(event.army.length < 10 && budget > armyCost) {
                    // push the UNITIES with name and cost inside the army array used inside composeArmy
                    event.army.push(new Unities(this.innerText, armyCost));
                    budget -= armyCost;
                    resources.innerHTML = "You Have " + budget + " Gold to craft your army";
                } else {
                    return resources.innerHTML = "You can't spend more than " + initial + "gold to craft your army"
                }
            }));  
            return event.army;
            // if the type is CPU than continue to add unities until the budget is zero and the army length is 10
        } else {
            while(budget > 0 && event.army.length < 10) {
                const army = Object.keys(armySelection);

                //take a random type of army and find the cost in armyCost;
                const randomArmy = army[Math.floor(Math.random() * army.length)];

                const armyCost = armySelection[randomArmy];

                if(budget >= armyCost) {
                    event.army.push(new Unities(randomArmy, armyCost));
                    budget -= armyCost;
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
    constructor(type, name, id, planet) {
        this.type = type;
        this.name = name;
        this.id = id;
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
}





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
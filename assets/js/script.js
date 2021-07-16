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
const strategySelector = document.querySelector(".select-strategy__selector");
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
    
        pageCreation(data.planets, data.prices, data["F"]);
        
        // compose the army of human an cpu players
        const humanArmy = new ComposeArmy("Human", data.prices, data.budget,  );
        const cpuArmy = new ComposeArmy("CPU", data.prices, data.budget, data["F"]);

        // call create method passing the budget and the army with the price object
        const humanCreation = humanArmy.create();
        const cpuCreation = cpuArmy.create();
        // instance the gameBoard object 
        const game = new GameBoard();
        /*push inside the players array (property of gameBoard) the player created, Human or CPU with the property:
                this.type = type;
                this.name = name;
                this.id = id;
                this.planet = planet;
                this.playerArmy = [];  empty array
        */
        const humanPlayer = game.attacker = (new Player("Human", data.username, document.getElementById("input__planet__name").value));
        const CpuPlayer = game.defender = (new Player("virtual", "Computer1", "Venus"));

        startGame.addEventListener("click", function() {
            // inside the playerArmy array (now inside the players array that is inside GameBoard) push the army created
            humanPlayer.army = humanCreation;
            CpuPlayer.army = cpuCreation;
            humanPlayer.army["F"] = parseInt(document.querySelector(".select-strategy__selector").value);
            game.playGame(data.token)
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
    confirmButton.addEventListener("click", changeBoxContent2);
})();

function pageCreation(planetSelection, armySelection, strategySelection) {
    //function to create all the planet selection
    for(const planet of planetSelection) {
        createPlanet(planet);
    }
    //function to create all the army and the cost before starting the game 
    for(const [army,values] of Object.entries(armySelection)) {
        createArmySelection(army, values);
    }
    //function to create the strategy selection
    for(const strategy of strategySelection) {
        createStrategySelection(strategy);
    }
}

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
    const plusArmy = document.createElement("span");
    const decrementArmy = document.createElement("span");
    plusArmy.className = "army__operator spaceship__increment";
    plusArmy.innerText = "+";
    decrementArmy.className = "army__operator spaceship__decrement";
    decrementArmy.innerText = "-";
    plusArmy.setAttribute("id", army);
    decrementArmy.setAttribute("id", army);
    chooseArmy.appendChild(plusArmy);
    chooseArmy.appendChild(decrementArmy);
    armyChoice.appendChild(chooseArmy);
    chooseArmy.appendChild(armyType);
    chooseArmy.appendChild(armyCost);
}

function createStrategySelection(strategy) {
    const optionStrategy = document.createElement("option");
    optionStrategy.className = "strategy";
    optionStrategy.value = strategy;
    optionStrategy.innerText = strategy;
    strategySelector.appendChild(optionStrategy);
}


   
  




class ComposeArmy {
    constructor(type, armySelection, budget, strategy) {
        this.type = type;
        this.armySelection = armySelection;
        this.budget = budget;
        this.strategy = strategy;
        this.army = {};
    }     

    create() {
        //the initial budget i'll use for the error message
        const initial = this.budget;
        const event = this;

        for(const armies of Object.keys(this.armySelection)) {
            this.army[armies];
            this.army[armies] = 0;
        }
        //if the type of the army is "Human"
        if(event.type === "Human") {
            // select all the army-type (spaceCruiser, Destroyer ...)
            document.querySelectorAll(".army__operator").forEach(e => e.addEventListener("click", function() {
                //find the cost of them with the armySelection object using the id {S:5 ecc}
                const armyCost = event.armySelection[this.getAttribute("id")];
                event.budget = event.budgetCalc(event.budget, this.innerText, armyCost, initial)
                event.army[this.getAttribute("id")] = event.countArmy(event.budget, this.innerText, armyCost, initial, event, this.getAttribute("id"));
                resources.innerHTML = event.budgetMessage(event.budget, initial);
            }));  
            // if the type is CPU than continue to add unities until the budget is zero and the army length is 10
        } else {
            const randomStrategy = event.strategy[Math.floor(Math.random() * event.strategy.length)];
            while(event.budget > 0) {
                const army = Object.keys(event.armySelection);
                //take a random type of army and find the cost in armyCost;
                const randomArmy = army[Math.floor(Math.random() * army.length)];
                const armyCost = event.armySelection[randomArmy];
                
                if(event.budget >= armyCost) {
                    event.army[randomArmy] = (event.army[randomArmy] || 0) + 1;
                    event.budget -= armyCost;
                } else {
                    
                    // if the armyCost is bigger than goldCpu then call the function again to generate another random army
                    return event.create();
                }
                
            }
            event.army["F"] = randomStrategy;
        }
        return event.army;
    }

    budgetCalc(budget, operation, armyCost, initial) {
        if(operation === "+") {
            return budget >= armyCost ? budget -= armyCost : budget;
        } else {
          return budget < initial ? budget += armyCost : budget;
        }
      
      }  

    countArmy(budget, operation, armyCost, initial, event, singleArmy) {
        if(operation === "+") {
           return budget >= armyCost ? (event.army[singleArmy]|| 0) + 1 : event.army[singleArmy];
        } else {
            return budget <= initial && event.army[singleArmy] >= 0 ? (event.army[singleArmy] || 0) - 1 : event.army[singleArmy];
          }
    }

    budgetMessage(budget, initial) {
        if(budget <= 0) {
            return "You can't spend more than " + initial + "gold to craft your army"
        } else {
            return "You Have " +  budget + " Gold to craft your army"
        }
    }
}


class Player {
    constructor(type, username, planet) {
        this.type = type;
        this.username = username;
        this.army = {};
        this.planet = planet;
    }
}

class GameBoard {
    constructor() {
        this.attacker = {};
        this.defender = {};
    }

    playGame(token) {
        const data = {
                "attacker": this.attacker,
                "defender": this.defender,
                "token": token
        }
        console.log(data);
        console.log(JSON.stringify(data));
        fetch("https://browsergameteam2.herokuapp.com/battletemp/", {
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
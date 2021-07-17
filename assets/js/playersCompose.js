import {displayBattleReport} from "./battleReport.js"

class ComposeArmy {
    constructor(type, armySelection, budget, strategy) {
        this.type = type;
        this.armySelection = armySelection;
        this.budget = budget;
        this.strategy = strategy;
        this.army = {};
    }     

    create() {
        const resources = document.getElementById("resources");
         //the initial budget i'll use for the error message
        const initial = this.budget;

        const event = this;

        //generating the object army I need to count how many armies I selected
        for(const armies of Object.keys(this.armySelection)) {
            this.army[armies];
            this.army[armies] = 0;
        }

        //if the type of the army is "Human"
        if(event.type === "Human") {
            // select + or - to increment or decrement the number of army
            document.querySelectorAll(".army__operator").forEach(e => e.addEventListener("click", function() {
                //find the cost of them with the armySelection object using the id {S:5 ecc}
                const armyCost = event.armySelection[this.getAttribute("id")];
                // calculating the budget after a selection
                event.budget = event.budgetCalc(event.budget, this.innerText, armyCost, initial)
                // calculating the army count after a selection
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

//player Object I need for the JSON 
class Player {
    constructor(type, username, planet) {
        this.type = type;
        this.username = username;
        this.army = {};
        this.planet = planet;
    }
}

//GAME BOARD is the OBJECT where the players with type, username, army and planet'll be put in
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
}

export {ComposeArmy, Player, GameBoard}

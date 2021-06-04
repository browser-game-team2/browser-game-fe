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


facebookAuthentication.addEventListener("click", changeBoxContent);
googleAuthentication.addEventListener("click", changeBoxContent);
confirmButton.addEventListener("click", changeBoxContent2);

let cpuArmy = [];
let humanArmy = [];

const armySelection = {
    "SpaceShip": 1,
    "spaceCruiser": 2,
    "spaceDestroyer": 5,
}

//after the ouath, display inputs to choose nickname and planet name

function changeBoxContent() {
    authentication.style.display = "none";
    inputs.style.display = "flex";
}
//display nickname and planet name choosen by user and the quantity of gold to craft the army


function changeBoxContent2(){
    inputs.style.display = "none";
    createArmy.style.display = "flex";
    userName.innerHTML = "Username:" + " " + document.getElementById("input__username").value;
    planetName.innerHTML = "Planet name:" + " " + document.getElementById("input__planet__name").value;
}

//each unity has a cost to subtract from the total of gold
class Unities {
    constructor (type, name, power, cost, gold) {
        this.type = type;
        this.name = name;
        this.power = power;
        this.cost = cost;
        this.gold = gold
    }
    buyShip() {
        // if the user is human add the army into human army
        if(this.type === "Human") {
            humanArmy.push(this.name);
        } else {
            cpuArmy.push(this.name);
        }
    }
}




(function humanUser() {
    document.querySelectorAll(".army-type").forEach(e => e.removeEventListener("click", buyArmy));
    document.querySelectorAll(".army-type").forEach(e => e.addEventListener("click", buyArmy));

    let gold = 10;

    
    function buyArmy() {
        // the cost of the selected army taken from armySelection
        const armyCost = armySelection[this.innerText];

        if(gold >= armyCost) {
            const spaceShip = new Unities ("Human", this.innerText, "??", armyCost, gold);
            gold -= armyCost;
            resources.innerHTML = "You Have " + gold + " Gold to craft your army";
            spaceShip.buyShip();
        } else {
            return resources.innerHTML = "You can't spend more than 10 gold to craft your army"
        }
    }
})();


(function cpuUser() {

    let goldCpu = 10;
    startGame.removeEventListener("click", cpuGenerator);
    startGame.addEventListener("click", cpuGenerator);
    function cpuGenerator() {
        
        while(goldCpu > 0) {
            // take all the keys from armySelection
            const army = Object.keys(armySelection);
            //take a random type of army and find the cost in armyCost;
            const randomArmy = army[Math.floor(Math.random() * army.length)];
            const armyCost = armySelection[randomArmy];

            if(goldCpu >= armyCost) {
                const spaceShip = new Unities ("CPU",randomArmy, "??", armyCost, goldCpu);
                spaceShip.buyShip();
                goldCpu -= armyCost;
            } else {
                // if the armyCost is bigger than goldCpu then call the function again to generate another random army
                return cpuGenerator();
            }
        }
    }
})();



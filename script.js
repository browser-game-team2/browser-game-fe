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
startGame.addEventListener("click", boardGenerator);


const armySelection = {
    "SpaceShip": 1,
    "spaceCruiser": 2,
    "spaceDestroyer": 5,
}

let gold = 10;
let goldCpu = 10;
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
    constructor (name, power, cost) {
        this.name = name;
        this.power = power;
        this.cost = cost;
    }
    buyShip() {
        if (gold >= this.cost) {
            gold = gold - this.cost;
            resources.innerHTML = "You Have " + gold + " Gold to craft your army";
            army.push(this.name);
            } else (resources.innerHTML = "You can't spend more than 10 gold to craft your army")
        }
    }

let army = [];

document.querySelectorAll(".army__unities").forEach(e => e.addEventListener("click", buyArmy));

function buyArmy() {
    // I generate the object taking the first letter with slice and the number (the cost)
    console.log(parseInt(this.innerText.match(/\d+/)[0]));
    const spaceShip = new Unities (this.innerText.slice(0,1), "??", parseInt(this.innerText.match(/\d+/)[0]));
    spaceShip.buyShip();
}


function boardGenerator() {
    let cpuArmy = [];
    let goldCpu = 10;
    while(goldCpu > 0) {
        const army = Object.keys(armySelection);
        const randomArmy = army[Math.floor(Math.random() * army.length)];
        const armyCost = armySelection[randomArmy];
        const spaceShip = new Unities (randomArmy, "??", armyCost, goldCpu);
        spaceShip.buyShip();
        cpuArmy.push(randomArmy);
        goldCpu -= armyCost;
        console.log(goldCpu );
    }
    console.log(cpuArmy);
}


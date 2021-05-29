const facebookAuthentication = document.getElementById("fb__logo");
const googleAuthentication = document.getElementById("google__logo");
const authentication = document.getElementById("authentication");
const inputs = document.getElementById("inputs");
const confirmButton = document.getElementById("confirm__button");
const createArmy = document.getElementById("create__army");
const userName = document.getElementById("username");
const planetName = document.getElementById("planet__name");
const resources = document.getElementById("resources");

facebookAuthentication.addEventListener("click", changeBoxContent);
googleAuthentication.addEventListener("click", changeBoxContent);
confirmButton.addEventListener("click", changeBoxContent2);

//after the ouath, display inputs to choose nickname and planet name

function changeBoxContent() {
    authentication.style.display = "none";
    inputs.style.display = "flex";
}
//display nickname and planet name choosen by user and the quantity of gold to craft the army
let gold = 10;

function changeBoxContent2(){
    inputs.style.display = "none";
    createArmy.style.display = "flex";
    userName.innerHTML = "Username:" + " " + document.getElementById("input__username").value;
    planetName.innerHTML = "Planet name:" + " " + document.getElementById("input__planet__name").value;
    resources.innerHTML = "You Have " + gold + " Gold to craft your army";
}

//each unity has a cost to subtract from the total of gold

function Unities(name, power, cost) {
    this.name = name;
    this.power = power;
    this.cost = cost;
  }
const spaceShip = new Unities ("Space Ship", "??", "1");
const spaceCruiser = new Unities ("Space Cruiser", "??", "2");
const spaceDestroyer = new Unities ("Space Destroyer", "??", "5");
let army = [];

document.getElementById("space__ship").addEventListener("click", buySpaceShip);
document.getElementById("space__cruiser").addEventListener("click", buySpaceCruiser);
document.getElementById("space__destroyer").addEventListener("click", buySpaceDestroyer);

function buySpaceShip(){
    if (gold > 0) {
    gold = gold - spaceShip.cost;
    resources.innerHTML = "You Have " + gold + " Gold to craft your army";
    army.push("1S");
    console.log(army);
    } else (alert("You can't spend more than 10 gold to craft your army"))
}

function buySpaceCruiser(){
    if (gold > 0) {
    gold = gold - spaceCruiser.cost;
    resources.innerHTML = "You Have " + gold + " Gold to craft your army";
    army.push("1C");
    console.log(army);
    } else (alert("You can't spend more than 10 gold to craft your army"))
}
function buySpaceDestroyer(){
    if (gold > 0) {
    gold = gold - spaceDestroyer.cost;
    resources.innerHTML = "You Have " + gold + " Gold to craft your army";
    army.push("1D");
    console.log(army);
    } else (alert("You can't spend more than 10 gold to craft your army"))
}



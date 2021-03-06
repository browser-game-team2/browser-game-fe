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
    const inputPlanet = document.querySelector(".input__field");
    const optionPlanet = document.createElement("option");
    optionPlanet.className = "planet";
    optionPlanet.value = planet;
    optionPlanet.innerText = planet;
    inputPlanet.appendChild(optionPlanet);
}

function createArmySelection(army, values) {
    const armyChoice = document.querySelector(".army");
    const chooseArmy = document.createElement("div");
    const armyType = document.createElement("div");
    const armyCost = document.createElement("div");
    const counterArmy = document.createElement("span");
    counterArmy.className = `counter__army`;
    counterArmy.setAttribute("id", army);
    counterArmy.innerText = 0;
    chooseArmy.className = "army__unities";
    armyType.className = "army-type";
    armyType.setAttribute("id", army);
    if(army === "S") {
        armyType.innerText = "SpaceShip";
    } else if(army === "C") {
        armyType.innerText = "SpaceCruiser";
    } else {
        armyType.innerText = "SpaceDestroyer";
    }
    
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
    chooseArmy.appendChild(armyType);
    chooseArmy.appendChild(decrementArmy);
    chooseArmy.appendChild(counterArmy);
    armyChoice.appendChild(chooseArmy); 
    chooseArmy.appendChild(armyCost);
}

function createStrategySelection(strategy) {
    const strategySelector = document.querySelector(".select-strategy__selector");
    const optionStrategy = document.createElement("option");
    optionStrategy.className = "strategy";
    optionStrategy.value = strategy;

    if (optionStrategy.value === "1") {
        optionStrategy.innerText = strategy + " " + "-" + " " + "Frontal Assault";
    } else if (optionStrategy.value === "2") {
        optionStrategy.innerText = strategy + " " + "-" + " " + "Flanking";
    } else {optionStrategy.innerText = strategy + " " + "-" + " " + "Scattered Troups";}
    
    strategySelector.appendChild(optionStrategy);
}

//display nickname and planet name choosen by user and the quantity of gold to craft the army
function changeBoxContent2(){
    const inputs = document.getElementById("inputs");
    const createArmy = document.getElementById("create__army");
    const planetName = document.getElementById("planet__name");

    inputs.style.display = "none";
    createArmy.style.display = "flex";
    planetName.innerHTML = "Planet name:" + " " + document.getElementById("input__planet__name").value;
}

export {pageCreation, changeBoxContent2};
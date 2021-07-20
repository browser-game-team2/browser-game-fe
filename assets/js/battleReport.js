//display battle report 

function displayBattleReport(data1){
    var a = "Attacker"
    var s = {1:"Frontal Assault",
             2:"Flanking",
             3:"Scattered Troops"}   
    document.getElementById("box").innerHTML = " ";
    var result = document.createElement("div");
    result.className = "battle__result";
    document.getElementById("box").appendChild(result);
    //a function to check if the player is the winner or the loser of the battle
    function checkScore(data1) {
        if (data1.winner === true){
            result.innerHTML = data1.planets[1] + " Conquered!";}
        else {
            a = "Defender"
            result.innerHTML = "You Lost " + data1.planets[0] + "!";}
    }
    checkScore(data1);
    //create a new element to display the report of the battle
    var battleReport = document.createElement("div");
    battleReport.className = "battle__report";
    result.appendChild(battleReport);
    battleReport.innerHTML = "Army Attacker (you)" + "<br>" +
    "S = " + data1.init_a_army.S + 
    " C = " + data1.init_a_army.C + 
    " D = " + data1.init_a_army.D + "<br>" +
    "Strategy = " + s[data1.init_a_army.F] + "<br>" + "<br>" +
    "Army Defender (cpu)" + "<br>" +
    "S = " + data1.init_d_army.S + 
    " C = " + data1.init_d_army.C + 
    " D = " + data1.init_d_army.D + "<br>" + 
    "Strategy = " + s[data1.init_d_army.F] + "<br>" + "<br>" +
    "Winner = " + a + "<br>" + 
    "Unities left after the battle" + "<br>" + 
    "S = " + data1.army.S + 
    "  C = " + data1.army.C + 
    "  D = " + data1.army.D;
}

export {displayBattleReport}


//display battle report 

function displayBattleReport(data1){
    document.getElementById("box").innerHTML = " ";
    var result = document.createElement("div");
    result.className = "battle__result";
    document.getElementById("box").appendChild(result);
    //a function to check if the player is the winner or the loser of the battle
    function checkScore(data1) {
        if (data1.winner === true){
            result.innerHTML = "Congratulations" + "<br>" + "You Win!";}
        else {
            result.innerHTML = "You Lost!";}
    }
    checkScore(data1);
    //create a new element to display the report of the battle
    var battleReport = document.createElement("div");
    battleReport.className = "battle__report";
    result.appendChild(battleReport);
    battleReport.innerHTML = "[Winner] Unities left after the battle:" + "<br>" + "<br>" + "S =" + " " + data1.army.S + "<br>" + "<br>" +  "C =" + " " + data1.army.C + "<br>" + "<br>" + " " +  "D =" + " " + data1.army.D;
}

export {displayBattleReport}

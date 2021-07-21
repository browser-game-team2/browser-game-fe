//display battle report 

function displayBattleReport(data1){
    var a = "ATTACKER"
    var s = ["Frontal Assault", "Flanking", "Scattered Troops"]   
    document.getElementById("box").innerHTML = " ";
    var result = document.createElement("div");
    result.className = "battle__result";
    document.getElementById("box").appendChild(result);
    //a function to check if the player is the winner or the loser of the battle
    function checkScore(data1) {
        if (data1.winner === true){
            result.innerHTML = data1.planets[1] + " Conquered!";}
        else {
            a = "DEFENDER"
            result.innerHTML = "You Lost " + data1.planets[0] + "!";}
    }
    checkScore(data1);
    //create a new element to display the report of the battle
    var battleReport = document.createElement("div");
    battleReport.className = "battle__report";
    result.appendChild(battleReport);
    battleReport.innerHTML = "<b>" + "ARMY ATTACKER (you)" + "</b>" +
    "S : " + data1.init_a_army.S + "  ,  " + 
    "C : " + data1.init_a_army.C + "  ,  " +
    "D : " + data1.init_a_army.D + "<br>" +
    "<i>" + "Strategy: " + s[[data1.init_a_army.F]-1] + "</i>" + "<br>" +
    "<b>" + "ARMY DEFENDER (cpu)" + "</b>" +
    "S : " + data1.init_d_army.S + "  ,  " + 
    "C : " + data1.init_d_army.C + "  ,  " + 
    "D : " + data1.init_d_army.D + "<br>" + 
    "<i>" + "Strategy: " + s[[data1.init_d_army.F]-1] + "</i>" + "<br>" +
    "<b>" + "WINNER = " + a + "</b>" +  
    "Unities left after the battle:" + "<br>" + 
    "S : " + data1.army.S + "  ,  " + 
    "C : " + data1.army.C + "  ,  " + 
    "D : " + data1.army.D;
   
    displayDetailedBattleReport(data1, battleReport);

}

function displayDetailedBattleReport (data1, battleReport) {
    const detailedReportButton = document.createElement("button");
    battleReport.appendChild(detailedReportButton);
    detailedReportButton.className = "btn__modifier start-game__btn";
    detailedReportButton.innerHTML = "Open detailed report";

    detailedReportButton.addEventListener("click", function (){
        detailedReportButton.style.display = "none";
        const detailedReportContainer = document.createElement("div");
        detailedReportContainer.className = "detailed__report box";
        battleReport.appendChild(detailedReportContainer);
        const detailedReport = Object.entries(data1.report);
        const titleDetailedReport = document.createElement("div");
        [Fixed] layout of the battle detailed report
        titleDetailedReport.innerHTML = "UNITIES LOST" + "<br>" +
        "<i>" + "(during the battle)" + "</i>" + "<br>" + "<br>";
        for (let i = 0; i < detailedReport.length; i++){
            var r = "SPECIAL ROUND"
            if (i > 0) {
                r = "ROUND N." + i;}
        const displayDetailedReport = document.createElement("div");
        displayDetailedReport.innerHTML = r + "<br>" +
        "Attacker : " + data1.report[i]["a"] + "<br>" +
        "Defender : " + data1.report[i]["d"] + "<br>" + "<br>";
        detailedReportContainer.appendChild(displayDetailedReport);
        }
    });
}

export {displayBattleReport}

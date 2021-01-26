var dStation = 0;
teamSide = "red";
matchNumber = 1;
filteredJames = [];
teleAccuracyMaster = [];
teleAccuracyTotal = 0;
climbTypeMaster = [];

function pullMatchInput() {
    let ontoBlue = false;
    matchNumber = document.getElementById('matchNumPreview').value;
    kidnap("/event/2020scmb/matches");
    James.sort(sortById("match_number"));
    filteredJames = James.filter(filterSchedule);
    if (teamSide == "red") {
        matchNumber = filteredJames[matchNumber - 1].alliances.red.team_keys[dStation].slice(3);
    } else {
        matchNumber = filteredJames[matchNumber - 1].alliances.blue.team_keys[dStation].slice(3);
    }
    pullMatch(matchNumber);
}

function pullMatch(matchNumber) {
    pullPreviewData(matchNumber);
}

//gets the json from firebase of a certain robot
function pullPreviewData(robotNumber) {
    firebase.database().ref('/matchScouting/' + robotNumber).once("value", gotMatchData);
}

function gotMatchData(data) { //makes the data readable
    //Be sure to reset all master arrays and variables in between robots here
    teleAccuracyMaster = [];
    teleAccuracyTotal = 0;
    climbTypeMaster = [];
    //gets us some data from firebase
    var matchParsed = JSON.parse(JSON.stringify(data.val()));
    var matchNums = Object.keys(matchParsed);
    for (let i = 0; i < matchNums.length; i++) { //couple for loops to grab alllll the data for that robot
        //console.log(matchNums);
        var currMatch = matchNums[i];
        var matchNames = Object.keys(matchParsed[currMatch]);
        //console.log(matchNames);
        for (let i = 0; i < matchNames.length; i++) {
            currName = matchNames[i];
            //console.log("MatchData: " + currMatch + " " + currentName);
            //ALL DATA WE WANT GOES HERE
            teleAccuracyMaster.push(matchParsed[currMatch][currName]["teleAccuracy"]);
            climbTypeMaster.push(matchParsed[currMatch][currName]["climbType"]);
            /*
            //A:: DATA WE WANT GOES HERE
            for (l = 0; l < 500; l++) {
                console.log("Loading...");
            } //might not need this but its here because im scared it will break things again
            */ 
        }
    }
    for (t = 0; t < (teleAccuracyMaster.length); t++) { //to calculate averages or compline data, could be used for other things that just tele accuracy master
        teleAccuracyTotal += teleAccuracyMaster[t];
    }
    
    //this switch case pushes the data for each text box
    console.log("Running switch");
    var teamStation = dStation + teamSide.substring(0,1);
    switch (teamStation) {
        case "0r":
            document.getElementById("r1").innerHTML = filteredJames[matchNumber - 1].alliances.teamSide.team_keys[0].slice(3);
            document.getElementById("red1Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100) + climbTypeMaster;
            dStation = 1;
            pullMatch(document.getElementById("matchNumPreview").value);
        case "1r":
            document.getElementById("r2").innerHTML = filteredJames[matchNumber - 1].alliances.teamSide.team_keys[1].slice(3);
            document.getElementById("red2Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100) + climbTypeMaster;
            dStation = 2;
            pullMatch(document.getElementById("matchNumPreview").value);
        case "2r":
            document.getElementById("r3").innerHTML = filteredJames[matchNumber - 1].alliances.teamSide.team_keys[2].slice(3);
            document.getElementById("red3Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100) + climbTypeMaster;
            dStation = 0;
            switchColor = (filteredJames[matchNumber - 1].alliances.blue.team_keys[0].slice(3))
            teamSide = blue;
            pullMatch(document.getElementById("matchNumPreview").value);
        case "0b":
            document.getElementById("b1").innerHTML = filteredJames[matchNumber - 1].alliances.teamSide.team_keys[0].slice(3);
            document.getElementById("blue1Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100) + climbTypeMaster;
            dStation = 1;
            pullMatch(document.getElementById("matchNumPreview").value);
        case "1b":
            document.getElementById("b2").innerHTML = filteredJames[matchNumber - 1].alliances.teamSide.team_keys[1].slice(3);
            document.getElementById("blue2Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100) + climbTypeMaster;
            dStation = 2;
            pullMatch(document.getElementById("matchNumPreview").value);
        case "2b":
            document.getElementById("b3").innerHTML = filteredJames[matchNumber - 1].alliances.teamSide.team_keys[2].slice(3);
            document.getElementById("blue3data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100) + climbTypeMaster;
            pullMatch(document.getElementById("matchNumPreview").value);
    }
    //
    //THIS WILL ACTUALLY PUT THE DATA ON SCREEN, PUT ALL THE DATA ON THERE AT ONCE BY PUTTING IT 
    //ALL EQUAL TO THE INNERHTML OF THE DESIRED DRIVE STATION
    //
}

/*
function pullMatch(matchNumber) {
    
    var i = filteredJames.length;
    //createAlliance(matchNumber);
    var alliance = (filteredJames[matchNumber - 1].alliances);
    document.getElementById("r1").innerHTML = alliance.red.team_keys[0].slice(3);
    document.getElementById("r2").innerHTML = alliance.red.team_keys[1].slice(3);
    document.getElementById("r3").innerHTML = alliance.red.team_keys[2].slice(3);
    document.getElementById("b1").innerHTML = alliance.blue.team_keys[0].slice(3);
    document.getElementById("b2").innerHTML = alliance.blue.team_keys[1].slice(3);
    document.getElementById("b3").innerHTML = alliance.blue.team_keys[2].slice(3);
    pullPreviewData(alliance.blue.team_keys[dStation].slice(3), "b");
    pullPreviewData(alliance.red.team_keys[dStation].slice(3), "r");
}
*/
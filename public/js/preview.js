var dStation = 0;
var matchNumber = 1;
var teamSide = "red";
var robotNumber = 9999;

function pullMatchData() {
    kidnap("/event/2020scmb/matches");
    James.sort(sortById("match_number"));
    globalThis.filteredJames = James.filter(filterSchedule);
    console.log(filteredJames);
}

function pullMatchInput() {
    matchNumber = document.getElementById('matchNumPreview').value;
    dStation = 0;
    teamSide = "red";
    pullMatch(matchNumber);
}

function pullMatch(matchNumber) {
    if (teamSide == "red") {
        console.log("this is red");
        //console.log(filteredJames);
        robotNumber = filteredJames[matchNumber - 1].alliances.red.team_keys[dStation].slice(3);
    } else {
        console.log("this is blue");
        robotNumber = filteredJames[matchNumber - 1].alliances.blue.team_keys[dStation].slice(3);
    }
    pullPreviewData(robotNumber);
}

//gets the json from firebase of a certain robot
function pullPreviewData(robotNumber) {
    console.log(robotNumber);
    firebase.database().ref('/matchScouting/' + robotNumber).once("value", gotMatchData);
}

function gotMatchData(data) { //makes the data readable
    //Be sure to reset all master arrays and variables in between robots here
    var teleAccuracyMaster = [];
    var teleAccuracyTotal = 0;
    var climbTypeMaster = [];
    //gets us some data from firebase
    var matchParsed = JSON.parse(JSON.stringify(data.val()));
    var matchNums = Object.keys(matchParsed);
    for (i = 0; i < matchNums.length; i++) { //couple for loops to grab alllll the data for that robot
        //console.log(matchNums);
        var currMatch = matchNums[i];
        var matchNames = Object.keys(matchParsed[currMatch]);
        //console.log(matchNames);
        for (j = 0; j < matchNames.length; j++) {
            currName = matchNames[j];
            //console.log("MatchData: " + currMatch + " " + currentName);
            //ALL DATA WE WANT GOES HERE
            teleAccuracyMaster.push(matchParsed[currMatch][currName]["teleAccuracy"]);
            climbTypeMaster.push(matchParsed[currMatch][currName]["climbType"]);
        }
    }
    for (t = 0; t < (teleAccuracyMaster.length); t++) { //to calculate averages or combine data, could be used for other things that just tele accuracy master
        teleAccuracyTotal += teleAccuracyMaster[t];
    }

    //this switch case pushes the data for each text box
    console.log("Running switch");
    var teamStation = dStation + teamSide.substring(0, 1);
    switch (teamStation) {
        case "0r":
            document.getElementById("r1").innerHTML = robotNumber;
            document.getElementById("red1Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100);
            dStation = 1;
            pullMatch(document.getElementById("matchNumPreview").value);
            break;
        case "1r":
            document.getElementById("r2").innerHTML = robotNumber;
            document.getElementById("red2Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100);
            dStation = 2;
            pullMatch(document.getElementById("matchNumPreview").value);
            break;
        case "2r":
            document.getElementById("r3").innerHTML = robotNumber;
            document.getElementById("red3Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100);
            dStation = 0;
            switchColor = (filteredJames[matchNumber - 1].alliances.blue.team_keys[0].slice(3))
            teamSide = "blue";
            pullMatch(document.getElementById("matchNumPreview").value);
            break;
        case "0b":
            document.getElementById("b1").innerHTML = robotNumber;
            document.getElementById("blue1Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100);
            dStation = 1;
            pullMatch(document.getElementById("matchNumPreview").value);
            break;
        case "1b":
            document.getElementById("b2").innerHTML = robotNumber;
            document.getElementById("blue2Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100);
            dStation = 2;
            pullMatch(document.getElementById("matchNumPreview").value);
            break;
        case "2b":
            document.getElementById("b3").innerHTML = robotNumber;
            document.getElementById("blue3Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100);
            break;
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
var filteredJames = [];
matchNumber = 1;
dStation = 0;
teamSide = "red";
robotNumber = 9999;


function pullMatchData() {
    kidnap("/event/2020scmb/matches");
    James.sort(sortById("match_number"));
    filteredJames = James.filter(filterSchedule);
}

function pullMatchInput() {
    matchNumber = document.getElementById('matchNumPreview').value;
    console.log(matchNumber);
    dStation = 0;
    teamSide = "red";
    pullMatch();
}

function pullMatch() {
    if (teamSide == "red") {
        console.log("this is red");
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
            console.log("0r");
            document.getElementById("r1").innerHTML = robotNumber;
            document.getElementById("red1Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100);
            dStation = 1;
            pullMatch();
            break;
        case "1r":
            console.log("1r");
            document.getElementById("r2").innerHTML = robotNumber;
            document.getElementById("red2Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100);
            dStation = 2;
            pullMatch();
            break;
        case "2r":
            console.log("2r");
            document.getElementById("r3").innerHTML = robotNumber;
            document.getElementById("red3Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100);
            dStation = 0;
            teamSide = "blue";
            pullMatch();
            break;
        case "0b":
            console.log("0b");
            document.getElementById("b1").innerHTML = robotNumber;
            document.getElementById("blue1Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100);
            dStation = 1;
            pullMatch();
            break;
        case "1b":
            console.log("1b");
            document.getElementById("b2").innerHTML = robotNumber;
            document.getElementById("blue2Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100);
            dStation = 2;
            pullMatch();
            break;
        case "2b":
            console.log("2b");
            document.getElementById("b3").innerHTML = robotNumber;
            document.getElementById("blue3Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100);
            break;
    }
}

//=========================firebase login stuff===============================//
function checkUN() {
    var user = firebase.auth().currentUser;
    if (user == null) {
        location.replace('./index.html');
    }
}
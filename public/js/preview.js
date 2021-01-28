var dataObject = [];
matchNumber = 1;
dStation = 0;
teamSide = "red";
robotNumber = 9999;


function pullMatchData() {
    //var matchNumber = document.getElementById('matchNumPreview').value;
    //console.log(matchNumber)
    kidnap("/event/2020scmb/matches");
    console.log(James);
    James.sort(sortById("match_number"));
    console.log("line 12: ", James);
    dataObject = James.filter(filterSchedule);
    console.log("line 14", dataObject);
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
        robotNumber = dataObject[matchNumber - 1].alliances.red.team_keys[dStation].slice(3);
    } else {
        console.log("this is blue");
        robotNumber = dataObject[matchNumber - 1].alliances.blue.team_keys[dStation].slice(3);
    }
    pullPreviewData(robotNumber);
}

//gets the json from firebase of a certain robot
function pullPreviewData(robotNumber) {
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
    var teamStation = dStation + teamSide.substring(0, 1);
    switch (teamStation) {
        case "0r":
            console.log("0r");
            document.getElementById("r1").innerHTML = robotNumber;
            //document.getElementById("red1Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100) + climbTypeMaster;
            dStation = 1;
            pullMatch();
        case "1r":
            console.log("1r");
            document.getElementById("r2").innerHTML = robotNumber;
            //document.getElementById("red2Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100) + climbTypeMaster;
            dStation = 2;
            pullMatch();
        case "2r":
            console.log("2r");
            document.getElementById("r3").innerHTML = robotNumber;
            //document.getElementById("red3Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100) + climbTypeMaster;
            dStation = 0;
            teamSide = "blue";
            pullMatch();
        case "0b":
            console.log("0b");
            document.getElementById("b1").innerHTML = robotNumber;
            //document.getElementById("blue1Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100) + climbTypeMaster;
            dStation = 1;
            pullMatch();
        case "1b":
            console.log("1b");
            document.getElementById("b2").innerHTML = robotNumber;
            //document.getElementById("blue2Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100) + climbTypeMaster;
            dStation = 2;
            pullMatch();
        case "2b":
            console.log("2b");
            document.getElementById("b3").innerHTML = robotNumber;
            //document.getElementById("blue3data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100) + climbTypeMaster;
    }
}

// ====================== Supporting Functions ============================= //
/*
function loadSchedule() {
    James = JSON.parse(localStorage.getItem("blueAllianceData"));
    James.sort(sortById("match_number")); //* Sorts the output of the of kidnap by match number
    /*for (matchNumber = 1; matchNumber <= James.length; matchNumber++) { //* For loop for creating the schedule
        createAlliance(matchNumber); //* Runs createAlliance to print match participants on the button
        matchInfo = ("<button onclick =  'startMatchScouting(" + matchNumber + "," +
            JSON.stringify(James[matchNumber - 1].alliances) + ")'> Match " + matchNumber +
            ": <p style='color:red'>" + redAlliance + "</p> | vs | <p style='color:blue'>" + blueAlliance +
            "</p></button>"); //*Defines matchInfo as the text of a button
        btn = document.createElement("BUTTON"); //* creates a button
        btn.innerHTML = matchInfo; //* Writes the matchInfo onto the button
        document.body.appendChild(btn);
    };
}

function createAlliance(matchNumber) { //* This function creates each and concatenates each alliance number into a string
    var i = matchNumber - 1
    blueAlliance = filteredJames[i].alliances.blue.team_keys[0].slice(3) + " | " + filteredJames[i].alliances.blue.team_keys[1].slice(3) + " | " + filteredJames[i].alliances.blue.team_keys[2].slice(3);
    redAlliance = filteredJames[i].alliances.red.team_keys[0].slice(3) + " | " + filteredJames[i].alliances.red.team_keys[1].slice(3) + " | " + filteredJames[i].alliances.red.team_keys[2].slice(3);
}
*/
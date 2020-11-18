/*jshint sub:true*/
var ontoBlue = false;

function pullMatchInput() {
    ontoBlue = false;
    matchPreviewNum = document.getElementById("matchNumPreview").value;
    pullMatch(matchPreviewNum);
}

function pullMatch(matchNumber) { // pulls TBA api data and James's it, sets our alliance numbers to where they need to be
    preJames = kidnap("/event/2020scmb/matches");
    console.log(preJames);
    preJames.sort(sortById("match_number")); //* Sorts the output of the of kidnap by match number
    filteredJames = preJames.filter();
    var i = filteredJames.length;
    //document.body.innerHTML = "<input placeholder='Match Number' type='text' name='matchNumPreview' id='matchNumPreview' class='textBox'><button onclick=pullMatchInput() class='button1'> Preview Match </button> <br><form action='./index.html'>    <button type='submit' class='buttonBack'>Back</button></form>";
    createAlliance(matchNumber);
    //matchInfo = ("<button onclick =  'createMatchPreview(" + matchNumber + "," + JSON.stringify(filteredJames[matchNumber - 1].alliances) + ")'> Match " + matchNumber + ": <p style='color:#C1666B'>" + redAlliance + "</p> vs <p style='color:#4357AD'>" + blueAlliance + "</p></button>"); //*Defines matchInfo as the text of a button
    var alliance = (filteredJames[matchNumber - 1].alliances);
    document.getElementById("r1").innerHTML = alliance.red.team_keys[0].slice(3);
    document.getElementById("r2").innerHTML = alliance.red.team_keys[1].slice(3);
    document.getElementById("r3").innerHTML = alliance.red.team_keys[2].slice(3);
    document.getElementById("b1").innerHTML = alliance.blue.team_keys[0].slice(3);
    document.getElementById("b2").innerHTML = alliance.blue.team_keys[1].slice(3);
    document.getElementById("b3").innerHTML = alliance.blue.team_keys[2].slice(3);
    if (ontoBlue == true) {
        pullPreviewData(alliance.blue.team_keys[dStation].slice(3));
    } else {
        pullPreviewData(alliance.red.team_keys[dStation].slice(3));
    }
    //TODO pass in all the stuff above this into a function somehow so we dont have to pull from TBA for every robot
    //again this is not a high priority like maybe after smokey becasue it works 
}

/* from matchScouting.js & for matchPreview */
function pullPreviewData(robotNumber) {
    firebase.database().ref('/matchScouting/' + robotNumber).once("value", gotMatchData);
    //gets the json from firebase of a certain robot
}

function gotMatchData(data) { //makes the data readable
    //Be sure to reset all master arrays and variables in between robots here
    var teleAccuracyMaster = [];
    teleAccuracyTotal = 0;
    climbTypeMaster = [];
    matchData = data.val(); //gets us some data from firebase
    jsonMatchData = JSON.stringify(matchData);
    matchParsed = JSON.parse(jsonMatchData);
    matchNums = Object.keys(matchParsed);
    for (i = 0; i < matchNums.length; i++) { //couple for loops to grab alllll the data for that robot
        //console.log(matchNums);
        currMatch = matchNums[i];
        matchNames = Object.keys(matchParsed[currMatch]);
        //console.log(matchNames);
        for (j = 0; j < matchNames.length; j++) {
            currName = matchNames[j];
            //console.log("MatchData: " + currMatch + " " + currentName);
            //ALL DATA WE WANT GOES HERE
            teleAccuracyStr = "teleAccuracy";
            climbTypeStr = "climbType";
            teleAccuracyMaster.push(matchParsed.currMatch.currName.teleAccuracyStr);
            climbTypeMaster.push(matchParsed.currMatch.currName.climbTypeStr);

            //A:: DATA WE WANT GOES HERE
            for (l = 0; l < 500; l++) {
                console.log("Loading...");
            } //might not need this but its here because im scared it will break things again 
        }
    }
    for (t = 0; t < (teleAccuracyMaster.length); t++) { //to calculate averages or compline data, could be used for other things that just tele accuracy master
        teleAccuracyTotal += teleAccuracyMaster[t];
    }
    //TODO: switch case to determine which div to put the data in / just a more efficient way to to do all of this
    //works for now tho so we gooooood
    console.log("Running ifs");
    if (dStation == 0 && ontoBlue == false) {
        document.getElementById("red1Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100) + climbTypeMaster;
        dStation = 1;
        pullMatch(document.getElementById("matchNumPreview").value);
    } else if (dStation == 1 && ontoBlue == false) {
        document.getElementById("red2Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100) + climbTypeMaster;
        dStation = 2;
        pullMatch(document.getElementById("matchNumPreview").value);
    } else if (dStation == 2 && ontoBlue == false) {
        document.getElementById("red3Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100) + climbTypeMaster;
        dStation = 0;
        ontoBlue = true;
        pullMatch(document.getElementById("matchNumPreview").value);
    } else if (dStation == 0 && ontoBlue == true) {
        document.getElementById("blue1Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100) + climbTypeMaster;
        dStation = 1;
        ontoBlue = true;
        pullMatch(document.getElementById("matchNumPreview").value);
    } else if (dStation == 1 && ontoBlue == true) {
        document.getElementById("blue2Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100) + climbTypeMaster;
        dStation = 2;
        ontoBlue = true;
        pullMatch(document.getElementById("matchNumPreview").value);
    } else if (dStation == 2 && ontoBlue == true) {
        document.getElementById("blue3Data").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100) + climbTypeMaster;
    }
    //
    //THIS WILL ACTUALLY PUT THE DATA ON SCREEN, PUT ALL THE DATA ON THERE AT ONCE BY PUTTING IT 
    //ALL EQUAL TO THE INNERHTML OF THE DESIRED DRIVE STATION
    //
}

function createAlliance(matchNumber) { //* This function creates each and concatenates each alliance number into a string
    var i = matchNumber - 1;
    blueAlliance = filteredJames[i].alliances.blue.team_keys[0].slice(3) + " | " + filteredJames[i].alliances.blue.team_keys[1].slice(3) + " | " + filteredJames[i].alliances.blue.team_keys[2].slice(3);
    redAlliance = filteredJames[i].alliances.red.team_keys[0].slice(3) + " | " + filteredJames[i].alliances.red.team_keys[1].slice(3) + " | " + filteredJames[i].alliances.red.team_keys[2].slice(3);
}
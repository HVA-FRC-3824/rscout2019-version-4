

function pullMatchInput() {
    let ontoBlue = false;
    matchPreviewNum = document.getElementById('matchNumPreview').value;
    pullMatch(matchPreviewNum);
}

function pullMatch (matchNumber) {
    kidnap("/event/2020scmb/match/");
    James.sort(sortById("match_number"));
    let filteredJames = James.filter(filterSchedule); 
    let i = filteredJames.length;

    createAlliance(matchNumber);

    let alliances = (filteredJames[matchNumber - 1].alliances);
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
}

function pullPreviewData(robotNumber) {
    firebase.database().ref('/matchScouting/' + robotNumber).once("value", gotMatchData);
    //gets the json from firebase of a certain robot
}

function gotMatchData(data) { //makes the data readable
    //Be sure to reset all master arrays and variables in between robots here
    teleAccuracyMaster = [];
    teleAccuracyTotal = 0;
    climbTypeMaster = [];
    let matchData = data.val(); //gets us some data from firebase
    let jsonMatchData = JSON.stringify(matchData);
    let matchParsed = JSON.parse(jsonMatchData);
    let matchNums = Object.keys(matchParsed);
    for (i = 0; i < matchNums.length; i++) { //couple for loops to grab alllll the data for that robot
        //console.log(matchNums);
        currMatch = matchNums[i];
        matchNames = Object.keys(matchParsed[currMatch]);
        //console.log(matchNames);
        for (j = 0; j < matchNames.length; j++) {
            currName = matchNames[j];
            //console.log("MatchData: " + currMatch + " " + currentName);
            //ALL DATA WE WANT GOES HERE
            teleAccuracyMaster.push(matchParsed[currMatch][currName]["teleAccuracy"]);
            climbTypeMaster.push(matchParsed[currMatch][currName]["climbType"]);

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

// ===================== supporting functions ===================== //

function filterSchedule(qual) {
    return qual.comp_level == "qm";
}

function createAlliance(matchNumber) { //* This function creates each and concatenates each alliance number into a string
    let i = matchNumber - 1
    blueAlliance = filteredJames[i].alliances.blue.team_keys[0].slice(3) + " | " + filteredJames[i].alliances.blue.team_keys[1].slice(3) + " | " + filteredJames[i].alliances.blue.team_keys[2].slice(3);
    redAlliance = filteredJames[i].alliances.red.team_keys[0].slice(3) + " | " + filteredJames[i].alliances.red.team_keys[1].slice(3) + " | " + filteredJames[i].alliances.red.team_keys[2].slice(3);
}


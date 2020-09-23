var robotNum = "";
currentName = [];
namesArray = [];
currentMatch = 0;
matches = [];
matchValue = 0;
nameValue = 0;
masterXauto = [];
masterYauto = [];
masterXtele = [];
masterYtele = [];
xAutoArr = [];
yAutoArr = [];
xTeleArr = [];
yTeleArr = [];
heatData = {};
driveStationMaster = [];
startPositionMaster = [];
robotScoreMaster = [];
autoPickedUpFloorMaster = [];
autoPickedUpBayMaster = [];
teleopPickedUpFloorMaster = [];
teleopPickedUpBayMaster = [];
climbTypeMaster = [];
isLevelMaster = [];
notesMaster = [];
colorWheelMaster = [];
autoMissesMaster = [];
teleMissesMaster = [];
autoScoreMaster = [];
teleScoreMaster = [];
teleAccuracyMaster = [];
autoAccuracyMaster = [];
redCardMaster = [];
yellowCardMaster = [];
nameBlameMaster = [];
matchNumberMaster = [];
currDataTable = 0;
robotScoreTotal = 0;
autoAccuracyTotal = 0;
teleAccuracyTotal = 0;
autoLineMaster = [];
ballsDroppedAutoMaster = [];
ballsDroppedTeleMaster = [];
fellMaster = [];

function passwordCheck() {
    firebase.database().ref('/password/' + "2713").once("value", passCheck);
}

function passCheck(passcode) {
    password = prompt("Password?");
    if (passcode.val() == password) {
        alert("success!");
        robotNum = document.getElementById("robotNum").value;
        if (robotNum == "" || robotNum == null || robotNum == " ") {
            alert("put something in!");
        } else {
            pullData();
            pullMatchData();
        }

    } else {
        alert("Wrong password");
    }
}

function kidnap(newUrl) {
    //These variables store the data returned from the functions.
    var baseUrl = 'https://www.thebluealliance.com/api/v3'; //base TBA url
    //This ajax code requests data from The Blue Alliance
    $.ajax({
        url: baseUrl + newUrl, //This is the url we send to TBA which requests our data
        headers: {
            'X-TBA-Auth-Key': 'hhfIK2pSbl02wS0OQ2m593517wGnrSmjYdJ9C6jbMfKkvZtnoiB8qUWc0X0WwpC6' //This header contains Evan Boswell's Blue Alliance authentication key, this will need to be changed for years beyond 2019/2020
        },
        method: 'GET', //This defines the method we use to pull data from Blue Alliance, in this instance we are using GET
        dataType: 'json', //This defines what format the data that is pulled from Blue Alliance will be in, in this instance we are pulling Json files
        success: function(data) { //this function logs our data in the console if it is successfully pulled
            James = data;
            return James;
        },
    });
    $(document).ajaxError(function() { //this function alerts an error if the pulling the data is unsuccessful
        alert("An error occurred!");
    });
}

var sortById = function(prop) {
    return function(x, y) {
        return ((x[prop] === y[prop]) ? 0 : ((x[prop] > y[prop]) ? 1 : -1));
    };
};

function pullData() { //this function pulls the team number that the user entered
    robotNum = document.getElementById("robotNum").value; //sets the var robotNum equal to the robot number to be positive
    firebase.database().ref('/heatMap/' + robotNum).once("value", gotData); //acutally gets the data from firebase, then runs gotData()
    //console.log(robotNum);
}

function gotData(heatData) { //makes the data readable
    var robotData = heatData.val(); //takes the value of the data
    //console.log(robotData);
    heatData = JSON.stringify(robotData);
    heat = JSON.parse(heatData);
    matchArr = Object.keys(heat);
    for (i = 0; i < matchArr.length; i++) {
        currentMatch = matchArr[i];
        namesArr = Object.keys(heat[currentMatch]);

        for (j = 0; j < namesArr.length; j++) {
            currentName = namesArr[j];
            xAuto = "x auto";
            yAuto = "y auto";
            xTele = "x tele";
            yTele = "y tele";
            //console.log("here: " + currentMatch + " " + currentName);
            masterXauto.push(heat[currentMatch][currentName][xAuto]);
            masterYauto.push(heat[currentMatch][currentName][yAuto]);
            masterXtele.push(heat[currentMatch][currentName][xTele]);
            masterYtele.push(heat[currentMatch][currentName][yTele]);
        }

    }

    localStorage.setItem("xAutoStore", JSON.stringify(masterXauto));
    localStorage.setItem("yAutoStore", JSON.stringify(masterYauto));
    localStorage.setItem("xTeleStore", JSON.stringify(masterXtele));
    localStorage.setItem("yTeleStore", JSON.stringify(masterYtele));
    localStorage.setItem("robotHeatNum", robotNum);
    alert("Done!");
}

function clearLocalStorage() {
    localStorage.clear();
    alert("Done!");
}

function pullMatchData() { //this function pulls the team number that the user entered
    robotNum = document.getElementById("robotNum").value; //sets the var robotNum equal to the robot number to be positive
    firebase.database().ref('/matchScouting/' + robotNum).once("value", gotMatchData); //acutally gets the data from firebase, then runs gotData()
    console.log(robotNum);
}


function gotMatchData(data) { //makes the data readable
    var matchData = data.val(); //takes the value of the data
    jsonMatchData = JSON.stringify(matchData);
    matchParsed = JSON.parse(jsonMatchData);
    matchNums = Object.keys(matchParsed);
    for (i = 0; i < matchNums.length; i++) {
        console.log(matchNums);
        currMatch = matchNums[i];
        matchNames = Object.keys(matchParsed[currMatch]);
        console.log(matchNames);
        for (j = 0; j < matchNames.length; j++) {
            currName = matchNames[j];
            console.log("MatchData: " + currMatch + " " + currentName);
            nameBlameMaster.push(currName);
            matchNumberMaster.push(currMatch);
            driveStationMaster.push(matchParsed[currMatch][currName]["driveStation"]);
            startPositionMaster.push(matchParsed[currMatch][currName]["startPosition"]);
            robotScoreMaster.push(matchParsed[currMatch][currName]["robotScore"]);
            autoPickedUpFloorMaster.push(matchParsed[currMatch][currName]["autoPickedUpFloor"]);
            autoPickedUpBayMaster.push(matchParsed[currMatch][currName]["autoPickedUpBay"]);
            teleopPickedUpFloorMaster.push(matchParsed[currMatch][currName]["teleopPickedUpFloor"]);
            teleopPickedUpBayMaster.push(matchParsed[currMatch][currName]["teleopPickedUpBay"]);
            climbTypeMaster.push(matchParsed[currMatch][currName]["climbType"]);
            isLevelMaster.push(matchParsed[currMatch][currName]["isLevel"]);
            notesMaster.push(matchParsed[currMatch][currName]["notes"]);
            colorWheelMaster.push(matchParsed[currMatch][currName]["colorWheel"]);
            autoMissesMaster.push(matchParsed[currMatch][currName]["autoMisses"]);
            teleMissesMaster.push(matchParsed[currMatch][currName]["teleMisses"]);
            autoScoreMaster.push(matchParsed[currMatch][currName]["autoScore"]);
            teleScoreMaster.push(matchParsed[currMatch][currName]["teleScore"]);
            teleAccuracyMaster.push(matchParsed[currMatch][currName]["teleAccuracy"]);
            autoAccuracyMaster.push(matchParsed[currMatch][currName]["autoAccuracy"]);
            redCardMaster.push(matchParsed[currMatch][currName]["redCard"]);
            yellowCardMaster.push(matchParsed[currMatch][currName]["yellowCard"]);
            autoLineMaster.push(matchParsed[currMatch][currName]["MovedAuto"]);
            ballsDroppedAutoMaster.push(matchParsed[currMatch][currName]["ballsDroppedAuto"]);
            ballsDroppedTeleMaster.push(matchParsed[currMatch][currName]["ballsDroppedTele"]);
            fellMaster.push(matchParsed[currMatch][currName]["Fell"]);
            console.log("Another One");
            setTable();
            for (l = 0; l < 1000; l++) {
                console.log("Loading...");
            }
        }
    }
    for (t = 0; t < (robotScoreMaster.length); t++) {
        robotScoreTotal += robotScoreMaster[t];
        autoAccuracyTotal += autoAccuracyMaster[t];
        teleAccuracyTotal += teleAccuracyMaster[t];
    }
    document.getElementById("averageScore").innerHTML = "Average Score: " + (Math.round(((robotScoreTotal / robotScoreMaster.length) + Number.EPSILON) * 100) / 100);
    document.getElementById("maxScore").innerHTML = "Max Score: " + Math.max(...robotScoreMaster);
    document.getElementById("minScore").innerHTML = "Min Score: " + Math.min(...robotScoreMaster);
    document.getElementById("averageAutoAcc").innerHTML = "Auto Accuracy: " + (Math.round(((autoAccuracyTotal / autoAccuracyMaster.length) + Number.EPSILON) * 100) / 100);
    document.getElementById("averageTeleAcc").innerHTML = "Tele Accuracy: " + (Math.round(((teleAccuracyTotal / teleAccuracyMaster.length) + Number.EPSILON) * 100) / 100);
}

function setClimbTable(){
}

function setTable() {
    document.getElementById("nameBlame").innerHTML = nameBlameMaster[currDataTable];
    document.getElementById("matchTableNum").innerHTML = matchNumberMaster[currDataTable];
    document.getElementById("driveStat").innerHTML = driveStationMaster[currDataTable];
    document.getElementById("startPos").innerHTML = startPositionMaster[currDataTable];
    document.getElementById("robotTableSco").innerHTML = robotScoreMaster[currDataTable];
    document.getElementById("autoFloorTable").innerHTML = autoPickedUpFloorMaster[currDataTable];
    document.getElementById("autoBayTable").innerHTML = autoPickedUpBayMaster[currDataTable];
    document.getElementById("teleFloorTable").innerHTML = teleopPickedUpFloorMaster[currDataTable];
    document.getElementById("teleBayTable").innerHTML = teleopPickedUpBayMaster[currDataTable];
    document.getElementById("climbTypeTable").innerHTML = climbTypeMaster[currDataTable];
    document.getElementById("isLevelTable").innerHTML = isLevelMaster[currDataTabble];
    document.getElementById("colorWheelTable").innerHTML = colorWheelMaster[currDataTable];
    document.getElementById("autoMissTable").innerHTML = autoMissesMaster[currDataTable];
    document.getElementById("teleMissTable").innerHTML = teleMissesMaster[currDataTable];
    document.getElementById("autoScoreTable").innerHTML = autoScoreMaster[currDataTable];
    document.getElementById("teleScoreTable").innerHTML = teleScoreMaster[currDataTable];
    document.getElementById("autoAccuTable").innerHTML = autoAccuracyMaster[currDataTable];
    document.getElementById("teleAccuTable").innerHTML = teleAccuracyMaster[currDataTable];
    document.getElementById("redTable").innerHTML = redCardMaster[currDataTable];
    document.getElementById("yellowTable").innerHTML = yellowCardMaster[currDataTable];
    document.getElementById("autoLine").innerHTML = autoLineMaster[currDataTable];
    document.getElementById("autoDropped").innerHTML = ballsDroppedAutoMaster[currDataTable];
    document.getElementById("teleDropped").innerHTML = ballsDroppedTeleMaster[currDataTable];
    document.getElementById("fell").innerHTML = fellMaster[currDataTable];
}

function lessTable() {
    if (currDataTable > 0) {
        currDataTable--;
        setTable();
    }
}

function moreTable() {
    if ((nameBlameMaster.length - 1) > currDataTable) {
        currDataTable++;
        setTable();
    }
}
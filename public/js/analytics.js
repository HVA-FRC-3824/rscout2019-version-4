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
notesMaster = [];
climbTimeMaster = [];
colorWheelMaster = [];
autoMissesMaster = [];
teleMissesMaster = [];
autoScoreMaster = [];
teleScoreMaster = [];
teleAccuracyMaster = [];
autoAccuracyMaster = [];
redCardMaster = [];
yellowCardMaster = [];

function passwordCheck() {
    firebase.database().ref('/password/' + "2713").once("value", passCheck);
}

function passCheck(passcode) {
    console.log(passcode)
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
};

var sortById = function(prop) {
    return function(x, y) {
        return ((x[prop] === y[prop]) ? 0 : ((x[prop] > y[prop]) ? 1 : -1));
    };
};


function pullData() { //this function pulls the team number that the user entered
    robotNum = document.getElementById("robotNum").value; //sets the var robotNum equal to the robot number to be positive
    firebase.database().ref('/heatMap/' + robotNum).once("value", gotData); //acutally gets the data from firebase, then runs gotData()
    console.log(robotNum);
}

function gotData(data) { //makes the data readable
    var robotData = data.val(); //takes the value of the data
    console.log(robotData);
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
            console.log("here: " + currentMatch + " " + currentName);
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
        currMatch = matchNums[i];
        matchNames = Object.keys(matchParsed[currMatch]);
        for (j = 0; j < matchNames.length; j++) {
            currName = matchNames[j];
            console.log("here: " + currentMatch + " " + currentName);
            nameBlameMaster.push(currName);
            matchNumberMaster.push(currMatch);
            driveStationMaster.push(matchParsed[currentMatch][currName]["driveStation"]);
            startPositionMaster.push(matchParsed[currentMatch][currName]["startPosition"]);
            robotScoreMaster.push(matchParsed[currentMatch][currName]["robotScore"]);
            autoPickedUpFloorMaster.push(matchParsed[currentMatch][currName]["autoPickedUpFloor"]);
            autoPickedUpBayMaster.push(matchParsed[currentMatch][currName]["autoPickedUpBay"]);
            teleopPickedUpFloorMaster.push(matchParsed[currentMatch][currName]["teleopPickedUpFloor"]);
            teleopPickedUpBayMaster.push(matchParsed[currentMatch][currName]["teleopPickedUpBay"]);
            climbTypeMaster.push(matchParsed[currentMatch][currName]["climbType"]);
            notesMaster.push(matchParsed[currentMatch][currName]["notes"]);
            climbTimeMaster.push(matchParsed[currentMatch][currName]["climbTime"]);
            colorWheelMaster.push(matchParsed[currentMatch][currName]["colorWheel"]);
            autoMissesMaster.push(matchParsed[currentMatch][currName]["autoMisses"]);
            teleMissesMaster.push(matchParsed[currentMatch][currName]["teleMisses"]);
            autoScoreMaster.push(matchParsed[currentMatch][currName]["autoScore"]);
            teleScoreMaster.push(matchParsed[currentMatch][currName]["teleScore"]);
            teleAccuracyMaster.push(matchParsed[currentMatch][currName]["teleAccuracy"]);
            autoAccuracyMaster.push(matchParsed[currentMatch][currName]["autoAccuracy"]);
            redCardMaster.push(matchParsed[currentMatch][currName]["redCard"]);
            yellowCardMaster.push(matchParsed[currentMatch][currName]["yellowCard"]);
            console.log("Done!");
        }
    }

/*
        console.log(heatData.length);
        matches = Object.keys(robotData); //makes the matches into an array
        console.log(matches);
        pullNames(matches); //runs pullNames() with matches as the arguement
    */
}

/*
function pullNames(matches) { //either cycles through to the next match or it will move on to storing the arrays
    if ((matches.length - 1) < matchValue) {
        alert("Done!"); //means it is done pulling data from firebase
        storeArrays() //makes the pulled data push onto local storage
        console.log(masterXauto);
        console.log(masterYauto);
    } else { //continues to pull from firebase
        currentMatch = matches[matchValue]; //makes the currentMatch var according to the matchValue var
        firebase.database().ref('/heatMap/' + robotNum + '/' + currentMatch).once("value", setsName); //pull that certain matches data from our firebase database
    }
}


function setsName(data) { //makes the match data pulled readable and puts the names from the database into an array
    var names = data.val(); //takes the value of the data
    namesArray = Object.keys(names); //makes the names data into an array
    console.log(namesArray);
    pullCoords(namesArray); //runs the pullCoords() function with the namesArray as the arguement
}

function pullCoords(namesArray) { //pulls the data under each name in the names array
    if ((namesArray.length - 1) >= nameValue) {
        currentName = namesArray[nameValue]; //makes the current name var equal to a certain name value according to the "nameValue" var
        console.log(currentName)
        firebase.database().ref('/heatMap/' + robotNum + '/' + currentMatch + '/' + currentName).once("value", setsCoords); //pulls the coords under the name specified by the "currentName" var and then runs the setsCoords() function
    }
}

function setsCoords(data) { //makes the coords into their own array and decides if it must loop to a new match or name
    console.log(robotNum, currentMatch, currentName);
    var xy = data.val(); //takes the value of the data
    console.log(xy);
    masterXauto.push(xy["x auto"]); //pushes the data to the master array
    masterYauto.push(xy["y auto"]);
    masterXtele.push(xy["x tele"]);
    masterYtele.push(xy["y tele"]);
    nameValue++; //increments the nameValue var
    if (namesArray.length - 1 >= nameValue) { //decides if you need to loop to the new match or new name function
        pullCoords(namesArray); //returns to change the currentName var
    } else {
        matchValue++; //increments the matchValue var
        nameValue = 0; //resets the name value var
        pullNames(matches); //returns to change the currentMatch var 
    }
}

function resetVars() {
    robotNum = "";
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
}

function storeArrays() { //stores the heatmap data in the local storage
    localStorage.setItem("xAutoStore", JSON.stringify(masterXauto));
    localStorage.setItem("yAutoStore", JSON.stringify(masterYauto));
    localStorage.setItem("xTeleStore", JSON.stringify(masterXtele));
    localStorage.setItem("yTeleStore", JSON.stringify(masterYtele));
    localStorage.setItem("robotHeatNum", robotNum);
    alert("Done!");

}
//var xyArray = Object.keys(xy);
//console.log(xyArray);
//xyCoords(xyArray);

/*function xyCoords(xyArray) {
    for (i = 0; i < xyArray.length; i++) {
        currentCoordArray = xyArray[i];
        firebase.database().ref('/heatMap/' + robotNum + '/' + currentMatch + '/' + currentName + '/' + currentCoordArray).once("value", coordArrays);
        console.log("xyArray");
        for (j = 0; j < 5000; j++) {
            console.log("Loading...");
        }
    }
}*/

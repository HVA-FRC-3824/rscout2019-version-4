var matchInfo = "";
redAlliance = "";
blueAlliance = "";
k = 0;
btn = "";
mNumber = 0;
names = "No Name";
startPos = "";
robotAction = "";
itemsDropped = "";
climbTime = 0;
timeKeep = 0;
slider = 0;
climbType = "";
filteredJames = [];
ballsHeld = 0;
ballsHeldTeleop = 0;
teamSide = "";
robotScore = 0;
drive = "";
pickedUpAutoFloor = 0;
pickedUpTeleopFloor = 0;
pickedUpAutoBay = 0;
pickedUpTeleopBay = 0;
whereScoredG = 1;
isLevel = "notLevel";
notes = "";
colorWheel = "";
xAutoCoords = [];
yAutoCoords = [];
xTeleCoords = [];
yTeleCoords = [];
autoX = 0;
autoY = 0;
teleX = 0;
teleY = 0;
autoFieldWidth = 1033;
autoFieldHeight = 638;
fullFieldWidth = 1287;
fullFieldHeight = 638;
dropDownCheck = false;
inTeleop = false;
autoMisses = 0;
teleMisses = 0;
teleScore = 0;
autoScore = 0;
autoAccuracy = 0;
teleAccuracy = 0;
autoShots = 0;
teleShots = 0;

//* Initialize varibles

function createAlliance(matchNumber) { //* This function creates each and concatenates each alliance number into a string
    var i = matchNumber - 1
    blueAlliance = filteredJames[i].alliances.blue.team_keys[0].slice(3) + " | " + filteredJames[i].alliances.blue.team_keys[1].slice(3) + " | " + filteredJames[i].alliances.blue.team_keys[2].slice(3);
    redAlliance = filteredJames[i].alliances.red.team_keys[0].slice(3) + " | " + filteredJames[i].alliances.red.team_keys[1].slice(3) + " | " + filteredJames[i].alliances.red.team_keys[2].slice(3);

}

function startMatchScouting(mNumber, alliances) {
    localStorage.setItem("num", mNumber);
    localStorage.setItem("alliances", JSON.stringify(alliances));
    location.replace("./matchScouting.html");
};

function filterSchedule(qual) {
    return qual.comp_level == "qm";
}

function makeSchedule() { //* Makes schedule
    kidnap("/event/2020week0/matches"); //* Runs kidnap with the specified url
    James.sort(sortById("match_number")); //* Sorts the output of the of kidnap by match number
    filteredJames = James.filter(filterSchedule);
    var i = filteredJames.length;
    document.body.innerHTML = "<button onclick=makeSchedule() class='button1'> Populate Matches </button> <br>        <form action='./index.html'>    <button type='submit' class='buttonBack'>Back</button></form>";
    for (matchNumber = 1; matchNumber <= i; matchNumber++) { //* For loop for creating the schedule
        createAlliance(matchNumber); //* Runs createAlliance to print match participants on the button
        matchInfo = ("<button onclick =  'startMatchScouting(" + matchNumber + "," + JSON.stringify(filteredJames[matchNumber - 1].alliances) + ")'> Match " + matchNumber + ": <p style='color:#C1666B'>" + redAlliance + "</p> vs <p style='color:#4357AD'>" + blueAlliance + "</p></button>"); //*Defines matchInfo as the text of a button
        btn = document.createElement("BUTTON"); //* creates a button
        btn.innerHTML = matchInfo; //* Writes the matchInfo onto the button
        document.body.appendChild(btn);
    };
    localStorage.setItem("blueAllianceData", JSON.stringify(filteredJames));
};

function loadSchedule() {
    James = JSON.parse(localStorage.getItem("blueAllianceData"));
    James.sort(sortById("match_number")); //* Sorts the output of the of kidnap by match number
    for (matchNumber = 1; matchNumber <= James.length; matchNumber++) { //* For loop for creating the schedule
        createAlliance(matchNumber); //* Runs createAlliance to print match participants on the button
        matchInfo = ("<button onclick =  'startMatchScouting(" + matchNumber + "," + JSON.stringify(James[matchNumber - 1].alliances) + ")'> Match " + matchNumber + ": <p style='color:red'>" + redAlliance + "</p> | vs | <p style='color:blue'>" + blueAlliance + "</p></button>"); //*Defines matchInfo as the text of a button
        btn = document.createElement("BUTTON"); //* creates a button
        btn.innerHTML = matchInfo; //* Writes the matchInfo onto the button
        document.body.appendChild(btn);
    };
}

/* ------------for matchScouting------------- */



function createMatchArray() {
    //var database = firebase.database;
    match = localStorage.getItem("num");
    //thanks erick

    var teamNumber = 0;
    startPos = localStorage.getItem("startPos");
    console.log(driveStation);

    var name = document.getElementById("scouterName").value;
    if (name == "") {
        name = "No Name";
        alert("no Name!");
    }

    var notes = document.getElementById("notes").value;


    var alliances = JSON.parse(localStorage.getItem("alliances"))

    switch (driveStation) {
        case "B1":
            teamNumber = parseInt(alliances.blue.team_keys[0].slice(3));
            break;
        case "B2":
            teamNumber = parseInt(alliances.blue.team_keys[1].slice(3));
            break;
        case "B3":
            teamNumber = parseInt(alliances.blue.team_keys[2].slice(3));
            break;
        case "R1":
            teamNumber = parseInt(alliances.red.team_keys[0].slice(3));
            break;
        case "R2":
            teamNumber = parseInt(alliances.red.team_keys[1].slice(3));
            break;
        case "R3":
            teamNumber = parseInt(alliances.red.team_keys[2].slice(3));
            break;
        default:
            teamNumber = 9999;
            break;

    }
    var levelCheck = document.getElementById("levelCheck").checked;
    console.log(levelCheck)
    if (levelCheck == true) {
        isLevel = "level";
    } else {
        isLevel = "notLevel";
    }
    var yellowCheck = document.getElementById("yellowCheck");
    var redCheck = document.getElementById("redCheck");

    if (yellowCheck.checked == true) {
        yellowCheck = "yes";
    } else {
        yellowCheck = "no";
    }
    if (redCheck.checked == true) {
        redCheck = "yes";
    } else {
        redCheck = "no";
    }


    if (autoShots != 0 && teleShots != 0) {
        autoAccuracy = 1 - (autoMisses / autoShots);
        teleAccuracy = 1 - (teleMisses / teleShots);
    }

    matchDataArray = {
        name: name,
        match: match,
        teamNumber: teamNumber,
        driveStation: driveStation,
        startPos: startPos,
        robotScore: robotScore,
        pickedUpAutoBay: pickedUpAutoBay,
        pickedUpAutoFloor: pickedUpAutoFloor,
        pickedUpTeleopFloor: pickedUpTeleopFloor,
        pickedUpTeleopBay: pickedUpTeleopBay,
        climbType: climbType,
        isLevel: isLevel,
        notes: notes,
        climbTime: climbTime,
        colorWheel: colorWheel,
        teleMisses: teleMisses,
        autoMisses: autoMisses,
        autoScore: autoScore,
        teleScore: teleScore,
        autoAccuracy: autoAccuracy,
        teleAccuracy: teleAccuracy,
        yellowCheck: yellowCheck,
        redCheck: redCheck,

    };

    heatMapArray = {
        xauto: xAutoCoords,
        yauto: yAutoCoords,
        xtele: xTeleCoords,
        ytele: yTeleCoords,
    }

    pushFirebaseMatch(matchDataArray, heatMapArray);
}

function pushFirebaseMatch(data, heatData) {
    console.log(data);
    firebase.database().ref('matchScouting/' + data.match + '/' + data.teamNumber + '/' + data.name + '/').set({
        "driveStation": data.driveStation,
        "startPosition": data.startPos,
        "robotScore": data.robotScore,
        "autoPickedUpFloor": data.pickedUpAutoFloor,
        "autoPickedUpBay": data.pickedUpAutoBay,
        "teleopPickedUpFloor": data.pickedUpTeleopFloor,
        "teleopPickedUpBay": data.pickedUpTeleopBay,
        "climbType": data.climbType + " " + data.isLevel,
        "notes": data.notes,
        "climbTime": data.climbTime,
        "colorWheel": data.colorWheel,
        "autoMisses": data.autoMisses,
        "teleMisses": data.teleMisses,
        "autoScore": data.autoScore,
        "teleScore": data.teleScore,
        "teleAccuracy": data.teleAccuracy,
        "autoAccuracy": data.autoAccuracy,
        "redCard": data.redCheck,
        "yellowCard": data.yellowCheck,

    });
    firebase.database().ref('heatMap/' + data.teamNumber + '/' + data.match + '/' + data.name + '/').set({
        "x auto": heatData.xauto,
        "y auto": heatData.yauto,
        "x tele": heatData.xtele,
        "y tele": heatData.ytele,
    });
    setTimeout(nextMatch, 1000);
}

//Brings you back to the populate matches/shedule page
function nextMatch() {
    console.log(match)
    mNumber = localStorage.getItem("num");
    mNumber++;
    localStorage.setItem("num", mNumber);
    location.replace("./schedule.html");
}

//the tab buttons at the top of the page
function openPage(pageName) {
    //* Hide all elements with class="tabcontent" by default
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "";
    };

    //* Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "#7722cc";
    };

    //* Show the specific tab content
    document.getElementById(pageName).style.display = "block";
    document.getElementById("input-number").innerHTML = 0;
    document.getElementById("input-number2").innerHTML = 0;
    //document.getElementById("demo").innerHTML = climbTime;
    var match = localStorage.getItem("num");
    document.getElementById("matchNum").innerHTML = match;
    console.log(match);

};


//checks the state of the wheel spin radio button and sets that to the global variable
function wheel(didSpin) {
    if (didSpin == 0) {
        colorWheel = "didntSpin";
    } else if (didSpin == 1) {
        colorWheel = "selectedColor";
    } else if (didSpin == 2) {
        colorWheel = "spun3Times";
    } else if (didSpin == 3) {
        colorWheel = "failedWheel";
    } else if (didSpin == 4) {
        colorWheel = "didBoth";
    }
}

//query's the image coords and does grant's heatmap stuff so they work
function getShootSpotAuto() {
    var autoImage = document.querySelector("#autoField");
    var autoButton = document.querySelector("#defaultOpen");
    var buttonHeight = autoButton.clientHeight;
    autoX = ((event.clientX / autoImage.clientWidth) * 1033)
    autoY = (((event.clientY - buttonHeight) / autoImage.clientHeight) * 638)
    console.log(event.clientX + " " + event.clientY);
    console.log(autoX + " " + autoY);
    if (teamSide == "B") {
        autoX = (((autoImage.clientWidth - event.clientX) / autoImage.clientWidth) * 1033);
        autoY = (((autoImage.clientHeight - event.clientY) / autoImage.clientHeight) * 638);
    }
}

//does the same as get shoot spot auto but for teleop
function getShootSpotTeleop() {
    var teleImage = document.querySelector("#teleopField");
    var teleButton = document.querySelector("#defaultOpen");
    var buttonHeight = teleButton.clientHeight;
    teleX = ((event.clientX / teleImage.clientWidth) * 1287)
    teleY = (((event.clientY - buttonHeight) / teleImage.clientHeight) * 638)
    console.log(teleX + " " + teleY);

}


//local stores the choose robot start position radio buttons
function chooseRobotPostition(position) {
    var startPos = position;
    localStorage.setItem("startPos", startPos);
}

//sets the balls held counter to however many the robot started with
function chooseStartBalls(startBalls) {
    ballsHeld = 0;
    for (i = 0; i <= (startBalls - 1); i++) {
        increment(4, 4);
    }

}

//picks the field image to use in auto based on the driver station
function chooseDriveStation(drive) {
    driveStation = drive;
    teamSide = drive.slice(0, 1);

    if (teamSide == "R") {
        document.getElementById("autoField").src = "./images/red-field.png";
        document.getElementById("teleopField").src = "./images/full-field.png";
    } else if (teamSide == "B") {
        document.getElementById("autoField").src = "./images/blue-field.png";
        document.getElementById("teleopField").src = "./images/full-field.png";
    } else {
        alert("no button");
    }
}


//increments the balls held variable and adds to the picked up in auto and picked up in tele
function increment(teleOrAuto, wherePickedUp) {
    if (ballsHeld < 5) {
        ballsHeld++;
    }
    console.log(ballsHeld + " balls held");
    if (teleOrAuto == 0) {
        if (wherePickedUp == 0) {
            pickedUpAutoFloor++;
            console.log(pickedUpAutoFloor + " picked up in auto floor");
        } else {
            pickedUpAutoBay++;
            console.log(pickedUpAutoBay + " picked up in auto loading bay");
        }
    } else if (teleOrAuto == 1) {
        if (wherePickedUp == 0) {
            pickedUpTeleopFloor++;
            console.log(pickedUpTeleopFloor + " picked up in teleop floor");
        } else {
            pickedUpTeleopBay++;
            console.log(pickedUpTeleopBay + " picked up in auto loading bay");
        }
    } else {
        console.log("debugIncrement");
    }
    document.getElementById("ballsHeld").innerHTML = ballsHeld;
    document.getElementById("ballsHeldTele").innerHTML = ballsHeld;
}


//decrements the balls held counter
function decrement() {
    if (ballsHeld > 0) {
        ballsHeld--;
    }
    console.log(ballsHeld + " balls held");
    document.getElementById("ballsHeld").innerHTML = ballsHeld;
    document.getElementById("ballsHeldTele").innerHTML = ballsHeld;
}


//opens up the first dropdown when click on field
function autoFieldInput() {
    if (dropDownCheck == false) {
        document.getElementById("autoDropdown").classList.toggle("show");
    }
}


//does whats above but teleop
function teleopFieldInput() {
    if (dropDownCheck == false) {
        document.getElementById("teleopDropdown").classList.toggle("show");
    }
}


//opens the second dropdown/popup whem you click on the first one
function autoFieldInput2() {
    document.getElementById("autoDropdown2").classList.toggle("show");
    dropDownCheck = true;
}


//same as above but tele
function teleopFieldInput2() {
    document.getElementById("teleopDropdown2").classList.toggle("show");
    dropDownCheck = true;
}

//transfers the balls held value from auto to tele
function transferBalls() {
    document.getElementById("ballsHeldTele").innerHTML = ballsHeld;
}

//Endgame Timer
var climbTime = 0;

function startTimer() {
    if (timeKeep != null) {
        clearInterval(timeKeep);
    }
    timeKeep = setInterval(incrementTime, 10);
    console.log("starting timer");
}

function stopTimer() {
    clearInterval(timeKeep);
    console.log("stopping timer");
}

function incrementTime() {
    climbTime += .01;
    document.getElementById("climbed_time").innerHTML = climbTime.toFixed(2);
}

function resetTime() {
    climbTime = 0;
    document.getElementById("climbed_time").innerHTML = climbTime.toFixed(2);
}
//end of timer code


//sets the climb radio button to a global variable
function didClimb(p) {
    climbType = p;
}



/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function hideAutoDropdown(whereScored) {
    whereScoredG = whereScored;
    //globalizing the variable
    if (whereScored == 0) {
        autoMisses++;
    }
    document.getElementById("autoDropdown").classList.toggle("show");
}

//hides the second dropdown in auto and pushes the coords for the heat map and the robot score
function hideAutoDropdown2(howManyScored) {
    robotScore = robotScore + ((whereScoredG * 2) * howManyScored);
    autoScore = autoScore + ((whereScoredG * 2) * howManyScored);
    for (i = 0; i < howManyScored; i++) {
        decrement();
        xAutoCoords.push(autoX);
        yAutoCoords.push(autoY);
        console.log(xAutoCoords);
        console.log(yAutoCoords);
        autoShots++;
    }
    document.getElementById("autoDropdown2").classList.toggle("show");
    console.log(robotScore);
    dropDownCheck = false;
}

function hideTeleopDropdown(whereScored) {
    whereScoredG = whereScored;
    if (whereScored == 0) {
        teleMisses++;
    }
    document.getElementById("teleopDropdown").classList.toggle("show");
    console.log(whereScoredG + " whereScored");
}

function hideTeleopDropdown2(howManyScored) {
    robotScore = robotScore + (whereScoredG * howManyScored);
    teleScore = teleScore + (whereScoredG * howManyScored);
    for (i = 0; i < howManyScored; i++) {
        decrement();
        xTeleCoords.push(teleX);
        yTeleCoords.push(teleY);
        console.log(xTeleCoords);
        console.log(yTeleCoords);
        teleShots++;
    }
    document.getElementById("teleopDropdown2").classList.toggle("show");
    console.log(robotScore + " points");
    dropDownCheck = false;
}

function backConfirm() {
    if (confirm("Are you sure?") == true) {
        location.replace('./schedule.html')
    }
}
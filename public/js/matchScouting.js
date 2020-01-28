var matchInfo = "";
redAlliance = "";
blueAlliance = "";
k = 0;
btn = "";
mNumber = 0;
names = "";
startPos = "";
robotAction = "";
itemsDropped = "";
climbTime = 0;
timeKeep = 0;
slider = 0;
climbType = "";
filteredJames = [];
ballsHeldAuto = 0;
ballsHeldTeleop = 0;
teamSide = "";
robotScore = 0;
drive = "";

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
    kidnap("/event/2019hop/matches"); //* Runs kidnap with the specified url
    James.sort(sortById("match_number")); //* Sorts the output of the of kidnap by match number
    filteredJames = James.filter(filterSchedule);
    var i = filteredJames.length;
    document.body.innerHTML = "<button onclick=makeSchedule() class='button1'> Populate Matches </button> <br>";
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
    var teamNumber = 0;

    console.log(driveStation);

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

    var startPos = document.getElementById("startPos").value;
    matchDataArray = { match: match, teamNumber: teamNumber, driveStation: driveStation, startPos: startPos, robotScore: robotScore };
    pushFirebaseMatch(matchDataArray);
}

function pushFirebaseMatch(data) {
    console.log(data);
    firebase.database().ref('matchNumber/' + data.match + '/' + data.teamNumber + '/').set({
        "driveStation": data.driveStation,
        "startPosition": data.startPos,
        "robotScore": data.robotScore,
    });
    setTimeout(nextMatch, 1000);
}

function nextMatch() {
    console.log(match)
    mNumber = localStorage.getItem("num");
    mNumber++;
    localStorage.setItem("num", mNumber);
    location.replace("./schedule.html");
}
//location.replace("./matchScouting.html");

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
        tablinks[i].style.backgroundColor = "rebeccapurple";
    };

    //* Show the specific tab content
    document.getElementById(pageName).style.display = "block";
    document.getElementById("input-number").innerHTML = 0;
    document.getElementById("input-number2").innerHTML = 0;
    document.getElementById("demo").innerHTML = climbTime;
};

function getShootSpotAuto() {
    var shootX = event.clientX;
    var shootY = event.clientY;
    var shootPositionAuto = "X coords: " + shootX + ", Y coords: " + shootY;
    console.log(shootPositionAuto);
}

function getShootSpotTeleop() {
    var shootX = event.clientX;
    var shootY = event.clientY;
    var shootPositionTeleop = "X coords: " + shootX + ", Y coords: " + shootY;
    console.log(shootPositionTeleop);
}

function chooseDriveStation(drive) {
    driveStation = drive;
    teamSide = drive.slice(0, 1);
    alert(teamSide);
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

function increment() {
    if (ballsHeldTeleop < 5) {
        ballsHeldAuto++;
        document.getElementById("input-number").innerHTML = ballsHeldAuto;
    }
}

function incrementTelop() {
    if (ballsHeldTeleop < 5) {
        ballsHeldTeleop++;
        document.getElementById("input-number2").innerHTML = ballsHeldTeleop;
    }
}

function decrement() {
    if (ballsHeldAuto > 0) {
        ballsHeldAuto--;
        document.getElementById("input-number").innerHTML = ballsHeldAuto;
    }
}

function decrementTeleop() {
    if (ballsHeldTeleop > 0) {
        ballsHeldTeleop--;
        document.getElementById("input-number2").innerHTML = ballsHeldTeleop;
    }
}
/*
function teamColor(driveStation) { //!TODO Add full-field functionality to teleop and make sure the field can swap orientation
    teamSide = drive.slice(0);
    alert(teamSide);
    if (teamside == "R") {
        document.getElementById("autoField").src = "../images/red-field.png";
        document.getElementById("autoField2").src = "../images/red-field.png";
    } else if (teamside == "B") {
        document.getElementById("autoField").src = "../images/blue-field.png";
        document.getElementById("autoField2").src = "../images/blue-field.png";
    } else {
        alert("no button");
    }
} 
*/

function autoFieldInput(f) {
    robotAction = f;
    //alert(robotAction);
    document.getElementById("autoDropdown").classList.toggle("show");
}

function teleopFieldInput(f) {
    robotAction = f;
    document.getElementById("teleopDropdown").classList.toggle("show");
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

function didClimb(p) {
    climbType = p;
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function hideAutoDropdown(whereScored) {
    robotScore = robotScore + (whereScored * 2);
    decrement();
    //shootPosition = shootHeatMap[];
    document.getElementById("autoDropdown").classList.toggle("show");
    console.log(robotScore);
}

function hideTeleopDropdown(whereScored) {
    robotScore = robotScore + whereScored;
    decrementTeleop();
    document.getElementById("teleopDropdown").classList.toggle("show");
    console.log(robotScore);
}
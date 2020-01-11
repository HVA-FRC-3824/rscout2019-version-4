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
droppedAuto = 0;
droppedTeleop = 0;
climbTime = 0;
timeKeep = 0;
slider = 0;
climbType = "";

//* Initialize variblesks

function createAlliance(matchNumber) { //* This function creates each and concatenates each alliance number into a string
    i = matchNumber - 1
    blueAlliance = James[i].alliances.blue.team_keys[0].slice(3) + " | " + James[i].alliances.blue.team_keys[1].slice(3) + " | " + James[i].alliances.blue.team_keys[2].slice(3);
    redAlliance = James[i].alliances.red.team_keys[0].slice(3) + " | " + James[i].alliances.red.team_keys[1].slice(3) + " | " + James[i].alliances.red.team_keys[2].slice(3);

}

function startMatchScouting(mNumber, alliances) {
    localStorage.setItem("num", mNumber);
    localStorage.setItem("alliances", JSON.stringify(alliances));
    location.replace("./matchScouting.html");
};

function makeSchedule() { //* Makes schedule
    kidnap("/event/2019hop/matches"); //* Runs kidnap with the specified url
    James.sort(sortById("match_number")); //* Sorts the output of the of kidnap by match number
    for (matchNumber = 1; matchNumber <= James.length; matchNumber++) { //* For loop for creating the schedule
            createAlliance(matchNumber); //* Runs createAlliance to print match participants on the button
            matchInfo = ("<button onclick =  'startMatchScouting(" + matchNumber + "," + JSON.stringify(James[matchNumber - 1].alliances) + ")'> Match " + matchNumber + ": <p style='color:red'>" + redAlliance + "</p> | vs | <p style='color:blue'>" + blueAlliance + "</p></button>"); //*Defines matchInfo as the text of a button
            btn = document.createElement("BUTTON"); //* creates a button
            btn.innerHTML = matchInfo; //* Writes the matchInfo onto the button
            document.body.appendChild(btn);
    };
};

/* ------------for matchScouting------------- */

function pushFirebase() {
    //var database = firebase.database;
    match = localStorage.getItem("num");
    var teamNumber = 0;

    console.log(driveStation);

    var alliances = JSON.parse(localStorage.getItem("alliances"))

    switch(driveStation) {
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

    firebase.database().ref('firescout2019/' + match).set({
        "Match Number": match,
        "teamNumber": teamNumber,
        "driveStation": driveStation,
        "startPosition": startPos,
    });
}

function nextMatch() {
    mNumber = localStorage.getItem("num");
    mNumber++;
    localStorage.setItem("num", mNumber);
    alert("Now scouting: Match " + mNumber);
}
//location.replace("./matchScouting.html");

function openPage(pageName) {
    //* Hide all elements with class="tabcontent" by default
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "";
    };

    //* Remove the background color of all tablinks/buttonss
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

function chooseStart(p) {
    startPos = p;
    alert(startPos);
}

function chooseDriveStation(drive) {
    console.log(drive);
    driveStation = drive;
}

function increment() {
    droppedAuto++;
    document.getElementById("input-number").innerHTML = droppedAuto;
}

function increment2() {
    droppedTeleop++;
    document.getElementById("input-number2").innerHTML = droppedTeleop;
}

function decrement() {
    droppedAuto--;
    document.getElementById("input-number").innerHTML = droppedAuto;
}

function decrement2() {
    droppedTeleop--;
    document.getElementById("input-number2").innerHTML = droppedTeleop;
}

function teamColor() { //!TODO Add full-field functionality to teleop and make sure the field can swap orientation
    if (startPos.slice(0, 3) == "red") {
        document.getElementById("autoField").src = "./images/frcAutoRed.png";
        document.getElementById("autoField2").src = "./images/frcAutoRed.png";
    } else if (startPos.slice(0, 3) == "blu") {
        document.getElementById("autoField").src = "./images/frcAutoBlue.png";
        document.getElementById("autoField2").src = "./images/frcAutoBlue.png";
    } else {
        alert("no button");
    }
}

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
function hideAutoDropdown() {
    document.getElementById("autoDropdown").classList.toggle("show");
}

function hideTeleopDropdown() {
    document.getElementById("teleopDropdown").classList.remove("show");
}
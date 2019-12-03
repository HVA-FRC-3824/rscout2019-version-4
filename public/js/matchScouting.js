var matchInfo = "";
redAlliance = "";
blueAlliance = "";
k = 0;
btn = "";
mNumber = 0;
matches = [];
names = "";
startPos = "";
robotAction = "";
itemsDropped = "";
var droppedAuto = 0;
//* Initialize varibles

function createAlliance(i) { //* This function creates each and concatenates each alliance number into a string
    redAlliance = James[i].alliances.blue.team_keys[0].slice(3) + " | " + James[i].alliances.blue.team_keys[1].slice(3) + " | " + James[i].alliances.blue.team_keys[2].slice(3);
    blueAlliance = James[i].alliances.red.team_keys[0].slice(3) + " | " + James[i].alliances.red.team_keys[1].slice(3) + " | " + James[i].alliances.red.team_keys[2].slice(3);
}

function makeSchedule() { //* Makes schedule
    kidnap("/event/2019hop/matches"); //* Runs kidnap with the specified url
    James.sort(sortById("match_number")); //* Sorts the output of the of kidnap by match number
    for (matchNumber = 0, k = 0; matchNumber < James.length; matchNumber++) { //* For loop for creating the schedule
        if (James[matchNumber].comp_level === "qm") { //* If statement to exclude playoff matches from schedule
            k++;
            createAlliance(matchNumber); //* Runs createAlpliance to print match participants on the button
            matchInfo = ("<button onclick = 'replacePage(" + k + ")'>Match " + k + ": " + redAlliance + " | vs | " + blueAlliance + "</button>"); //*Defines matchInfo as the text of a button
            btn = document.createElement("BUTTON"); //* creates a button
            btn.innerHTML = matchInfo; //* Writes the matchInfo onto the button
            document.body.appendChild(btn);
        };
    };
};

function replacePage(id) {
    var mNumber = id;
    alert(mNumber);
    localStorage.setItem("num", mNumber);
    location.replace("./matchScouting.html");

};


/* ------------for matchScouting------------- */
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
};

var slider = document.getElementById("input");
var output = document.getElementById("returnInput");
output.innerHTML = slider.value;
slider.oninput = function() {
  output.innerHTML = this.value;
}

function chooseStart(p) {
    startPos = p;
    alert(startPos);
}

function chooseDriveStation(drive){
    driveStation = drive;
}

function increment() {
    droppedAuto++;
    document.getElementById("input-number").innerHTML = droppedAuto;
}

function decrement() {
    droppedAuto--;
    document.getElementById("input-number").innerHTML = droppedAuto;
}

function teamColor() {
    if (startPos.slice(0, 3) == "red") {
        alert("red");
        document.getElementById("autoField").src = "./images/frcFieldRed.png";
    } else if (startPos.slice(0, 3) == "blu") {
        alert("blu");
        document.getElementById("autoField").src = "./images/frcFieldBlue.png";
    } else {
        alert("no button");
        document.getElementById("autoField").src = "./images/frcField.png";
    }
}

function fieldInput(f) {
    robotAction = f;
    alert(robotaction);
}
let ballsHeld = 0;
let dropDownCheck = false;

function openPage(pageName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "";
    };

    document.getElementById(pageName).style.display = "block";
}

function localName() {
    document.getElementById("scouterName").value = localStorage.getItem("localName");
}

//========================== Pre Match Info =====================================//


function chooseDriveStation(drive) { //Making the field image appear after chosing team
    teamSide = drive.slice(0, 1);
    if (teamSide == "R") {
        document.getElementById("autoField").src = "./images/red-field.png";
        document.getElementById("teleopField").src = "./images/full-field.png";
    } else if (teamSide == "B") {
        document.getElementById("autoField").src = "./images/blue-field.png";
        document.getElementById("teleopField").src = "./images/full-field.png";
    } else {
        alert("No Team Selected")
    }
}


//========================== Auto & Teleop Tabs =================================//

//Opening the Tele And Auto Dropdowns
function fieldInput() {
    if (dropDownCheck == false) {
        document.getElementById("autoDropdown").classList.toggle("show");
        document.getElementById("teleopDropdown").classList.toggle("show");
    }
}

function fieldInput2() {
    document.getElementById("autoDropdown2").classList.toggle("show");
    document.getElementById("teleopDropdown2").classList.toggle("show");
    dropDownCheck = false;
}

function hideDropdown() {
    if (dropDownCheck == false) {
        document.getElementById("autoDropdown").classList.toggle("show");
        document.getElementById("teleopDropdown").classList.toggle("show");
    }
}


function hideDropdown2() {
    document.getElementById("autoDropdown2").classList.toggle("show");
    document.getElementById("teleopDropdown2").classList.toggle("show");
}

//Keeping track of balls held
function incrementBallsHeld(balls, pickedUp) {
    if (pickedUp) {
        if (ballsHeld < 5) {
            ballsHeld += balls;
        }
    } else if (!pickedUp) {
        if (ballsHeld > 0) {
            if (ballsHeld >= balls) {
                ballsHeld -= balls;
            }
        }
    }
    document.getElementById("ballsHeld").innerHTML = "Balls Held: " + ballsHeld;
    document.getElementById("ballsHeldTele").innerHTML = "Balls Held: " + ballsHeld;
}

//===================== Matchscouting Array creation ============================//

function createMatchArray() {
    //stores the previous match number for reference on next schedule load
    let match = localStorage.getItem("num");
    localStorage.setItem("previousMatch", parseInt(match) + 1);

    let name = document.getElementById("scouterName").value;
    if (name == "") {
        name = localStorage.getItem("localName");
    } else {
        localStorage.setItem("localName", name);
    }

    //TODO: ask weston if we still want to get notes from scouters
    let notes = document.getElementById("notes").value;

    let teamNumber = 0;
    let alliances = JSON.parse(localStorage.getItem("alliances"));
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
            teamNumber = parseInt(alliances.blue.team_keys[0].slice(3));
            break;
        case "R2":
            teamNumber = parseInt(alliances.blue.team_keys[1].slice(3));
            break;
        case "B3":
            teamNumber = parseInt(alliances.blue.team_keys[2].slice(3));
            break;
        default:
            teamNumber = 9999;
            break;
    }

    let yellowCheck = document.getElementById("yellowCheck");
    if (yellowCheck.checked == true) {
        yellowCheck = "yes";
    } else {
        yellowCheck = "no";
    }

    let redCheck = document.getElementById("redCheck");
    if (redCheck.checked == true) {
        redCheck = "yes";
    } else {
        redCheck = "no";
    }


}

//back button for match scouting. -Graham
function backConfirm() {
    if (confirm("Are you sure?") == true) {
        location.replace('./schedule.html')
    }
}
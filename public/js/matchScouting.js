var ballsHeld = 0;
var dropDownCheck = false;
var xAutoCoords = [];
var yAutoCoords = [];
var xTeleCoords = [];
var yTeleCoords = [];

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

function setBallsHeld(startingBalls) {
    ballsHeld += startingBalls;
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

function getShootSpot(teleop) {
    if (teleop) {
        var teleImage = document.querySelector("#teleopField");
        var teleButton = document.querySelector("#defaultOpen");
        var buttonHeight = teleButton.clientHeight;
        teleX = ((event.clientX / teleImage.clientWidth) * 1287);
        teleY = (((event.clientY - buttonHeight) / teleImage.clientHeight) * 638);
        console.log(teleX + " " + teleY);
    } else if (!teleop) {
        var autoImage = document.querySelector("#autoField");
        var autoButton = document.querySelector("#defaultOpen");
        var buttonHeight = autoButton.clientHeight;
        autoX = ((event.clientX / autoImage.clientWidth) * 1033)
        autoY = (((event.clientY - buttonHeight) / autoImage.clientHeight) * 638)
        console.log(autoX + " " + autoY);
        if (teamSide == "B") {
            autoX = (((autoImage.clientWidth - event.clientX) / autoImage.clientWidth) * 1033);
            autoY = (((autoImage.clientHeight - event.clientY) / autoImage.clientHeight) * 638);
        }
    }
}

//Keeping track of balls held
function incrementBallsHeld(balls, pickedUp, teleop, dropped) {
    if (pickedUp) {
        if (ballsHeld < 5) {
            ballsHeld += balls;
        }
    } else if (!pickedUp) {
        if (ballsHeld > 0) {
            if (ballsHeld >= balls) {
                ballsHeld -= balls;
                if (!dropped) {
                    if (teleop) {
                        for (i = 0; i < balls; i++) {
                            xTeleCoords.push(teleX);
                            yTeleCoords.push(teleY);
                        }
                    } else if (!teleop) {
                        for (i = 0; i < balls; i++) {
                            xAutoCoords.push(autoX);
                            yAutoCoords.push(autoY);
                        }
                    }
                } else {
                    console.log("Drop");
                }
            }
        }
    }
    updateBallsHeld();
}

function updateBallsHeld() {
    document.getElementById("ballsHeld").innerHTML = "Balls Held: " + ballsHeld;
    document.getElementById("ballsHeldTele").innerHTML = "Balls Held: " + ballsHeld;
}

//=========================== Post-Match Info ===================================//

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

    if (autoShots != 0 && teleShots != 0) {
        let autoAccuracy = 1 - (autoMisses / autoShots);
        let teleAccuracy = 1 - (teleMisses / teleShots);
    }

    autoAccuracy = (Math.round((autoAccuracy + Number.EPSILON) * 100) / 100);
    teleAccuracy = (Math.round((teleAccuracy + Number.EPSILON) * 100) / 100);

    if (xTeleCoords.length == 0) {
        xTeleCoords.push(0);
        yTeleCoords.push(0);
    }

    if (xAutoCoords.length == 0) {
        xAutoCoords.push(0);
        yAutoCoords.push(0);
    }

    let matchDataArray = {
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
        colorWheel: colorWheel,
        teleMisses: teleMisses,
        autoMisses: autoMisses,
        autoScore: autoScore,
        teleScore: teleScore,
        autoAccuracy: autoAccuracy,
        teleAccuracy: teleAccuracy,
        yellowCheck: yellowCheck,
        redCheck: redCheck,
        ballsDroppedAuto: ballsDroppedAuto,
        ballsDroppedTele: ballsDroppedTele,
    }
    console.log(matchDataArray);
    heatMapArray = {
        xauto: xAutoCoords,
        yauto: yAutoCoords,
        xtele: xTeleCoords,
        ytele: yTeleCoords,
    }
    pushFirebaseMatch(matchDataArray, heatMapArray);
}

function pushFirebaseMatch(data, heatData) {
    console.log(data)
    firebase.database().ref('matchScouting/' + data.teamNumber + '/' + data.match + '/' + data.name + '/').set({
        "driveStation": data.driveStation,
        "startPosition": data.startPos,
        "robotScore": data.robotScore,
        "autoPickedUpFloor": data.pickedUpAutoFloor,
        "autoPickedUpBay": data.pickedUpAutoBay,
        "teleopPickedUpFloor": data.pickedUpTeleopFloor,
        "teleopPickedUpBay": data.pickedUpTeleopBay,
        "climbType": data.climbType,
        "isLevel": data.isLevel,
        "colorWheel": data.colorWheel,
        "autoMisses": data.autoMisses,
        "teleMisses": data.teleMisses,
        "autoScore": data.autoScore,
        "teleScore": data.teleScore,
        "teleAccuracy": data.teleAccuracy,
        "autoAccuracy": data.autoAccuracy,
        "redCard": data.redCheck,
        "yellowCard": data.yellowCheck,
        "ballsDroppedAuto": data.ballsDroppedAuto,
        "ballsDroppedTele": data.ballsDroppedTele,
        "MovedAuto": data.autoMove,
        "Fell": data.fell,
    });
    firebase.database().ref('heatMap/' + data.teamNumber + '/' + data.match + '/' + data.name + '/').set({
        "x auto": heatData.xauto,
        "y auto": heatData.yauto,
        "x tele": heatData.xtele,
        "y tele": heatData.ytele,
    });
    setTimeout(function() { nextMatch(); }, 1000);
}

//===================== Returning to schedule =============================//

function nextMatch() {
    console.log(match)
    mNumber = localStorage.getItem("num");
    localStorage.setItem("num", mNumber);
    location.replace("./schedule.html");
}

function backConfirm() {
    if (confirm("Are you sure?") == true) {
        location.replace('./schedule.html')
    }
}

//=========================firebase login stuff===============================//

function checkUN() {
    var user = firebase.auth().currentUser;
    if (user == null) {
        location.replace('./index.html');
    }
};
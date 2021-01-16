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


//========================== Pre Match Info End =================================//

/* -- creates the matchscouting data array -- */
function createMatchArray() {

}



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


//back button for match scouting. -Graham
function backConfirm() {
    if (confirm("Are you sure?") == true) {
        location.replace('./schedule.html')
    }
}
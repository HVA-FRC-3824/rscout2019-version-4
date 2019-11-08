var matchInfo;
redAlliance = "";
blueAlliance = "";
k = 0;
btn = "";
mNumber = 0;
matches = []; //* Initialize varibles

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
            createAlliance(matchNumber); //* Runs createAlliance to print match participants on the button
            matchInfo = ("<button onclick = replacePage("+k+")>Match " + k + ": " + redAlliance + " | vs | " + blueAlliance + "</button>"); //*Defines matchInfo as the text of a button
            btn = document.createElement("BUTTON"); //* creates a button
            btn.id = k;
            btn.innerHTML = matchInfo; //* Writes the matchInfo onto the button
            document.body.appendChild(btn);
        };
    };
};


//!Jovi's Solution

// www.website.com/index.php?variable=82141
// $_GET["variable"]; <-- 82141

//var url = window.location.href;
//url <-- www.website.com/index.php?variable=82141
//for loop --> if (url.charAt(i) == '?') --> var variableName --> variable --> if (variableName == "variable") --> var variableId = 82141


function getNum() {
    alert(mNumber);
};

function replacePage(id) {
    var mNumber = id;
    alert(id);
    location.replace("./real-scouting.html.");
    return mNumber;
    //mNumber = btn.getElementById(id);
}

/* ------------for real-scouting------------- */
function openPage(pageName, color) {
    //* Hide all elements with class="tabcontent" by default
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "";
    };

    //* Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "purple";
    };

    //* Show the specific tab content
    document.getElementById(pageName).style.display = "block";

    //* Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
};

//* Get the element with id="defaultOpen" and click on it
//document.getElementById("defaultOpen").click();
//document.querySelector('.content .value').innerHTML = mNumber;

/* ------------for real-scouting------------- */
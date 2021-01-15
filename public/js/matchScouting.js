let James = {};


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
        async: false,
        success: function(data) { //this function logs our data in the console if it is successfully pulled
            James = data;
            console.log(James);
            return James;

        },
    });
    $(document).ajaxError(function() { //this function alerts an error if the pulling the data is unsuccessful
        alert("An error occurred!");
    });

    console.log(James);
};

var sortById = function(prop) {
    return function(x, y) {
        return ((x[prop] === y[prop]) ? 0 : ((x[prop] > y[prop]) ? 1 : -1));
    };
};

function makeSchedule() { //* Makes schedule

    //* Checks localStorage for the last match scouted 
    previousMatch = localStorage.getItem("previousMatch");
    if (previousMatch == null) {
        previousMatch = 1;
    }
    console.log(previousMatch);
    //* 

    kidnap("/event/2020scmb/matches"); //* Runs kidnap with the specified url
    James.sort(sortById("match_number")); //* Sorts the output of the of kidnap by match number
    filteredJames = James.filter(filterSchedule);
    var i = filteredJames.length;
    document.body.innerHTML = "<button onclick=makeSchedule() class='button1'> Populate Matches </button>      <form action='./index.html'>    <button type='submit' class='backBtn'>Back</button></form><br>";
    for (matchNumber = previousMatch; matchNumber <= i; matchNumber++) { //* For loop for creating the schedule
        createAlliance(matchNumber); //* Runs createAlliance to print match participants on the button
        matchInfo = ("<button class='scheduleButton'  onclick =  'startMatchScouting(" + matchNumber + "," + JSON.stringify(filteredJames[matchNumber - 1].alliances) + ")'> Match " + matchNumber + ": <p style='color:#C1666B'>" + redAlliance + "</p> vs <p style='color:#4357AD'>" + blueAlliance + "</p></button>"); //*Defines matchInfo as the text of a button
        btn = document.createElement("DIV"); //* creates a button
        btn.innerHTML = matchInfo; //* Writes the matchInfo onto the button
        document.body.appendChild(btn);
    };
    localStorage.setItem("blueAllianceData", JSON.stringify(filteredJames));
};

function createAlliance(matchNumber) { //* This function creates each and concatenates each alliance number into a string
    var i = matchNumber - 1
    blueAlliance = filteredJames[i].alliances.blue.team_keys[0].slice(3) + " | " + filteredJames[i].alliances.blue.team_keys[1].slice(3) + " | " + filteredJames[i].alliances.blue.team_keys[2].slice(3);
    redAlliance = filteredJames[i].alliances.red.team_keys[0].slice(3) + " | " + filteredJames[i].alliances.red.team_keys[1].slice(3) + " | " + filteredJames[i].alliances.red.team_keys[2].slice(3);
}

function openPage(pageName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "";
    };

    document.getElementById(pageName).style.display = "block";
}

function filterSchedule(qual) {
    return qual.comp_level == "qm";
}

function startMatchScouting(mNumber, alliances) {
    localStorage.setItem("num", mNumber);
    localStorage.setItem("alliances", JSON.stringify(alliances));
    location.replace("./matchScouting.html");
};

/* -- creates the matchscouting data array -- */
function createMatchArray() {

}


//back button for match scouting. Graham
function backConfirm() {
    if (confirm("Are you sure?") == true) {
        location.replace('./schedule.html')
    }
}
function startMatchScouting(mNumber, alliances) {
    localStorage.setItem("num", mNumber);
    localStorage.setItem("alliances", JSON.stringify(alliances));
    location.replace("./matchScouting.html");
};

function loadSchedule() {
    James = JSON.parse(localStorage.getItem("blueAllianceData"));
    James.sort(sortById("match_number")); //* Sorts the output of the of kidnap by match number
    for (matchNumber = 1; matchNumber <= James.length; matchNumber++) { //* For loop for creating the schedule
        createAlliance(matchNumber); //* Runs createAlliance to print match participants on the button
        matchInfo = ("<button onclick =  'startMatchScouting(" + matchNumber + "," +
            JSON.stringify(James[matchNumber - 1].alliances) + ")'> Match " + matchNumber +
            ": <p style='color:red'>" + redAlliance + "</p> | vs | <p style='color:blue'>" + blueAlliance +
            "</p></button>"); //*Defines matchInfo as the text of a button
        btn = document.createElement("BUTTON"); //* creates a button
        btn.innerHTML = matchInfo; //* Writes the matchInfo onto the button
        document.body.appendChild(btn);
    };
}

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
        matchInfo = ("<button class='scheduleButton'  onclick =  'startMatchScouting(" + matchNumber + "," + JSON.stringify(filteredJames[matchNumber - 1].alliances) + ")'> Match " + matchNumber + " <br>________________ <p style='color:#C80815'>" + redAlliance + "</p> vs <p style='color:#0075b3'>" + blueAlliance + "</p></button>"); //*Defines matchInfo as the text of a button
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
        matchInfo = ("<button class='scheduleButton'  onclick =  'startMatchScouting(" + matchNumber + "," + JSON.stringify(filteredJames[matchNumber - 1].alliances) + ")'> Match " + matchNumber + " <br>________________ <p style='color:#C80815'>" + redAlliance + "</p> vs <p style='color:#0075b3'>" + blueAlliance + "</p></button>"); //*Defines matchInfo as the text of a button
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
        matchInfo = ("<button class='scheduleButton'  onclick =  'startMatchScouting(" + matchNumber + "," + JSON.stringify(filteredJames[matchNumber - 1].alliances) + ")'> Match " + matchNumber + " <br>________________ <p style='color:#C80815'>" + redAlliance + "</p> vs <p style='color:#0075b3'>" + blueAlliance + "</p></button>"); //*Defines matchInfo as the text of a button
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

function filterSchedule(qual) {
    return qual.comp_level == "qm";
}
//TODO make buttons and add to screen
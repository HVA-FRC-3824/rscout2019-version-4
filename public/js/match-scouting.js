var matchInfo; teamNumber; data; redAlliance; blueAlliance;  //Initialize varibles

function createAlliance(i) {  //This function creates each and concatenates each alliance
    redAlliance = James[i].alliances.blue.team_keys[0].slice(3) + " | " + James[i].alliances.blue.team_keys[1].slice(3) + " | " + James[i].alliances.blue.team_keys[2].slice(3);
    blueAlliance = James[i].alliances.red.team_keys[0].slice(3) + " | " + James[i].alliances.red.team_keys[1].slice(3) + " | " + James[i].alliances.red.team_keys[2].slice(3);
}


function makeSchedule() {  //Makes schedule
    kidnap("/event/2019hop/matches");  //Runs kidnap with the specified url
    James.sort(sortById("match_number"));  //Sorts the output of the of kidnap by match number 
    var i, k  //Initialize varibles
    for (i = 0, k = 0; i < James.length; i++) {  //For loop for creating the schedule
        if (James[i].comp_level == "qm") {  //If statement to exclude playoff matches from schedule
            k++;
            createAlliance(i); //Runs create alliance to print match participants on the button
            matchInfo = ("Match " + k + ": " + redAlliance + " | vs | " + blueAlliance);  //Defines matchInfo as the text of the button
            btn = document.createElement("BUTTON");  //creates a button
            btn.innerHTML = matchInfo;  //Writes the matchInfo onto the button
            document.body.appendChild(btn);  //Adds each button to the page
        };
    };
};

/* ------------for real-scouting------------- */
function openPage(pageName, color) {
    // Hide all elements with class="tabcontent" by default
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "";
    }

    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "purple";
    }

    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";

    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;

    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();
}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click(); {

}

/* ------------for real-scouting------------- */

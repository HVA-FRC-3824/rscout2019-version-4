var matchInfo; teamNumber; data; redAlliance; blueAlliance; 

function createAlliance(i) {
    redAlliance = James[i].alliances.blue.team_keys[0].slice(3) + " | " + James[i].alliances.blue.team_keys[1].slice(3) + " | " + James[i].alliances.blue.team_keys[2].slice(3);
    blueAlliance = James[i].alliances.red.team_keys[0].slice(3) + " | " + James[i].alliances.red.team_keys[1].slice(3) + " | " + James[i].alliances.red.team_keys[2].slice(3);
}3
//Makes schedule
function makeSchedule() {
    kidnap("/event/2019hop/matches");
    James.sort(sortById("match_number"));
    var i, k;
    for (i = 0, k = 0; i < James.length; i++) {
        if (James[i].comp_level == "qm") {
            k++;
            createAlliance(i);
            matchInfo = ("Match " + k + ": " + redAlliance + " | vs | " + blueAlliance);
            btn = document.createElement("BUTTON");
            btn.innerHTML = matchInfo;
            document.body.appendChild(btn);
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

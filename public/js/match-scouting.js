var matchNumber; teamNumber; James; data;

//pulls the matches from TBA
data = kidnap('/event/2019hop/matches');
//sorts matches
//data.sort(sortById("match_number"));
//function to sort matches
var sortById = function(prop) {
    return function(x, y) {
        return ((x[prop] === y[prop]) ? 0 : ((x[prop] > y[prop]) ? 1 : -1));
    };
};

//Makes schedule
function makeSchedule() {
    console.log();
    /*var i;
    for (i = 0; i < James.length; i++){
        if (James.comp_level == "qm") {
            console.log(James[i]);
            matchNumber = ("Match " + i);
            btn = document.createElement("BUTTON");
            btn.innerHTML = matchNumber;
            document.body.appendChild(btn);
        };
    };
    */
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


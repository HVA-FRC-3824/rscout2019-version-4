var matchNumber; teamNumber; data;

//Makes schedule
function makeSchedule() {
    kidnap("/event/2019hop/matches")
    James.sort(sortById("match_number"))
    //console.log(James);
    var i;
    for (i = 0; i < James.length; i++){
        if (James[i].comp_level == "qm") {
            matchNumber = ("Match " + i);
            btn = document.createElement("BUTTON");
            btn.innerHTML = matchNumber;
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

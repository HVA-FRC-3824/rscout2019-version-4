var matchNumber;
var teamNumber;
function getMatchInfo() {
    matchNumber = prompt("Enter Match number: ");
    teamNumber = prompt("Team Number: ");
    location.replace("./real-scouting.html");
}

function openPage(pageName, color) {
    // Hide all elements with class="tabcontent" by default */
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
document.getElementById("defaultOpen").click();

/*jshint sub:true*/

/* from analytics.js originally */
function kidnap(newUrl) {
    //These variables store the data returned from the functions.
    var baseUrl = 'https://www.thebluealliance.com/api/v3'; //base TBA url
    //This ajax code requests data from The Blue Alliance
    console.log("it is kidnapped at this moment");
    $.ajax({
        url: baseUrl + newUrl, //This is the url we send to TBA which requests our data
        headers: {
            'X-TBA-Auth-Key': 'hhfIK2pSbl02wS0OQ2m593517wGnrSmjYdJ9C6jbMfKkvZtnoiB8qUWc0X0WwpC6' //This header contains Evan Boswell's Blue Alliance authentication key, this will need to be changed for years beyond 2019/2020
        },
        method: 'GET', //This defines the method we use to pull data from Blue Alliance, in this instance we are using GET
        dataType: 'json', //This defines what format the data that is pulled from Blue Alliance will be in, in this instance we are pulling Json files
        success: function(data) { //this function logs our data in the console if it is successfully pulled
            James = data;
            return James;
        },
    });
    $(document).ajaxError(function() { //this function alerts an error if the pulling the data is unsuccessful
        alert("An error occurred!");
    });
}


function pullData() { //this function pulls the team number that the user entered
    robotNum = document.getElementById("robotNum").value; //sets the var robotNum equal to the robot number to be positive
    firebase.database().ref('/heatMap/' + robotNum).once("value", gotData); //acutally gets the data from firebase, then runs gotData()
    //console.log(robotNum);
}

/* from & for preview.js */
function pullPreviewData(robotNumber) {
    firebase.database().ref('/matchScouting/' + robotNumber).once("value", gotMatchData);
    //gets the json from firebase of a certain robot
}

//orginially from analytics.js
var sortById = function(prop) {
    return function(x, y) {
        return ((x[prop] === y[prop]) ? 0 : ((x[prop] > y[prop]) ? 1 : -1));
    };
};


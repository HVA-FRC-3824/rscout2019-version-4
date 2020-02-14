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
        success: function(data) { //this function logs our data in the console if it is successfully pulled
            James = data;
            return James;
        },
    });
    $(document).ajaxError(function() { //this function alerts an error if the pulling the data is unsuccessful
        alert("An error occurred!");
    });
};

var sortById = function(prop) {
    return function(x, y) {
        return ((x[prop] === y[prop]) ? 0 : ((x[prop] > y[prop]) ? 1 : -1));
    };
};

/*
function pullFirebase() {
    
    return firebase.database().ref('/heatMap/' + robotNum).once('value')
};
*/

function displayText() {
    var robotNum = document.getElementById("robotNum").value;
    firebase.database().ref('/heatMap/' + robotNum).on("value", gotData);
}

function pullNames(matches) {
    matches = matches[0];
    var robotNum = document.getElementById("robotNum").value;
    firebase.database().ref('/heatMap/' + '/' + robotNum + '/' + matches).on("value", setsVar);
}

function setsVar(data) {
    var names = data.val();
    var namesArray = Object.keys(names);
    console.log(names);
    console.log(namesArray);
    console.log("this function is acutally running")
}

function gotData(data) {
    var robotData = data.val();
    console.log(robotData);
    var matches = Object.keys(robotData);
    pullNames(matches);
    /*var robotString = JSON.stringify(robotData);*/
    console.log(robotString);
    console.log(matches);
    console.log(testMatch);
    console.log(scoutName);
    /*
    var slicedMatches = [];
    for (var i=0; i<4)
    */
}
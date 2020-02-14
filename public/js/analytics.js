var robotNum = "";
matches = [];
currentName = [];
match9 = 9;

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
    robotNum = document.getElementById("robotNum").value;
    firebase.database().ref('/heatMap/' + robotNum).on("value", gotData);
}

function pullNames(matches) {
    match9 = matches[0];
    firebase.database().ref('/heatMap/' + robotNum + '/' + match9).on("value", setsName);
}

function setsName(data) {
    var names = data.val();
    var namesArray = Object.keys(names);
    console.log(names);
    console.log(namesArray);
    pullCoords(namesArray);
}

function pullCoords(namesArray) {
    currentName = namesArray[0];
    firebase.database().ref('/heatMap/' + robotNum + '/' + match9 + '/' + currentName).on("value", setsCoords);
}

function setsCoords(data) {
    var xy = data.val();
    var xyArray = Object.keys(xy);
    console.log(xyArray);
    xyCoords(xyArray);
}

function xyCoords(xyArray) {
    xautoarray = xyArray[0];
    firebase.database().ref('/heatMap/' + robotNum + '/' + match9 + '/' + currentName + '/' + xautoarray).on("value", coordArrays);
}

function coordArrays(data) {
    var currentCoords = data.val();
    console.log(currentCoords);
}

function gotData(data) {
    var robotData = data.val();
    //console.log(robotData);
    matches = Object.keys(robotData);
    pullNames(matches);
    console.log(matches);

    /*var robotString = JSON.stringify(robotData);*/
    //console.log(robotString);

    //console.log(testMatch);
    //console.log(scoutName);
    /*
    var slicedMatches = [];
    for (var i=0; i<4)
    */
}
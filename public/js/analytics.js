var robotNum = "";
currentName = [];
currentMatch = 0;
matches = [];
pulledDataFirebase = 0;
otherName = true;

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

function displayText() {
    robotNum = document.getElementById("robotNum").value;
    firebase.database().ref('/heatMap/' + robotNum).once("value", gotData(testvar));
}

function gotData(data) {
    var robotData = data.val();
    matches = Object.keys(robotData);
    console.log(matches);
    pullNames(matches);
}

function pullNames(matches) {
    while (otherName) {
        console.log(matches.length);
        currentMatch = matches[i];
        firebase.database().ref('/heatMap/' + robotNum + '/' + currentMatch).once("value", setsName);
        otherName = false;
        console.log("preventsSkips is now " + otherName + " and pullNames is waiting for it to finish");
    }
}


function setsName(data) {
    var names = data.val();
    var namesArray = Object.keys(names);
    //console.log(names);
    //console.log(namesArray);
    pullCoords(namesArray);
}

function pullCoords(namesArray) {
    for (i = 0; i < namesArray.length; i++) {
        currentName = namesArray[i];
        firebase.database().ref('/heatMap/' + robotNum + '/' + currentMatch + '/' + currentName).once("value", setsCoords);
        console.log("namesArray");
        for (j = 0; j < 5000; j++) {
            console.log("Loading...");
        }
    }
}

function setsCoords(data) {
    if (pulledDataFirebase <= namesArray.length) {
        ++pulledDataFirebase;
        console.log(robotNum, currentMatch, currentName);
        var xy = data.val();
        console.log(xy);
    }

    if (pulledDataFirebase > namesArray.length) {
        pulledDataFirebase = 0;

    }
    //var xyArray = Object.keys(xy);
    //console.log(xyArray);
    //xyCoords(xyArray);
}

/*function xyCoords(xyArray) {
    for (i = 0; i < xyArray.length; i++) {
        currentCoordArray = xyArray[i];
        firebase.database().ref('/heatMap/' + robotNum + '/' + currentMatch + '/' + currentName + '/' + currentCoordArray).once("value", coordArrays);
        console.log("xyArray");
        for (j = 0; j < 5000; j++) {
            console.log("Loading...");
        }
    }
}*/

/*function coordArrays(data) {
    var currentCoords = data.val();
    //console.log(currentCoords);
}*/
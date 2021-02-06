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
        async: false,
        success: function(data) { //this function logs our data in the console if it is successfully pulled
            James = data;
            console.log(James);
            return James;

        },
    });
    $(document).ajaxError(function() { //this function alerts an error if the pulling the data is unsuccessful
        alert("An error occurred!");
    });

    //console.log(James);
};

var sortById = function(prop) {
    return function(x, y) {
        return ((x[prop] === y[prop]) ? 0 : ((x[prop] > y[prop]) ? 1 : -1));
    };
};
/*
function sortTBAData() {
    //sorts through the tba data
    kidnap("/event/2020scmb/matches"); //* Runs kidnap with the specified url
    James.sort(sortById("match_number")); //* Sorts the output of the of kidnap by match number
    filteredJames = James.filter(filterSchedule);
    var len = filteredJames.length;
    for (let i = 0; i < len; i++) {
        //loop through at grab all thems data 
        currentMatchData = filteredJames[i];
        b1 = currentMatchData.alliances.blue.team_keys[0];
        b1Num = b1.slice(3, 8);
        b2 = currentMatchData.alliances.blue.team_keys[1];
        b2Num = b2.slice(3, 8);
        b3 = currentMatchData.alliances.blue.team_keys[2];
        b3Num = b3.slice(3, 8);
        r1 = currentMatchData.alliances.red.team_keys[0];
        r1Num = b1.slice(3, 8);
        r2 = currentMatchData.alliances.red.team_keys[1];
        r2Num = b1.slice(3, 8);
        r3 = currentMatchData.alliances.red.team_keys[2];
        r3Num = b1.slice(3, 8);

        b1MovedOffAutoLine = currentMatchData.score_breakdown.blue.initLineRobot1;
        b2MovedOffAutoLine = currentMatchData.score_breakdown.blue.initLineRobot2;
        b3MovedOffAutoLine = currentMatchData.score_breakdown.blue.initLineRobot3;
        r1MovedOffAutoLine = currentMatchData.score_breakdown.red.initLineRobot1;
        r2MovedOffAutoLine = currentMatchData.score_breakdown.red.initLineRobot2;
        r3MovedOffAutoLine = currentMatchData.score_breakdown.red.initLineRobot3;

        b1Climbed = currentMatchData.score_breakdown.blue.endgameRobot1;
        b2Climbed = currentMatchData.score_breakdown.blue.endgameRobot2;
        b3Climbed = currentMatchData.score_breakdown.blue.endgameRobot3;
        r1Climbed = currentMatchData.score_breakdown.red.endgameRobot1;
        r2Climbed = currentMatchData.score_breakdown.red.endgameRobot2;
        r3Climbed = currentMatchData.score_breakdown.red.endgameRobot3;

        /*console.log(b1Num + ": " + b1MovedOffAutoLine + ", " + b1Climbed);
        console.log(b2Num + ": " + b1MovedOffAutoLine + ", " + b1Climbed);
        console.log(b3Num + ": " + b1MovedOffAutoLine + ", " + b1Climbed);
        console.log(r1Num + ": " + b1MovedOffAutoLine + ", " + b1Climbed);
        console.log(r2Num + ": " + b1MovedOffAutoLine + ", " + b1Climbed);
        console.log(r3Num + ": " + b1MovedOffAutoLine + ", " + b1Climbed);
        */
/*

    }
    console.log(filteredJames);
}

function filterSchedule(qual) {
    return qual.comp_level == "qm";
}
*/
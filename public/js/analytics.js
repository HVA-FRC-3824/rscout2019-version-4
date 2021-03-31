/*var database = firebase.database();
var isLocal = false;


function getTeams() {
    firebase.database().ref('/matchScouting/').once("value", sortTeams);
}

function sortTeams(data) {
    var avgAutoArr = [
        ['', 0]
    ];
    var robotsData = data.val(); //takes the value of the data
    localStorage.setItem("allData", JSON.stringify(robotsData));
    jsonRobotsData = JSON.stringify(robotsData);
    robotsParsed = JSON.parse(jsonRobotsData);
    robotNums = Object.keys(robotsParsed);

    //console.log(matchNums.length);

    for (i = 0; i < robotNums.length; i++) {
        robot = robotNums[i];
        var matchNums = [];
        if (typeof Object.keys(robotsParsed[robot]) === "number") {
            matchNums.push(Object.keys(robotsParsed[robot]));
        } else {
            matchNums = Object.keys(robotsParsed[robot]);
        }
        var names = [];
        for (j = 0; j < matchNums.length; j++) {
            match = matchNums[j];
            names = Object.keys(robotsParsed[robot][match]);
            var autoScoreSum = 0;
            for (k = 0; k < names.length; k++) {
                n = names[k];
                try {
                    autoScore = (robotsParsed[robot][match][n]["autoScore"]);
                } catch (e) {
                    console.log(e);
                }

                if (autoScore != undefined) {
                    autoScoreSum += autoScore;
                }

                //get accuracy etc.

                //push scores to master array
                //sort array

            }
        }

        var avgAutoScore = autoScoreSum / names.length;
        avgAutoArr.push([robot, avgAutoScore]);
        document.getElementById("avgAutoScore1").innerHTML = avgAutoArr[0][0];

    }
    console.log(avgAutoArr);
}

//to get auto avg score, take all auto score data points and divde by scouters that scouted that robot*/
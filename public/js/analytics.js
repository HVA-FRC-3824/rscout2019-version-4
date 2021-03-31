/*var database = firebase.database();

function getTeams() {
    firebase.database().ref('/matchScouting/').once("value", sortTeams);
}

function sortTeams(data) {
    var robotsData = data.val(); //takes the value of the data
    jsonRobotsData = JSON.stringify(robotsData);
    robotsParsed = JSON.parse(jsonRobotsData);
    robotNums = Object.keys(robotsParsed);

    //console.log(matchNums.length);

    for (i = 0; i < robotNums.length; i++) {
        robot = robotNums[i];
        matchNums = Object.keys(robotsParsed[robot]);
        for (j = 0; j < matchNums.length; j++) {
            match = matchNums[i];
            names = Object.keys(robotsParsed[robot][match]);
            for (k = 0; k < names.length; k++) {
                n = names[i];
                autoScore = (matchParsed[currMatch][currName]["autoScore"]);
                //push scores to master array
                //sort array

            }
        }
    }

}

//to get auto avg score, take all auto score data points and divde by scouters that scouted that robot
*/
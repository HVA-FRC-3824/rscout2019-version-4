var teamNum;
var weight;
var driveTrain;
var robotData;

function createPitArrary() {
    teamNum = prompt("Team Number")
    weight = prompt("Robot Weight")
    driveTrain = prompt("Drive Train")
    robotData = { teamNum: teamNum, weight: weight, driveTrain: driveTrain };
    addPitToFirebase(robotData);
}

function addPitToFirebase(data) {
    console.log(data);
    console.log(teamNum);
    firebase.database().ref('pitScouting/' + data.teamNum).set({
        "Weight": data.weight,
        "DriveTrain": data.driveTrain,
    });
}
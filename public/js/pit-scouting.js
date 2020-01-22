var teamNum;
var weight;
var driveTrain;
var robotData;

function button() {
    teamNum = prompt("Team Number")
    weight = prompt("Robot Weight")
    driveTrain = prompt("Drive Train")
    robotData = {teamNum: teamNum, weight: weight, driveTrain: driveTrain};
    addPitToFirebase(robotData);
}

function addPitToFirebase(data) {
    console.log(data);
    firebase.database().ref('pitscouting/' + data.teamNum).set({
        "Weight": data.weight,
        "DriveTrain": data.driveTrain,
    });
}

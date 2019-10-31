var teamNum;
var weight;
var driveTrain;
var robotData;

function button() {
    teamNum = prompt("Team Number")
    weight = prompt("Robot Weight")
    driveTrain = prompt("Drive Train")

}

function dutton() {
    var robotData = [teamNum, weight, driveTrain];
    console.log(robotData);

}
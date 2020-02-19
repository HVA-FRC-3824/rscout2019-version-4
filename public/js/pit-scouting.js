var teamNum;
var weight;
var driveTrain;
var robotData;

function createPitArrary() {
    teamNum = document.getElementById("robotNum").value;
    weight = document.getElementById("robotWeight").value;
    driveTrain = document.getElementById("driveTrain").value;
    climbType = document.getElementById("climbType").value;
    robotLang = document.getElementById("robotLang").value;
    robotData = { teamNum: teamNum, weight: weight, driveTrain: driveTrain, climbType: climbType, robotLang: robotLang};
    addPitToFirebase(robotData);
}

function addPitToFirebase(data) {
    if(confirm("Are you sure?") == true) {
        firebase.database().ref('pitScouting/' + data.teamNum).set({
            "Weight": data.weight,
            "DriveTrain": data.driveTrain,
            "Robot Language": data.robotLang,
            "Climb Type": data.climbType,
        });
    }
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}


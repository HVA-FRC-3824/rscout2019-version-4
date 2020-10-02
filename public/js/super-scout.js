var notes = "";
matchNum = "";
superName = "";

function createSuperArray() {
    matchNum = document.getElementById("superMatch").value;
    notes = document.getElementById("superNotes").value;
    superName = document.getElementById("superName").value;
    if (matchNum == '') {
        matchNum = "noMatch";
    }
    if (superName == '') {
        superName = "noName";
    }
    var superData = { matchNum: matchNum, notes: notes, superName: superName };
    pushSuper(superData);
}

function pushSuper(data) {
    firebase.database().ref('superScout/' + data.matchNum + '/' + data.superName).set({
        "notes": data.notes,
    });
}
//===================pit scouting============================================//














//=========================firebase login stuff===============================//
function checkUN() {
    var user = firebase.auth().currentUser;
    if (user == null) {
        location.replace('./index.html');
    }
}
//check if the user is logged in
function checkUN() {
    var user = firebase.auth().currentUser;
    if (user == null) {
        location.replace('./index.html');
    }
}
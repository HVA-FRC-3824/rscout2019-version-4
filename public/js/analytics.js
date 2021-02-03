//check if the user is logged in
function checkUN() {
    var user = firebase.auth().currentUser;
    if (user == null) {
        location.replace('./index.html');
    }
}

//TODO pull tba data from local storage

//TODO parse blue alliance data

//TODO Pull firebase data

//TODO filter blue alliance data and store it here in a variable

//TODO sort everything into variables

//TODO Show the data we want on screen
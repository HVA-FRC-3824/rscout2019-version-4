// ====================== for the menu onclick buttons ============================= //
var hashedPass = "";
var user = "";

function openModal() {
    document.getElementById('loginModal').style.display = "block";

}

function closeModal() {
    document.getElementById('loginModal').style.display = "none";
}

function signupModal() {
    document.getElementById('modal-content').innerHTML = "<p class=\"modal-text\" >username:</p><input type='text_box' id='username'><p class=\"modal-text\">Password:</p><input type='text_box' id='password'><button onclick='signUp()'>Sign-up</button>";
}

function signinModal() {
    document.getElementById('modal-content').innerHTML = "<p class=\"modal-text\" >username:</p><input type='text_box' id='username'><p>Password:</p><input type='text_box' id='password'><button>Sign in</button>";
}

function signUp() {
    //get data from input box 
    user = document.getElementById("username").value;
    hashedPass = stringToHash(document.getElementById("password").value);
    console.log(user + " " + hashedPass);
    user = "/" + user + "/";
    firebase.database().ref('/logins' + user + "password").once("value", passCheck);
}

function stringToHash(str) {
    var hash = 0;
    if (str.length == 0) return hash;

    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    return hash;
}

function passCheck(pass) {
    if (pass.val() == "") {
        firebase.database().ref('/logins' + user + "password").set(hashedPass);
    };
}
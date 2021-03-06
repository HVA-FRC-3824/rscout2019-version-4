// ====================== for the menu onclick buttons ============================= //
var hashedPass = "";
var user = "";
var page = "";

function openModal(pageToGo) {
    if (getCookie("role") == "user" || getCookie("role") == "admin") {
        try {
            if (JSON.parse(localStorage.getItem("userInfo")).role == getCookie("role")) {
                console.log("Login Success");
                location.replace(pageToGo);
            } else {
                console.log("EEE");
            }
        } catch (e) {
            console.log(e);
        }
    }
    if (localStorage.getItem("userInfo") != null && localStorage.getItem("userInfo") != "null") {
        page = pageToGo;
        firebase.database().ref('/logins' + localStorage.getItem("username")).once("value", checkLocalUser);
    } else {
        document.getElementById('loginModal').style.display = "block";
    };
}

function closeModal() {
    document.getElementById('loginModal').style.display = "none";
}

function signUp() {
    //get data from input box 
    user = document.getElementById("username").value;
    hashedPass = stringToHash(document.getElementById("password").value);
    //console.log(user + " " + hashedPass);
    user = "/" + user + "/";
    firebase.database().ref('/logins' + user).once("value", login);

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

function login(pass) {
    if (pass.val() == null) {
        console.log("User not found");
    } else {
        if (pass.val().password == "") {
            firebase.database().ref('/logins' + user + "password").set(hashedPass);
        } else if (pass.val().password == hashedPass) {
            console.log("Login Success");
            localStorage.setItem("username", user);
            //console.log(pass.val());
            localStorage.setItem("userInfo", JSON.stringify(pass.val()));
            location.replace("index.html");
        } else {
            console.log("Incorrect Password");
        }
    }
}

function checkLocalUser(userData) {
    localUser = JSON.parse(localStorage.getItem("userInfo"));
    if (JSON.stringify(localUser) == JSON.stringify(userData.val())) {
        console.log("login success");
        document.cookie = "username=" + localStorage.getItem("username") + ";";
        document.cookie = "role=" + localUser.role + ";";
        location.replace(page);
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
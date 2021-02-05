/*
const signupForm = document.querySelector('#signup-form');
*/

// ======================== signup form funtions ========================== //
/*
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //getting the user's info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        (
            console.log(cred)

        )
    });
})
*/

// ====================== for the menu onclick buttons ============================= //

function openModal(page) {
    location.replace("./" + page);
    /*
    if (firebase.auth().currentUser != null) {
        location.replace("./" + page);
    } else {
        document.getElementById('firebaseLogin').style.display = "block";
    }
    */
}

function closeModal() {
    document.getElementById('firebaseLogin').style.display = "none";
}

/*
function signupModal() {
    document.getElementById('modal-content').innerHTML = "<p class=\"modal-text\" >Email:</p><input type=\"text_box\"><p class=\"modal-text\">Password:</p><input type=\"text_box\"><button>Sign up</button>";
}

function signinModal() {
    document.getElementById('modal-content').innerHTML = "<p class=\"modal-text\" >Email:</p><input type=\"text_box\"><p>Password:</p><input type=\"text_box\"><button>Sign in</button>";
}
*/
/*
let firebaseAppDefined = false

setInterval(() => {
    if (!firebaseAppDefined) {
        if (firebase.app()) {
            var ui = new firebaseui.auth.AuthUI(firebase.auth());
            var uiConfig = {
                callbacks: {
                    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                        // User successfully signed in.
                        // Return type determines whether we continue the redirect automatically
                        // or whether we leave that to developer to handle.
                        return true;
                    },
                    uiShown: function() {
                        // The widget is rendered.
                        // Hide the loader.
                        document.getElementById('loader').style.display = 'none';
                    }
                },
                // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
                signInFlow: 'popup',
                signInSuccessUrl: 'index.html',
                signInOptions: [
                    // Leave the lines as is for the providers you want to offer your users.
                    //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                    //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                    //firebase.auth.GithubAuthProvider.PROVIDER_ID,
                    firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    //firebase.auth.PhoneAuthProvider.PROVIDER_ID
                ],
                // Terms of service url.
                tosUrl: '404.html',
                // Privacy policy url.
                privacyPolicyUrl: '404.html'
            };
            ui.start('#firebaseui-auth-container', uiConfig);

            firebaseAppDefined = true
        }
    }
}, 100)

function checkUser() {
    var user = firebase.auth().currentUser;
    if (user.displayName == null) {
        console.log("no user")
    } else {
        console.log(user.displayName)
    }
    localStorage.setItem("username", user);
}
*/
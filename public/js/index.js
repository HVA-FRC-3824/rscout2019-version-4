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

function openModal() {
    document.getElementById('loginModal').style.display = "block";
    
}

function closeModal() {
    document.getElementById('loginModal').style.display = "none";
}

function signupModal() {
    document.getElementById('modal-content').innerHTML = "<p class=\"modal-text\" >Email:</p><input type=\"text_box\"><p class=\"modal-text\">Password:</p><input type=\"text_box\"><button>Sign-up</button>";
}

function signinModal() {
    document.getElementById('modal-content').innerHTML = "<p class=\"modal-text\" >Email:</p><input type=\"text_box\"><p>Password:</p><input type=\"text_box\"><button>Sign in</button>";
}
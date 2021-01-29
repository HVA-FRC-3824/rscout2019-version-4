const signupForm = document.querySelector('#signup-form');
const auth = firebase.auth();
const db = firebase.firestore();


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
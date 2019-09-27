document.addEventListener('DOMContentLoaded', function () {
    // // ??????????????????????????????????????????????????????????????
    // // The Firebase SDK is initialized and available here!
    // Set the configuration for your app
    // TODO: Replace with your project's config object
    var config = {
        apiKey: "AIzaSyDt_RPu8QtD_o-ciZbF13dzuIpxvVeti8Q ",
        authDomain: "https://firescout2019.firebaseapp.com",
        databaseURL: "https://firescout2019.firebaseio.com",
    };
    //firebase.initializeApp(config);
    // Get a reference to the database service
    var database = firebase.database();

    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    //
    // // ??????????????????????????????????????????????????????????????

    try {
        let app = firebase.app();
        let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
        document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;
    } catch (e) {
        console.error(e);
        document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
    }
});
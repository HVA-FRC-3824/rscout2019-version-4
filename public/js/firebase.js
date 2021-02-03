document.addEventListener('DOMContentLoaded', function() {
    // // ??????????????????????????????????????????????????????????????
    ////The Firebase SDK is initialized and available here!
    // Set the configuration for your app
    // TODO: Replace with your project's config object
    var config = {
        apiKey: "AIzaSyDt_RPu8QtD_o-ciZbF13dzuIpxvVeti8Q ",
        authDomain: "https://firescout2019.firebaseapp.com",
        databaseURL: "https://firescout2019.firebaseio.com",
    };
    //firebase.initializeApp(config);
    // Get a reference to the database service
    const database = firebase.database();
    const auth = firebase.auth();
    const db = firebase.firestore();

    try {
        let app = firebase.app();
        let features = ['auth', 'databse', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
        if (document.URL.includes("index.html")) {
            document.getElementById('load').innerHTML = `Created by Evan Boswell, Nick Broyles, Max Howell, Grant Johnson, Weston Agreda, Graham Boswell. Firebase SDK loaded with ${features.join(', ')}`;
        }

    } catch (e) {
        console.error(e);
        if (document.URL.includes("index.html")) {
            document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
        }
    }
});
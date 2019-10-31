var James = null
function kidnap(url) {
    //These variables store the data returned from the functions.
    var a = 'https://www.thebluealliance.com/api/v3'; //base TBA url
    var b = url;
    //This ajax code requests data from The Blue Alliance
    $.ajax({
        url: a + b, //This is the url we send to TBA which requests our data
        headers: {
            'X-TBA-Auth-Key': 'hhfIK2pSbl02wS0OQ2m593517wGnrSmjYdJ9C6jbMfKkvZtnoiB8qUWc0X0WwpC6' //This header contains Evan Boswell's Blue Alliance authentication key, this will need to be changed for years beyond 2019/2020
        },
        method: 'GET', //This defines the method we use to pull data from Blue Alliance, in this instance we are using GET
        dataType: 'json', //This defines what format the data that is pulled from Blue Alliance will be in, in this instance we are pulling Json files
        success: function (data) { //this function logs our data in the console if it is successfully pulled
            data.sort(sortById("match_number"));
            James = data
            console.log(James);
            return James
        },
    });
    $(document).ajaxError(function() { //this function alerts an error if the pulling the data is unsuccessful
        alert("An error occurred!");
    });
};

var sortById = function(prop) {
    return function(x, y) {
        return ((x[prop] === y[prop]) ? 0 : ((x[prop] > y[prop]) ? 1 : -1));
    };
};

function tbaData() {
    firebase.database().ref('firescout2019/').set({
        teams: James
    });
    alert("Data may or may not have been pushed");
};

function makeSchedule() {
    for (let i = 0; i < kidnap("/event/2019hop/matches"); i++){
        if (James.comp_level = "qm") {
            console.log(James[i]);
        };
    };
};

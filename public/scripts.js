var James = null
function kidnap() {
    //These functions ask the user for information that will be used in The Blue Alliance url
    function getCategory() {
        var urlCategory = prompt("Enter Category: team, teams, or event");
        if (urlCategory != "") { //This statement causes the function to return a null value if there is no input from the user
            return "/" + urlCategory
        } else {
            return ""
        }
    }

    function getID() {
        var urlID = prompt("Enter team number or event id:");
        if (urlID != "") { //This statement causes the function to return a null value if there is no input from the user
            return "/" + urlID
        } else {
            return ""
        }
    }

    function getOutput() {
        var urlOutput = prompt("Enter your output: awards, simple, teams");
        if (urlOutput != "") { //This statement causes the function to return a null value if there is no input from the user
            return "/" + urlOutput
        } else {
            return ""
        }
    }

    //These variables store the data returned from the functions.
    var a = 'https://www.thebluealliance.com/api/v3'; //base TBA url
    var b = getCategory();
    var c = getID();
    var d = getOutput();
    //var e = '/awards'

    //This function concatenates the variables with Blue Alliance's base url.
    function url() {
        var u = a + b + c + d
        return u
    }
    //This ajax code requests data from The Blue Alliance
    $.ajax({
        url: url(), //This is the url we send to TBA which requests our data
        headers: {
            'X-TBA-Auth-Key': 'hhfIK2pSbl02wS0OQ2m593517wGnrSmjYdJ9C6jbMfKkvZtnoiB8qUWc0X0WwpC6' //This header contains Evan Boswell's Blue Alliance authentication key, this will need to be changed for years beyond 2019/2020
        },
        method: 'GET', //This defines the method we use to pull data from Blue Alliance, in this instance we are using GET
        dataType: 'json', //This defines what format the data that is pulled from Blue Alliance will be in, in this instance we are pulling Json files
        success: function (data) { //this function logs our data in the console if it is successfully pulled
            James = data
            console.log(JSON.stringify(James))
            return James
        }
    });
    $(document).ajaxError(function() { //this function alerts an error if the pulling the data is unsuccessful
        alert("An error occurred!");
    });
}

function tbaData() {
    firebase.database().ref('firescout2019/').set({
        teams: James
    })
}
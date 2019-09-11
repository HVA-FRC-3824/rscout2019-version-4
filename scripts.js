function getCategory() {
    var Category = prompt("Enter Category: team, teams, or event");
    return Category
}
function getTeam() {
    var team = prompt("Enter team number or event id:");
    return "/frc" + team
}

var a = 'https://www.thebluealliance.com/api/v3/';
var b = getCategory();
var c = getTeam();
var d = '/awards';
//var e = '/awards';

function url() {
    var u = a + b + c + d
    return u
}
$.ajax({
    url: url(),
    headers: {
        'X-TBA-Auth-Key': 'hhfIK2pSbl02wS0OQ2m593517wGnrSmjYdJ9C6jbMfKkvZtnoiB8qUWc0X0WwpC6'
    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        console.log(data);
    }
});
$(document).ajaxError(function () {
    alert("An error occurred!");
});
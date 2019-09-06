
const app = document.getElementById('root');


$.ajax({
    url: "https://www.thebluealliance.com/api/v3/event/" + reqEventKey + "/teams/simple",
    type: 'GET',
    dataType: 'json',
    headers: {
        'X-TBA-Auth-Key': 'jFZAiivEncdZC24mwCGqWnImGrGJdwVRBP9m0djqwY25I42B1NpocGJikWZSu0CZ'
    },
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: function (result) {
        for (var i = 0; i < result.length; i++) {
            addTeam(result[i], reqEventKey);
        }
    },
    error: function (error) {
        console.log(error);
        logger.crit(error);
    }
});

var request = new XMLHttpRequest();
request.setRequestHeader('X-Auth', 'hhfIK2pSbl02wS0OQ2m593517wGnrSmjYdJ9C6jbMfKkvZtnoiB8qUWc0X0WwpC6');
request.open('GET', 'https://www.thebluealliance.com/api/v3/status');
request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status == 200) {
        alert('pong');
    } else {
        alert('F');
    }
}
request.onerror = function () {
    alert('Request Failed');
}

request.send();
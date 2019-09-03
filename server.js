'use strict';
var http = require('http').Server(app);
var port = process.env.PORT || 1337;
var app = require('express')();
var url = require('url');
const Sequelize = require('sequelize');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);


http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    var serverEventKey = '2018tnkn';

    //Sets up JSON parsing for incoming data
    var bodyParser = require('body-parser');
    app.use(bodyParser.json({ limit: '50mb' })); // support json encoded bodies
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    //Simple server ping. Returns pong
    app.get('/ping', function (req, res) {
        logger.info('Server pinged');
        res.send('pong');
    });

    //Sends back an HTML file to add an event to the DB
    app.get('/addEvent', function (req, res) {
        //var reqEventKey = req.body.eventKey;
        var reqEventKey = serverEventKey;
        console.log('requesting event ' + reqEventKey);
        logger.info('Requested event ' + reqEventKey);
        addEvent(reqEventKey);
        $.ajax({
            url: "https://www.thebluealliance.com/api/v3/event/" + reqEventKey + "/teams/simple",
            type: 'GET',
            dataType: 'json',
            headers: {
                'X-TBA-Auth-Key': 'hhfIK2pSbl02wS0OQ2m593517wGnrSmjYdJ9C6jbMfKkvZtnoiB8qUWc0X0WwpC6'
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
        $.ajax({
            url: "https://www.thebluealliance.com/api/v3/event/" + reqEventKey + "/matches/simple",
            type: 'GET',
            dataType: 'json',
            headers: {
                'X-TBA-Auth-Key': 'hhfIK2pSbl02wS0OQ2m593517wGnrSmjYdJ9C6jbMfKkvZtnoiB8qUWc0X0WwpC6'
            },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    if (!result[i].key.substr(reqEventKey.length + 1).includes('f')) {
                        addMatch(result[i], reqEventKey);
                    }
                }
            },
            error: function (error) {
                console.log(error);
                logger.crit(error);
            }
        });
        res.sendStatus(200);
    });

    app.get('/populateMatches', function (req, res) {
        $.ajax({
            url: "https://www.thebluealliance.com/api/v3/event/" + serverEventKey + "/matches/simple",
            type: 'GET',
            dataType: 'json',
            headers: {
                'X-TBA-Auth-Key': 'hhfIK2pSbl02wS0OQ2m593517wGnrSmjYdJ9C6jbMfKkvZtnoiB8qUWc0X0WwpC6'
            },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    ;
                    if (!result[i].key.substr(serverEventKey.length + 1).includes('f')) {
                        addMatch(result[i], serverEventKey);
                    }
                }
                res.sendStatus(200);
            },
            error: function (error) {
                console.log(error);
                logger.crit(error);
            }
        });
    });

    app.get('/populateTeamMatches', function (req, res) {
        console.log('filling');
        var matches = []
        Match.all().then(result => {
            matches = result;
            console.log('got matches');
        });
        var teams = []
        Team.all().then(result => {
            teams = result;
            for (var i = 0; i < teams.length; i++) {
                console.log('looping');
                var matchNumbers = [];
                for (var j = 0; j < matches.length; j++) {
                    if (matches[j].teamNumbers.includes(teams[i].teamNumber)) {
                        matchNumbers.push(matches[j].matchNumber);
                        console.log(matches[j].matchNumber);
                    }
                }
                console.log(matchNumbers);
                Team.update({ matchNumbers: JSON.stringify(matchNumbers) }, { where: { id: result[i].id } });
            }
        });
        res.sendStatus(200);
    });

    //Resets the server's event key
    app.post('/setServerEventKey', function (req, res) {
        serverEventKey = req.body.key;
        logger.info('Reset server event key');
    });

    //Pulls out team information
    app.get('/teams', function (req, res) {
        logger.info('Recieved teams request');
        Team.all().then(teams => {
            for (var i = 0; i < teams.length; i++) {
                teams[i].matchNumbers = JSON.parse(teams[i].matchNumbers);
            }
            JSONresult = JSON.stringify(teams);
            console.log(JSONresult);
            res.send(JSONresult);
            logger.info('Sent teams info');
        });
    });

    //Pulls out match schedule information
    app.get('/schedule', function (req, res) {
        logger.info('Recieved getMatchSchedInfo request');
        Match.all().then(matches => {
            for (var i = 0; i < matches.length; i++) {
                matches[i].teamNumbers = JSON.parse(matches[i].teamNumbers);
            }
            JSONresult = JSON.stringify(matches);
            console.log(JSONresult);
            res.send(JSONresult);
            logger.info('Sent match sched info');
        });
    });

    //Pulls out pit data
    app.get('/pitData', function (req, res) {
        logger.info('Recieved get pit data request');
        TeamPitData.all().then(result => {
            JSONresult = JSON.stringify(result);
            console.log(JSONresult);
            res.send(JSONresult);
            logger.info('Sent pit data');
        });
    });

    //Pulls out match data
    app.get('/matchData', function (req, res) {
        logger.info('Recieved get match data request');

        var data = { teamMatchData: [], superMatchData: [] };
        //Pulls out team match data
        TeamMatchData.all().then(result => {
            data.teamMatchData = result;
            //Need to remove instance of cubesBeneathThis    
            for (var i = 0; i < data.teamMatchData.length; i++) {
                data.teamMatchData[i].autoCubeEvents = JSON.parse(data.teamMatchData[i].autoCubeEvents);
                data.teamMatchData[i].teleopCubeEvents = JSON.parse(data.teamMatchData[i].teleopCubeEvents);
            }
            logger.info('Recieved get super data request');
        });
        //Pulls out super match data
        SuperMatchData.all().then(result => {
            data.superMatchData = result;
            res.send(data);
            logger.info('Sent super data');

        });
    });

    //Pulls out match data
    app.get('/teamMatchData', function (req, res) {
        logger.info('Recieved get match data request');
        //Pulls out match data
        TeamMatchData.all().then(result => {
            JSONresult = JSON.stringify(result);
            console.log(JSONresult);
            res.send(JSONresult);
            logger.info('Sent match data');
        });
    });

    //Pulls out match data for a specified match and team
    app.get('/superMatchData', function (req, res) {
        logger.info('Recieved get super data request');
        //Pulls out match data
        SuperMatchData.all().then(result => {
            JSONresult = JSON.stringify(result);
            console.log(JSONresult);
            res.send(JSONresult);
            logger.info('Sent super data');
        });
    });

    //Inserts match data to the DB
    app.post('/updateTeamMatchData', function (req, res) {
        logger.info('Recieved insertMatchData');
        var requestData = req.body;
        console.log('InsertingMatchData');
        console.log(requestData);

        var alreadyExists = false
        TeamMatchData.all().then(result => {
            for (var i = 0; i < result.length; i++) {
                if (result[i].teamNumber == requestData.teamNumber && result[i].matchNumber == requestData.matchNumber) {
                    alreadyExists = true;
                }
            }
            if (alreadyExists) {
                console.log('Already exists. Deleting row');
                TeamMatchData.destroy({ where: { teamNumber: requestData.teamNumber, matchNumber: requestData.matchNumber } });
            }
            //Remove instances of Cubes
            addMatchData(res, serverEventKey, requestData.teamNumber, requestData.matchNumber, requestData.scoutName, requestData.startedWithCube, requestData.startLocationX, requestData.startLocationY, requestData.crossedAutoLine, requestData.autoCubeEvents, requestData.teleopCubeEvents, requestData.climbTime, requestData.climbStatus, requestData.climbMethod, requestData.fouls, requestData.techFouls, requestData.yellowCard, requestData.redCard, requestData.noShow, requestData.dq, requestData.notes);
            res.sendStatus(200);
        });
    });

    //Inserts match data to the DB
    app.post('/updateTeamMatchDataList', function (req, res) {
        console.log('Got team match data list request');
        logger.info('Recieved insertMatchData');
        var reqDataArr = req.body;
        TeamMatchData.all().then(result => {
            for (var j = 0; j < reqDataArr.length; j++) {

                var requestData = reqDataArr[j];
                var alreadyExists = false;
                for (var i = 0; i < result.length; i++) {
                    if (result[i].teamNumber == requestData.teamNumber && result[i].matchNumber == requestData.matchNumber) {
                        alreadyExists = true;
                    }
                }
                if (alreadyExists) {
                    console.log('Already exists. Deleting row');
                    TeamMatchData.destroy({ where: { teamNumber: requestData.teamNumber, matchNumber: requestData.matchNumber } });
                }
                // Remove Instances of Cubes
                addMatchData(res, serverEventKey, requestData.teamNumber, requestData.matchNumber, requestData.scoutName, requestData.startedWithCube, requestData.startLocationX, requestData.startLocationY, requestData.crossedAutoLine, requestData.autoCubeEvents, requestData.teleopCubeEvents, requestData.climbTime, requestData.climbStatus, requestData.climbMethod, requestData.fouls, requestData.techFouls, requestData.yellowCard, requestData.redCard, requestData.noShow, requestData.dq, requestData.notes);
            }
        });
        res.sendStatus(200);
    });

    //Inserts match data to the DB and factors it into the averages
    app.post('/updateSuperMatchData', function (req, res) {
        logger.info('Recieved insertSuperData');
        var requestData = req.body;
        console.log('InsertingSuperData');
        console.log(requestData);

        var alreadyExists = false

        SuperMatchData.all().then(result => {
            for (var i = 0; i < result.length; i++) {
                if (result[i].matchNumber == requestData.matchNumber) {
                    alreadyExists = true;
                }
            }
            if (alreadyExists) {
                console.log('Already exists. Deleting row');
                SuperMatchData.destroy({ where: { matchNumber: requestData.matchNumber } });
            }
            addSuperMatchData(res, serverEventKey, requestData.matchNumber, requestData.scoutName, requestData.forceRed, requestData.levitateRed, requestData.boostRed, requestData.forceBlue, requestData.levitateBlue, requestData.boostBlue, requestData.notes);
            res.sendStatus(200);
        });
    });
    //Inserts multiple Match data to the DB
    app.post('/updateSuperMatchDataList', function (req, res) {
        logger.info('Recieved insertSuperDataList');
        //Puts in pit data
        var reqDataArr = req.body;
        console.log(reqDataArr);
        for (var i = 0; i < reqDataArr.length; i++) {
            var requestData = reqDataArr[i];
            console.log('InsertingSuperData');
            var alreadyExists = false

            SuperMatchData.all().then(result => {
                for (var i = 0; i < result.length; i++) {
                    if (result[i].matchNumber == requestData.matchNumber) {
                        alreadyExists = true;
                    }
                }
                if (alreadyExists) {
                    console.log('Already exists. Deleting row');
                    SuperMatchData.destroy({ where: { matchNumber: requestData.matchNumber } });
                }
                // Remove instances of PowerUps
                addSuperMatchData(res, serverEventKey, requestData.matchNumber, requestData.scoutName, requestData.forceRed, requestData.levitateRed, requestData.boostRed, requestData.forceBlue, requestData.levitateBlue, requestData.boostBlue, requestData.notes);
            });
        }
        res.sendStatus(200);
    });

    //Inserts pit data to the DB
    app.post('/updateTeamPitDataList', function (req, res) {
        logger.info('Recieved insertPitData');
        //Puts in pit data
        var requestData = req.body;
        console.log('InsertingPitData');
        console.log(requestData);
        for (var i = 0; i < requestData.length; i++) {
            addPitData(res, serverEventKey, requestData[i].teamNumber, requestData[i].robotWidth, requestData[i].robotLength, requestData[i].robotHeight, requestData[i].robotWeight, requestData[i].driveTrain, requestData[i].programmingLanguage, requestData[i].notes);
        }
        res.sendStatus(200);
    });

    //Filter strings to avoid SQL injection
    function mysql_real_escape_string(str) {
        return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
            switch (char) {
                case "\0":
                    return "\\0";
                case "\x08":
                    return "\\b";
                case "\x09":
                    return "\\t";
                case "\x1a":
                    return "\\z";
                case "\n":
                    return "\\n";
                case "\r":
                    return "\\r";
                case "\"":
                case "'":
                case "\\":
                case "%":
                    return "\\" + char; // prepends a backslash to backslash, percent,
                // and double/single quotes
            };
        });
    };

    //Insert Match Data
    //Remove Instances of Cubes
    function addMatchData(res, eventKey, teamNumber, matchNumber, scoutName, startedWithCube, startLocationX, startLocationY, autoCrossed, autoEvents, teleopEvents, climbTime, climbingState, climbingMethod, fouls, techFouls, yellowCard, redCard, noShow, DQ, notes) {
        if (teamNumber == null) {
            return;
            res.sendStatus(400);
        }

        TeamMatchData.create({
            teamNumber: teamNumber,
            matchNumber: matchNumber,
            scoutName: scoutName,
            startedWithCube: startedWithCube,
            startLocationX: startLocationX,
            startLocationY: startLocationY,
            crossedAutoLine: autoCrossed,
            autoCubeEvents: JSON.stringify(autoEvents),
            teleopCubeEvents: JSON.stringify(teleopEvents),
            climbTime: climbTime,
            climbStatus: climbingState,
            climbMethod: climbingMethod,
            fouls: fouls,
            techFouls: techFouls,
            yellowCard: yellowCard,
            redCard: redCard,
            DQ: DQ,
            noShow: noShow,
            notes: notes
        });
    };

    //Insert Super Match Data
    //Remove PowerUp instances
    function addSuperMatchData(res, eventKey, matchNumber, scoutName, forceRed, levitateRed, boostRed, forceBlue, levitateBlue, boostBlue, notes) {
        SuperMatchData.create({
            matchNumber: matchNumber,
            scoutName: scoutName,
            forceRed: forceRed,
            levitateRed: levitateRed,
            boostRed: boostRed,
            forceBlue: forceBlue,
            levitateBlue: levitateBlue,
            boostBlue: boostBlue,
            notes: notes
        });
    };

    //Insert Pit Data
    function addPitData(res, eventKey, teamNumber, width, length, height, weight, driveTrain, programmingLanguage, notes) {
        TeamPitData.create({
            teamNumber: teamNumber,
            width: width,
            length: length,
            height: height,
            weight: weight,
            driveTrain: driveTrain,
            programmingLanguage: programmingLanguage,
            notes: notes
            //Should Probably add more stuff to this
        })
    };

    //Listen on port 3824
    var server = http.listen(1337, "0.0.0.0", function (err) {
        if (err) {
            logger.fatal(err);
            throw err;
        } else {
            console.log('rScout started. Listening on *:3824');
        }
    });

    //Create empty tables for event
    function addEvent(eventKey) {
        Team.sync({ force: true }).then(() => {
            //Table created
        });
        Match.sync({ force: true }).then(() => {
            //Table created
        });
        TeamMatchData.sync({ force: true }).then(() => {
            //Table created
        });
        SuperMatchData.sync({ force: true }).then(() => {
            //Table created
        });
        TeamPitData.sync({ force: true }).then(() => {
            //Table created
        });
    }

    //Converts boolean to tinyint
    function convertBool(bool) {
        if (bool) {
            return 1;
        } else {
            return 0;
        }
    }

    //Converts boolean to tinyint
    function convertBoolBack(bool) {
        if (bool == 1) {
            return true;
        } else {
            return false;
        }
    }

    //Fill teams table
    function addTeam(teamInfo, eventKey) {
        Team.create({
            teamNumber: teamInfo.team_number,
            nickname: teamInfo.nickname,
            matchNumbers: JSON.stringify([])
        });
    }

    //Fill matchSchedule table
    function addMatch(matchInfo, eventKey) {

        var matchNumber = matchInfo.key.substr(eventKey.length + 3);

        var red1 = matchInfo.alliances.red.team_keys[0].substr(3);
        var red2 = matchInfo.alliances.red.team_keys[1].substr(3);
        var red3 = matchInfo.alliances.red.team_keys[2].substr(3);
        var blue1 = matchInfo.alliances.blue.team_keys[0].substr(3);
        var blue2 = matchInfo.alliances.blue.team_keys[1].substr(3);
        var blue3 = matchInfo.alliances.blue.team_keys[2].substr(3);

        Match.create({
            matchNumber: matchNumber,
            teamNumbers: JSON.stringify([red1, red2, red3, blue1, blue2, blue3])
        });

}).listen(port);
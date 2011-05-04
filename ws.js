var ws = require("websocket-server");

var port = 8080;
var server = ws.createServer();
var players = [];

server.addListener("connection", function(connection) {
    var myRegistrationFunction = 
    connection.addListener("message", function (message) {
        json = JSON.parse(message);
        if (json.player) {
            handleNewPlayer(json.player,connection);
        } else if (json.screen) {
            handleNewScreen(json.screen,connection);
        } else if (json.answer) {
            handleNewAnswer(json.answer,connection);
        }  else if (json.newQuestion) {
            handleNewQuestion(json.newQuestion,connection);
        } else if (json.wait) {
            handleWait(json.wait,connection);
        } else if (json.reset) {
              handleReset(json.reset,connection);
          } else  {
            handleError(json,connection);
        }
    });
});

function handleReset(reset,connection) {
    connection.broadcast('{"reset":"true"}');
    players = [];
    console.log("reseting !")
}

function handleNewPlayer(player,connection) {
    players.push(player);
    connection.broadcast('{"player":"'+json.player + '"}');
    console.log("<< Registration of player : " + json.player);
    if (isGameReady()) {
        connection.broadcast('{"ready":"'+ players.length + '"}');
        console.log("Game is ready, we got 4 players");
    } else {
        connection.broadcast('{"wait":"'+ players.length + '"}');
        console.log("we got "+ players.length +" players");
    }
}

function handleNewQuestion(newQuestion,connection) {
    console.log("new question asked !! what is " + newQuestion)
    connection.broadcast('{"newQuestion":"'+newQuestion+'"}');
}

function handleNewScreen(screen,connection) {
    console.log("<< Registration of Screen : " + json.screen);            
}

function handleNewAnswer(answer,connection) {
    console.log("<< Answer of player : " + json.answer);
    connection.broadcast('{"answer":"'+json.answer+'"}');    
}

function handleWait(answer,connection) {
    console.log("<< Wait");
    connection.broadcast('{"wait":"'+ players.length + '"}');    
}

function handleError(json,connection) {
    console.log(">> Bad Message : " + json);
}

function isGameReady() {
    return players.length == 4;
}

server.listen(port);

console.log("Server started on port " + port);
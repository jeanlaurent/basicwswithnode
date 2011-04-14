var ws = require("websocket-server");

var port = 8080;
var server = ws.createServer();

server.addListener("connection", function(connection) {
    var data;
    var myRegistrationFunction = 
    connection.addListener("message", function (message) {
        json = JSON.parse(message);
        if (json.player) {
            connection.broadcast('{"player":"'+json.player + '"}');
            console.log("Registration of player : " + json.player);            
        } else if (json.screen) {
            console.log("Registration of Screen : " + json.screen);            
        } else if (json.answer) {
            console.log("Answer of player : " + json.answer);
            // simulate new question...
            connection.send('{"newQuestion":"true"}');
        } else  {
            console.log("Bad Message : " + message);
        }
    });
});


server.listen(port);

console.log("Clock Server started on port " + port);
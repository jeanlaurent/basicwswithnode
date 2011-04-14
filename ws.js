var ws = require("websocket-server");

var port = 8080;
var server = ws.createServer();

function update() {
    server.broadcast(new Date());
    setTimeout(update, 1000);
};


server.addListener("connection", function(connection) {
    var data;
    connection.send("Hello " + connection.id);
    connection.send("There is " + server.manager.length + " clock watcher right now.");
    var myRegistrationFunction = 
    connection.addListener("message", function (message) {
        json = JSON.parse(message);
        if (json.player) {
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


setTimeout(update, 1000);
server.listen(port);

console.log("Clock Server started on port " + port);
var ws = require("websocket-server");

var port = 8080;
var server = ws.createServer();

function update() {
    server.broadcast(new Date());
    setTimeout(update, 1000);
};

setTimeout(update, 1000);

server.addListener("connection", function(connection) {
    connection.send("Hello " + connection.id);
    connection.send("There is " + server.manager.length + " clock watcher right now.");
});


server.listen(port);
console.log("Clock Server started on port " + port);
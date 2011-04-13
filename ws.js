var ws = require("websocket-server");

var server = ws.createServer();
var connections=[];

function update() {
    if (connections.length) {
        connections.forEach(function(connection) {
            connection.send(new Date());
        });
    }
    setTimeout(update, 1000);
}

setTimeout(update, 1000);

server.addListener("connection", function(connection) {
    connection.send("hello");
    connections.push(connection); 
  });

server.listen(8080);
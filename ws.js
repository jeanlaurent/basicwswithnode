var ws = require("websocket-server");

var server = ws.createServer();
var connectionIds=[];

function update() {
    if (connectionIds.length) {
        connectionIds.forEach(function(id) {
            server.send(id,new Date());
        });
    }
    setTimeout(update, 1000);
}

setTimeout(update, 1000);

server.addListener("connection", function(connection) {
    connection.send("hello " + connection.id);
    connectionIds.push(connection.id); 
  });

server.listen(8080);
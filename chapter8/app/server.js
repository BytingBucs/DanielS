var http = require("http"),
    port = process.env.PORT || 3000;

var server = http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("The server is listening on port " + port);
    res.end("Hello from Cloud Foundry!");
});

server.listen(port);

console.log("Server listening on port " + port);

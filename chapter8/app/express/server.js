var express = require("express"),
    http = require("http"),
    app = express(),
    port = process.env.PORT || 3000;

// Create our Express-powered HTTP server
http.createServer(app).listen(port);
console.log("Express is listening on port " + port);

// set up our routes
app.get("/hello", function (req, res) {
    res.send("Hello World!");
});

app.get("/goodbye", function (req, res) {
    res.send("Goodbye World!");
});

// set up the root route
app.get("/", function (req, res) {
    res.send("This is the root route!");
});
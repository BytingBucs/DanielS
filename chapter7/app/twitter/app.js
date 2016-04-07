var express = require("express"),
    http = require("http"),
    tweetCounts = require("./tweet_counter.js"),
    app = express();

app.use(express.static(__dirname + "/client"));

// Create our Express-powered HTTP server
http.createServer(app).listen(3000);

// set up our routes
app.get("/counts.json", function (req, res) {
	res.json(tweetCounts);
});
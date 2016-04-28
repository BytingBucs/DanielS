var express = require("express"),
	http = require("http"),
	app,
	port = 3000;

app = express();

app.use(express.static(__dirname + "/client"));

app.listen(port);
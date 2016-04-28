var express = require("express"),
	http = require("http"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	app = express(),
	services;
	mongoUrl = "mongodb://localhost/Test";

app.use(express.static(__dirname + "/client"));

app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.VCAP_SERVICES) {
	services = JSON.parse(process.env.VCAP_SERVICES);
	mongoUrl = services["mongolab"][0].credentials.uri;
}

mongoose.connect(mongoUrl);

http.createServer(app).listen(process.env.PORT || 3000);

app.post("/test", function (req, res) {
	res.json({"message": "Success"});
});
var User = require("../models/user.js"),
	mongoose = require("mongoose");

var UsersController = {};

User.find({}, function (err, result) {
	if (err !== null) {
		console.log("SOMETHING WENT HORRIBLY WRONG");
		console.log(err);
	} else if (result.length === 0) {
		console.log("Creating Example User...");
		var exampleUser = new User({"username":"semmy"});
		exampleUser.save(function (err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log("Saved Example User");
			}
		});
	}
});

UsersController.index = function (req, res) {
	console.log("index action called");
	res.sendStatus(200);
};

UsersController.show = function (req, res) {
	console.log("show action called");
	User.find({"username":req.params.username}, function (err, result) {
		if (err) {
			console.log(err);
			res.sendStatus(500, err);
		} else if (result.length !== 0) {
			res.sendfile("../client/index.html");
		} else {
			res.sendStatus(404);
		}
	});
};

UsersController.create = function (req, res) {
	console.log("create action called");
	res.sendStatus(200);
};

UsersController.update = function (req, res) {
	console.log("update action called");
	res.sendStatus(200);
};

UsersController.destroy = function (req, res) {
	console.log("destroy action called");
	res.sendStatus(200);
};

module.exports = UsersController;
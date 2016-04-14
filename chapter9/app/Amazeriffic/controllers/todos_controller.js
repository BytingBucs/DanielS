var ToDo = require("../models/todo.js"),
	mongoose = require("mongoose"),
	ToDosController = {};

ToDosController.index = function (req, res) {
	var username = req.params.username || null,
		respondWithToDos;

	respondWithToDos = function (query) {
		console.log(ToDo);
		ToDo.find(query, function (err, toDos) {
			if (err !== null) {
				res.json(500, err);
			} else {
				res.json(200, toDos);
			}
		});
	};

	if (username !== null) {
		User.find({"username":username}, function (err, result) {
			if (err !== null) {
				res.json(500, err);
			} else if (result.length === 0) {
				res.sendStatus(404);
			} else {
				respondWithToDos({"owner": result[0].id});
			}
		});
	} else {
		respondWithToDos({});
	}
};

ToDosController.create = function (req, res) {
	var username = req.params.username || null,
		newToDo = new ToDo({"description":req.body.description,
		"tags":req.body.tags});
	User.find({"username":username}, function (err, result) {
		if (err) {
			res.sendStatus(500);
		} else {
			if (result.length === 0) {
				newToDo.owner = null;
			} else {
				newToDo.owner = result[0]._id;
			}
			newToDo.save(function (err, result) {
				console.log(result);
				if (err !== null) {
					console.log(err);
					res.json(500, err);
				} else {
					res.json(200, result);
				}
			});
		}
	});
};

ToDosController.show = function (req, res) {
	var id = req.params.id;
	ToDo.find({"_id":id}, function (err, todo) {
		if (err !== null) {
			res.json(500, err);
		} else {
			if (todo.length > 0) {
				res.json(200, todo[0]);
			} else {
				res.sendStatus(404);
			}
		}
	});
};

ToDosController.update = function (req, res) {
	console.log("update action called");
	res.sendStatus(200);
};

ToDosController.destroy = function (req, res) {
	console.log("destroy action called");
	res.sendStatus(200);
};

module.exports = ToDosController;
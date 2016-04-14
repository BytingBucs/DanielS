var ToDo = require("../models/todo.js"),
	User = require("../models/user.js"),
	ToDosController = {};

ToDosController.index = function (req, res) {
	var username = req.params.username || null,
		respondWithToDos;

	respondWithToDos = function (query) {
		ToDo.find(query, function (err, toDos) {
			if (err !== null) {
				res.status(500).json(err);
			} else {
				res.status(200).json(toDos);
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
					res.status(500).json(err);
				} else {
					res.status(200).json(result);
				}
			});
		}
	});
};

ToDosController.show = function (req, res) {
	var id = req.params.id;
	ToDo.find({"_id":id}, function (err, todo) {
		if (err !== null) {
			res.status(500).json(err);
		} else {
			if (todo.length > 0) {
				res.status(200).json(todo[0]);
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
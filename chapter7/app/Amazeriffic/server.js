var express = require("express"),
	http = require("http"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	app = express();
	/* toDos = [
		{
			"description" : "Get groceries",
			"tags" : ["shopping", "chores"]
		},
		{
			"description" : "Make up some new ToDos",
			"tags" : ["writing", "work"]
		},
		{
			"description" : "Prep for Monday's class",
			"tags" : ["work", "teaching"]
		},
		{
			"description" : "Answer emails",
			"tags" : ["work"]
		},
		{
			"description" : "Take Gracie to the park",
			"tags" : ["chores", "pets"]
		},
		{
			"description" : "Finish writing this book",
			"tags" : ["writing", "work"]
		}
	]; */

app.use(express.static(__dirname + "/client"));

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/amazeriffic');

var ToDoSchema = mongoose.Schema({
	description: String,
	tags: [String]
});

var ToDo = mongoose.model("ToDo", ToDoSchema);

http.createServer(app).listen(3000);

app.get("/todos.json", function (req, res) {
	ToDo.find({}, function (err, toDos) {
		res.json(toDos);
	});
});

app.post("/todos", function (req, res) {
	console.log(req.body);
	var newToDo = new ToDo({"description":req.body.description,
	"tags":req.body.tags});
	newToDo.save(function (err, result) {
		if (err !== null) {
			console.log(err);
			res.send("ERROR");
		} else {
			ToDo.find({}, function (err, result) {
				if (err !== null) {
					res.send("ERROR")
				}
				res.json(result);
			});
		}
	});
});
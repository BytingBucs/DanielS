var express = require("express"),
	http = require("http"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	toDosController = require("./controllers/todos_controller.js"),
	usersController = require("./controllers/users_controller.js"),
	app = express(),
	services,
	mongoUrl = "mongodb://localhost/amazeriffic";

app.use(express.static(__dirname + "/client"));

app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.VCAP_SERVICES) {
	services = JSON.parse(process.env.VCAP_SERVICES);
	mongoUrl = services["mongolab"][0].credentials.uri;
}

mongoose.connect(mongoUrl);

http.createServer(app).listen(process.env.PORT || 3000);

app.get("/todos.json", toDosController.index);
app.get("/todos/:id", toDosController.show);
app.post("/todos", toDosController.create);
app.get("/users.json", usersController.index);
app.post("/users", usersController.create);
app.get("/users/:username", usersController.show);
app.put("/users/:username", usersController.update);
app.delete("/users/:username", usersController.destroy);
app.get("/users/:username/todos.json", toDosController.index);
app.post("/users/:username/todos", toDosController.create);
app.put("/users/:username/todos/:id", toDosController.update);
app.delete("/users/:username/todos/:id", toDosController.destroy);
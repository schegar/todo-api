var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get("/", function(req, res) {
	res.send("Todo API Root");
});

// GET /todos
app.get("/todos", function (req, res){
	res.send(todos);
});

// GET /todos/:id
app.get("/todos/:id", function (req, res) {
	var todoId = parseInt(req.params.id);
	var matchedTodo;
	todos.forEach(function (todo) {
		if (todoId === todo.id) {
			matchedTodo = todo;
		}
	});
	if (matchedTodo) {		
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
});

app.post("/todos", function (req, res) {
	var todo = req.body;

	todo.id = todoNextId++;

	todos.push(todo);

	res.json(todos);
});

app.listen(PORT, function() {
	console.log("Express listening on port " + PORT + " !");
});
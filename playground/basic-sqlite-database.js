var Sequelize = require("sequelize");
var sequelize = new Sequelize(undefined, undefined, undefined,  {
	"dialect": "sqlite",
	"storage": __dirname + "/basic-sqlite-database.sqlite"
});

var Todo = sequelize.define("todo", {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

sequelize.sync().then(function () {
	console.log("Everythin is synced");

	Todo.findAll({
		where: {
			id: 2
		}
	}).then(function (todos) {
		if (todos.length > 0) {
			todos.forEach(function (todo) {
				console.log(todo.toJSON());
			});
		} else {
			console.log("No todos found");
		}
	})

	// Todo.create({
	// 	description: "Take out trash"
	// }).then(function (todo) {
	// 	return Todo.create({
	// 		description: "Walk the dog"
	// 	})
	// }).then(function () {
	// 	//return Todo.findById(1)
	// 	return Todo.findAll({
	// 		where: {
	// 			description: {
	// 				$like: "%walk%"
	// 			}
	// 		}
	// 	});
	// }).then(function (todos) {
	// 	if (todos) {
	// 		todos.forEach(function (todo) {
	// 			console.log(todo.toJSON());
	// 		});
	// 		//console.log(todos.toJSON());
	// 	} else {
	// 		console.log("no todo found");
	// 	}
	// }).catch(function (e) {
	// 	console.log(e);
	// })
});
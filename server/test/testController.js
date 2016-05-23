// Call the packages
// =============================================================================
var Todo    = require('./testModel');

// Methods
// =============================================================================

module.exports = function(app) {

// Todos GET
	app.get('/todos', function (req, res) {
		// use mongoose to get all todos in the database
		Todo.find(function (err, todos) {
			if (err)
				res.send(err);
			res.json(todos); // return all todos in JSON format
		});
	});

// Todos POST
	app.post('/api/todos', function (req, res) {
		Todo.create({
			text : req.body.text,
			done : false
		}, function (err, todo) {
			if (err)
				res.send(err);
			// get and return all the todos after you update another
			Todo.find(function (err, todos) {
				if (err)
					res.send(err);
				res.json(todos);
			});
		});
	});

// Todos DELETE
	app.delete('/api/todos/:todo_id', function (req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function (err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you update another
			Todo.find(function (err, todos) {
				if (err)
					res.send(err);
				res.json(todos);
			});
		});
	});

};
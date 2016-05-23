// Call the packages
// =============================================================================
var Comments    = require('./model');

// Methods
// =============================================================================

module.exports = function(app) {

	// GET all comments from one order
	app.get('/api/comments/:id', function (req, res) {
		Comments.find({order : req.params.id}, function (err, comments) {
			if (err)
				res.send(err);
			res.json(comments);
		});
	});

	// Comments POST
	app.post('/api/comments', function (req, res) {
		Comments.create(req.body, function (err, comment) {
			if (err)
				res.send(err);
			res.json(comment);
		});
	});

	// Comments DELETE
	app.delete('/api/comments/:id', function (req, res) {

		Comments.remove({
			_id : req.params.id
		}, function (err, comment) {
			console.log("delete comment :", err, req.params.id);
			if (err)
				res.send(err);
			res.json(comment);
		});
	});

};
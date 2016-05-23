// Call the packages
// =============================================================================
var Users    = require('./model');

// Methods
// =============================================================================

module.exports = function(app) {

// Comments GET
	app.get('/api/users', function (req, res) {
		// use mongoose to get all comments in the database
		Users.find(function (err, users) {
			if (err)
				res.send(err);
			res.json(users);
		});
	});

	// Users PUT
	app.put('/api/users/:id', function(req,res) {
		req.body.updated = new Date();
		Users.update({'_id': req.params.id}, req.body, {}, function (err, result) {
			if (err || result == 0) {
				if (err) {
					res.status(404).send(err);
				} else {
					res.status(404).send('There is no configuration which match the id: ' + a);
				}
			} else {
				res.status(200).send('ok');
			}
		});
	});

	// Users POST
	app.post('/api/infinite/users', function(req, res) {
		Users.find().sort({role : 1, created : -1}).skip(req.body.userTotalCount).limit(3).exec(function(err, newlyLoadedUsers) {
			if (err) {
				console.log("error");
			}
			else {
				var copy = [];
				newlyLoadedUsers.forEach(function(user, key){
					copy[key] = {
						created: user.created,
						updated: user.updated,
						username: user.username,
						email: user.email,
						role: user.role,
						id: user._id
					};
					if(key === newlyLoadedUsers.length - 1) {
						res.json(copy);
					}
				});
			}
		});
	});

// Articles GET ONE
	app.get('/api/users/:id', function (req, res) {
		Users.findById(req.params.id, function (err, user) {
			if (err)
				res.send(err);
			res.status(200).json(user);
		});
	});
	// Articles GET ONE
	app.get('/api/username/:username', function (req, res) {
		Users.find({'username': req.params.username}, function (err, user) {
			if (err)
				res.send(err);
			res.status(200).json(user[0]);
		});
	});

// Comments POST
	app.post('/api/users', function (req, res) {
		Users.create(req.body, function (err, user) {
			if (err)
				res.send(err);
			// get and return all the comments after you update another
			Users.find(function (err, users) {
				if (err)
					res.send(err);
				res.json(users);
			});
		});
	});

// Comments DELETE
	app.delete('/api/users/:id', function (req, res) {
		Users.remove({
			_id : req.params.id
		}, function (err, users) {
			if (err)
				res.send(err);
			res.status(200).send('ok');
		});
	});

};

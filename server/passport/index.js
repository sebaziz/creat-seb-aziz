// Call the packages
// =============================================================================
var User    = require('../users/model');


// Methods
// =============================================================================

module.exports = function(app, passport) {
	app.post('/api/user/register', function(req, res) {
		var user = {
			username: req.body.username,
			email: req.body.email,
			access: 0,
			role: 1
		};
		User.register(new User(user), req.body.password, function(err, account) {
			if (err) {
				return res.status(500).json({err: err});
			}
			passport.authenticate('local')(req, res, function () {
				return res.status(200).json({status: 'Registration successful!'});
			});
		});
	});

	app.post('/api/user/login', function(req, res, next) {
		passport.authenticate('local', function(err, user, info) {
			if (err) {
				return res.status(500).json({err: err});
			}
			if (!user) {
				return res.status(401).json({err: info});
			}
			req.logIn(user, function(err) {
				if (err) {
					return res.status(500).json({err: 'Could not log in user'});
				}
				res.status(200).json({
					id: user._id, username: user.username, role: user.role, access: user.access,
					created: user.created, updated: user.updated
				});
			});
		})(req, res, next);
	});

	app.get('/api/user/logout', function(req, res) {
		req.logout();
		res.status(200).json({status: 'Bye!'});
	});

};
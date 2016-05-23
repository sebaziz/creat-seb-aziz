// Call the packages
// =============================================================================
var Orders  = require('./model');
var Users    = require('../users/model');

// Methods
// =============================================================================

module.exports = function(app) {

	// TEST UPLOAD
	app.post('/api/upload', function(req, res) {
		// use mongoose to get all orders in the database
		console.log('req.body : ', req.body);
		res.status(200).send('ok');
	});

	// Orders GET
	app.get('/api/orders', function(req, res) {
		// use mongoose to get all orders in the database
		Orders.find(function(err, orders) {
			if (err)
				res.send(err);
			res.json(orders); // return all orders in JSON format
		});
	});

	// Orders GET ONE
	app.get('/api/orders/:id', function(req, res) {
		Orders.findById(req.params.id, function(err, order) {
			if (err)
				res.send(err);
			res.json(order);
		});
	});

	// Orders GET ONE by author
	app.get('/api/orders/user/:id', function(req, res) {
		Orders.find({'author': req.params.id}, function(err, orders) {
			if (err) {
				res.send(err);
			}
			else {
				var copy = [];
				orders.forEach(function(order, key){
					Users.findById(order.updater, function (err, updater) {
						if (err) {
							res.send(err);
						}
						copy[key] = {
							created: order.created,
							updated: order.updated,
							title: order.title,
							content: order.content,
							img: order.img,
							id: order._id,
							author: order.author,
							updater: {
								id: updater._id,
								username: updater.username
							}
						};
						if(key === orders.length - 1) {
							res.json(copy);
						}
					});
				});
			}
		});
	});

	// Orders POST
	app.post('/api/orders', function(req, res) {
		Orders.create(req.body, function(err, order) {
			if (err)
				res.send(err);
			res.json(order);
		});
	});

	// Orders POST
	app.post('/api/infinite/orders', function(req, res) {
		Orders.find({'content': {$ne: null}}).sort({created : -1}).skip(req.body.orderTotalCount).limit(3).exec(function(err, newlyLoadedOrders) {
			if (err) {
				res.send(err);
			}
			else {
				var copy = [];
				newlyLoadedOrders.forEach(function(order, key){
					Users.findById(order.author, function (err, author) {
						if (err) {
							res.send(err);
						}
						copy[key] = {
							created: order.created,
							updated: order.updated,
							title: order.title,
							content: order.content,
							img: order.img,
							id: order._id,
							updater: order.updater,
							author: {
								id: author._id,
								username: author.username
							}
						};
						if(key === newlyLoadedOrders.length - 1) {
							res.json(copy);
						}
					});
				});
			}
		});
	});

	// Orders PUT
	app.put('/api/orders/:id', function(req,res) {
		req.body.updated = new Date();
		Orders.update({'_id': req.params.id}, req.body, {}, function (err, result) {
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

	// Orders DELETE
	app.delete('/api/orders/:id', function(req, res) {
		if(req.params.id !== undefined) {
			req.body.content = null;
			Orders.update({'_id': req.params.id}, req.body, {}, function (err, result) {
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
		}
	});

};
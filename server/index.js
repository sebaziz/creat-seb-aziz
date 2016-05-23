
module.exports = function(app, passport) {

	// API routes
	// =============================================================================
	require('./users/index.js')(app);
	require('./passport/index.js')(app, passport);
	require('./orders/index.js')(app);
	require('./comments/index.js')(app);
	require('./test/testController.js')(app);

};
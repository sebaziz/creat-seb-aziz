
// Call the packages
// =============================================================================

var express       = require('express')                      // Call express
	, passport      = require('passport')                     // Passport for authentifications
	, mongoose      = require('mongoose');                    // Mongoose for mongodb

var path          = require('path')                         // To get directory path
	, morgan        = require('morgan')
	, bodyParser    = require('body-parser')                  // HTTP request parser
	, cookieParser  = require('cookie-parser')                // Cookie parsing with signature
	, session       = require('express-session')              // Simple session middleware

	, hash          = require('bcrypt-nodejs')
	, localStrategy = require('passport-local').Strategy;


// App configurations
// =============================================================================
var app        = express()                                  // Define application using express
	, port       = process.env.PORT || 4000;                  // Set up port

mongoose.connect('mongodb://localhost/creative');           // Connect to mongoDB database

// user schema/model
var User = require('./server/users/model.js');

app.use(morgan('dev'));                                     // Log every request to the console
app.use(cookieParser());                                    // An obligatory cookie reader for the authentifications
app.use(bodyParser.json());													        // Returns middleware that only parses json from html forms
app.use(bodyParser.urlencoded({ extended: true }));         // Returns middleware that only parses urlencoded bodies


app.use(require('express-session')({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
}));

// Passport configurations
// =============================================================================
app.use(passport.initialize());
app.use(passport.session());                                // Persistent login sessions
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// App routes
// =============================================================================
app.get('/', function(req, res) {
	var absolute_path = path.join(__dirname, 'client/index.html');
	res.sendFile(absolute_path);
});
require('./server/index.js')(app, passport); // load our routes and pass in our app and fully configured passport

// File routes
// =============================================================================
app.use('/client', express.static(__dirname + '/client'));
app.use('/config', express.static(__dirname + '/config'));
app.use('/server', express.static(__dirname + '/server'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// Catch 404 error
// =============================================================================
app.get('*', function(req, res, next) {
	var err = new Error();
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	if(err.status !== 404) {
		return next();
	}
	//res.redirect('/#/You-Shall-Not-Pass!!');
	//res.redirect('/#/user/update/565395e246e96a1f663f1ee5');
	res.redirect('/#/login');
});

// Start the server
// =============================================================================
app.listen(port);
console.log('Locate the project on localhost:' + port);

// Call the packages
// =============================================================================
var mongoose = require('mongoose'),
		Schema   = mongoose.Schema,
		passportLocalMongoose = require('passport-local-mongoose');

// Define Schema
// =============================================================================
var UserSchema = new Schema({
	username: String,
	email : String,
	password: String,
	picture: String,
	role: Number,
	access: Number,
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', UserSchema);

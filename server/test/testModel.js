// Call the packages
// =============================================================================
var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

// Define Schema
// =============================================================================
var TodoSchema = new Schema({
	text : { type : String }
});

module.exports = mongoose.model('todos', TodoSchema);

// Call the packages
// =============================================================================
var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

// Define Schema
// =============================================================================
var CommentSchema = new Schema({
	order: {
		type: Schema.Types.ObjectId
	},
	author: {
		type: Schema.Types.ObjectId
	},
	comment: {
		type: String,
		required: 'Comment cannot be blank'
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('comments', CommentSchema);

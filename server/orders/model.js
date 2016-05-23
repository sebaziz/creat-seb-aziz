// Call the packages
// =============================================================================
var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

// Define Schema
// =============================================================================
var OrderSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	img: {
		type: String
	},
	//imgs : [],
	content: {
		type: String,
		default: '',
		trim: true
	},
	updater: {
		type: String
	},
	author: {
		type: Schema.ObjectId
	}
});

OrderSchema.pre('save', function(done) {
	var now = new Date();
	this.updated_at = now;
	if ( !this.created_at ) {
		this.created_at = now;
	}
	done();
});

module.exports = mongoose.model('orders', OrderSchema);

var mongoose = require('mongoose');
var settingsSchema = new mongoose.Schema({
	version: {
		type: String,
		required: true
	},
	admin: {
		type: String,
		required: true
	},
	web_title: {
		type: String,
		required: true
	},
	db_backup: {
		type: String
	},
	created: {
		type: Date,
		required: true
	}
});

mongoose.model('Settings', settingsSchema);

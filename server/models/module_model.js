var mongoose = require('mongoose');
var mmSchema = new mongoose.Schema({
	module_name: {
		type: String,
		required: true,
		unique: true
	},
	front_url: {
		type: String
	},
	required_p: {
		type: Array
	},
	not_required_p: {
		type: Array
	},
	isEnable: {
		type: Boolean,
		required: true
	},
	created: {
		type: Date,
		required: true
	}
});

mongoose.model('ModuleModel', mmSchema);
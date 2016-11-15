var mongoose = require('mongoose');
var testSchema = new mongoose.Schema({
	abc: {type: String,required: true,unique: true},created: {type: Date,required: true,unique: true}
});

mongoose.model('Test', testSchema);
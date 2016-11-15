var mongoose = require('mongoose');
var ModuleModel = mongoose.model('ModuleModel');
var mg = require('./mg');

module.exports.findAllModuleModel = function(req, res){
	ModuleModel.find({isEnable: true}, function(err, mm){
		if(err)
			return res.status(500).send(err);
		res.send(mm);
	});
}

module.exports.createModuleModel = function(req, res){
	mg.moduleGenerator(req, res);
}

module.exports.deleteModuleModelById = function(req, res){
	mg.removeModule(req, res);
}

module.exports.updateModuleModel = function(req, res){
	ModuleModel.findOneAndUpdate({_id: req.body._id}, req.body, 
										function(err, mm){
		if(err)
			return res.status(500).json(err);
		res.status(200).json({"message": "Updated!"});
	});
}
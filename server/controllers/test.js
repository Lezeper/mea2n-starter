var mongoose = require('mongoose');
var Test = mongoose.model('Test');

module.exports.findTest = function(req, res){
	Test.find({}, function(err, test){
		if(err)
			return res.status(500).send(err);
		res.json(test);
	});
}

module.exports.findTestById = function(req, res){
	Test.find({_id: req.query.id}, function(err, test){
		if(err)
			return res.status(500).send(err);
		res.json(test);
	});
}

module.exports.createTest = function(req, res){
	var test = new Test();

	test.abc=req.body.abc;test.created= new Date()

	test.save(function(err, test){
		if(err)
			return res.status(500).send(err);
		res.status(200).json({message: "Test Created!", id: test._id});
	});
}

module.exports.updateTest = function(req, res){
	Test.findOneAndUpdate({_id: req.body._id}, req.body, 
												function(err, test){
		if(err)
			return res.status(500).send(err);
		if(Test == null)
			return res.status(200).json({"message": "Test not found."});
		res.status(200).json({"message": "Test updated!"});
	});
}

module.exports.deleteTestById = function(req, res){
	Test.findByIdAndRemove(req.query.id, function(err){
		if(err)
			return res.status(500).send(err);
		res.json({"message": "Successful delete Test."});
	});
}

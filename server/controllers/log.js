var mongoose = require('mongoose');
var Log = mongoose.model('Log');

module.exports.findAllLogs = function(req, res){
	var condition = req.query.ip ? {ip: req.query.ip} : {};
	condition = req.query.date ? {created: req.query.date} : condition;
	Log.find(condition).sort({
		created: -1
	}).exec(function(err, logs){
		if(err)
			return res.status(500).send(err);
		res.json(logs);
	});
};

module.exports.createLog = function(req, res, next){
	var ip = req.headers['x-forwarded-for'] || 
     			req.connection.remoteAddress || 
     				req.socket.remoteAddress ||
     					req.connection.socket.remoteAddress;
    var log = new Log();
    log.ip = ip;
    log.target = req.url;
    log.method = req.method;
    log.created = new Date();
	log.save(function(err){
		if(err)
			console.log(err);
	});
	next();
}

module.exports.deleteAllLogs = function(req, res){
	Log.remove({}, function(err){
		if(err)
			return res.status(500).send(err);
		res.status(200).json({
			"message": "Successful delete logs."
		});
	});
}
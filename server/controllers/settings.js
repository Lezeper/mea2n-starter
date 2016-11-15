
var mongoose = require('mongoose');
var Settings = mongoose.model('Settings');
var fs = require('fs');
var pathD = require('path');

module.exports.findSettings = function(req, res){
	Settings.find({}, function(err, settings){
		if(err)
			return res.status(500).send(err);
		res.json(settings);
	});
}

var createSettings = function(req, res){
	var settings = new Settings();
	settings.version = req.body.version;
	settings.admin = req.body.admin;
	settings.web_title = req.body.web_title;
	settings.created = new Date();

	settings.save(function(err){
		if(err)
			return res.status(500).send(err);
		res.status(200).json({
			message: "Settings Created!"
		});
	});
}

module.exports.updateSettings = function(req, res){
	Settings.findOneAndUpdate({_id: req.body._id}, req.body, 
												function(err, settings){
		if(err)
			return res.status(500).send(err);
		if(settings == null)
			return createSettings(req, res);
		res.status(200).json({"message": "settings updated!"});
	});
}

module.exports.deleteSettings = function(req, res){
	Settings.findByIdAndRemove(req.params.id, function(err){
		if(err)
			return res.send(500, err);
		res.json({"message": "Successful delete settings."});
	});
}

module.exports.doDBBackup = function(req, res){
	var config = require('../config');
	var exec = require('child_process').exec;
	var date = new Date().toJSON().slice(0,10);
	var cmd = 'mongodump -h ' + config.hosting + ' -d ' + config.databaseName 
	                    + ' -u ' + config.username + ' -p ' + config.password 
	                          + ' -o DB_Backup/' + date;

	deleteFolderRecursive(pathD.join(__dirname, '../../DB_Backup'));

	exec(cmd, function(error, stdout, stderr) {
		var findP = new Promise(function(resolve, reject){
			Settings.find({}, function(err, settings){
				if(err)
					reject(err);
				resolve(settings[0]);
			});
		});

		findP.then(function(settings){
			settings.db_backup = date;
			Settings.findOneAndUpdate({_id: settings._id}, settings, 
									function(err, settings){
				if(err)
					return res.status(500).send(err);
				if(settings == null)
					return res.status(200).json({"message": "Settings can't found!"});
				res.status(200).json({"message": "DB Backup!"});
			});
		});	
	});
}

var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};
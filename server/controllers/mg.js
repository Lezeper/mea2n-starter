var fs = require('fs');
var mkdirp = require('mkdirp');
var pathD = require('path');
var mongoose = require('mongoose');
var ModuleModel = mongoose.model('ModuleModel');
var mmCtrl = require('./module_model');

var responseErrMsg = function(res, err){
	console.log(err);
	return res.status(500).send(err);
}

var deleteFolderRecursive = function(path){
	if(fs.existsSync(path)){
		fs.readdirSync(path).forEach(function(file,index){
			var curPath = path + "/" + file;
		    if(fs.lstatSync(curPath).isDirectory()) {
		    	deleteFolderRecursive(curPath);
		    } else {
		        fs.unlinkSync(curPath);
		    }
		});
		fs.rmdirSync(path);
	}
}

var capitalFirstChar = function(str){
	return str.charAt(0).toUpperCase()+str.slice(1);
}
// check whether the code already exist
var checkModuleNameMGCExist = function(data, moduleName){
	var ModuleName = capitalFirstChar(moduleName);
	if(data.indexOf("/*** " + ModuleName + " ***/") >= 0)
		return true;
	return false;
}
// replace in template file
var replaceModuleName = function(templateData, moduleName){
	var result = templateData.replace(/Module\*Name/g, 
								capitalFirstChar(moduleName));
	result = result.replace(/module\*name/g, moduleName);
	return result;
}
// replace in exist file
var replaceMGComment = function(data, replacement){
	return data.replace(/\/\*MG\*\//g, replacement);
}
// generate code in template
var replaceGCIT = function(data, replacement){
	return data.replace(/\/\*GCIT\*\//g, replacement);
}
// remove a range of string.
var removeRangeOfStr = function(data, moduleName){
	var ModuleName = capitalFirstChar(moduleName);
	var begin = data.indexOf("/*** "+ModuleName+" ***/");
	var end = data.indexOf("/*** /"+ModuleName+" ***/") +
				("/*** /"+ModuleName+" ***/").length;
	return data.slice(0, begin) + data.slice(end);
}

var generateFrontView = function(moduleName){
	var path = pathD.join(__dirname, '../../client/' + moduleName + '/');
	return new Promise(function(resolve, reject){
		mkdirp(path, function(err){
			if(err)
				return reject(err);
			fs.writeFile(path + moduleName + ".view.html",
				"utf8", function(err2){
				if(err2)
					return reject(err2);
				resolve("generateFrontView Successful!");
			});
		});
	});
}

var generateFrontController = function(moduleName){
	var path = pathD.join(__dirname, '../../client/' + moduleName + '/');
	var frontCTRLTemplatePath = pathD.join(__dirname, 
					'../.template/client/template/template.controller.js');
	return new Promise(function(resolve, reject){
		mkdirp(path, function(err){
			if(err)
				return reject(err);
			fs.readFile(frontCTRLTemplatePath,"utf8", function(err1, templateData){
				if(err1)
					return reject(err1);
				var result = replaceModuleName(templateData, moduleName);
				fs.writeFile(path + moduleName + ".controller.js", result, "utf8",
					function(err2){
					if(err2)
						return reject(err2);
					resolve("generateFrontController Successful!");
				})
			});
		});
	});
}

var addFrontRouting = function(moduleName, moduleFrontUrl){
	var ModuleName = capitalFirstChar(moduleName);
	var routingFilePath = 
		pathD.join(__dirname, '../../client/routing.js');
	var routingCode = "/*** "+ModuleName+" ***/.state('"+moduleName+
			"', { url: '"+moduleFrontUrl+"', templateUrl: '/"+moduleName+
			"/"+moduleName+".view.html', controller: '"+moduleName+
			"Ctrl' })/*** /"+ModuleName+" ***//*MG*/";
	return new Promise(function(resolve, reject){
		fs.readFile(routingFilePath, "utf8", function(err1, data){
			if(err1)
				return reject(err1);
			if(checkModuleNameMGCExist(data, moduleName)){
				var temp = "/*** " + ModuleName 
									+" ***/ exists in front routing!";
				return reject(temp);
			}
			var result = replaceMGComment(data, routingCode);
			fs.writeFile(routingFilePath, result, "utf8", function(err2){
				if(err2)
					return reject(err2);
				resolve("addFrontRouting Successful!");
			});
		});
	});
	
}

var addFrontRESTApi = function(moduleName){
	var ModuleName = capitalFirstChar(moduleName);
	var meanDataPath = 
		pathD.join(__dirname, '../../client/common/services/data.service.js');
	var frontRESTApiTemplatePath = pathD.join(__dirname, 
					'../.template/client/meanData');

	var returnCode = "/*** "+ModuleName+"R ***/, getAll"+ModuleName+
					": getAll"+ModuleName+","+ "get"+ ModuleName + 
					"ById: get" + ModuleName + "ById," +
					"create"+ModuleName+": create"+ModuleName+"," +
					"update"+ModuleName+": update"+ModuleName+"," +
					"delete"+ModuleName+"ById: delete"+ModuleName+
					"ById/*** /"+ModuleName+"R ***//*MGR*/";
	return new Promise(function(resolve, reject){
		fs.readFile(frontRESTApiTemplatePath, "utf8", function(err1, templateData){
			if(err1)
				return reject(err1);
			var mResult = replaceModuleName(templateData, moduleName);
			fs.readFile(meanDataPath, "utf8", function(err2, meanData){
				if(err2)
					return reject(err2);
				if(checkModuleNameMGCExist(meanData, moduleName)){
					var temp = "/*** " + ModuleName 
										+" ***/ exists in front RESTApi!";
					return reject(temp);
				}
				var result = replaceMGComment(meanData, mResult);
				result = result.replace(/\/\*MGR\*\//g, returnCode);
				fs.writeFile(meanDataPath, result, "utf8", function(err3){
					if(err3)
						return reject(err3);
					resolve("addFrontRESTApi Successful!");
				});
			});
		});
	});
}

var createMongooseModel = function(moduleName, model){
	var ModuleName = capitalFirstChar(moduleName);
	/* extract model property */
	var prop = "";
	model.forEach(function(m, index){
		var temp = "";
		if(m.name && m.type){
			if(m.required){
				temp += ",required: "+m.required;
			}
			if(m.unique){
				temp += ",unique: "+m.unique;
			}

			prop+=(m.name + ": {type: "+ m.type + temp +"}");

			if(index != model.length-1)
				prop+=",";
		}
	});
	/* Path value */
	var modelTemplatePath = pathD.join(__dirname, 
					'../.template/server/model/template');
	var modelDirPath = pathD.join(__dirname, '../models/');
	return new Promise(function(resolve, reject){
		/* read template and write file */
		fs.readFile(modelTemplatePath, "utf8", function(err1, templateData){
			if(err1)
				return reject(err1);
			var result = replaceModuleName(templateData, moduleName);
			result = replaceMGComment(result, prop);
			fs.writeFile(modelDirPath+moduleName+".js", result, "utf8", 
				function(err2){
				if(err2)
					return reject(err2);
				/* add to index.js */
				fs.readFile(modelDirPath+"index.js", "utf8", function(err3, data){
					if(err3)
						return reject(err3);
					if(checkModuleNameMGCExist(data, moduleName)){
						var temp = "/*** " + ModuleName 
											+" ***/ exists in server/module/index.js!";
						return reject(temp);
					}
					var addIndexCode = "/*** " + ModuleName + 
							" ***/require('./"+moduleName+"');/*** /" + ModuleName + 
								" ***//*MG*/";
					var result = replaceMGComment(data, addIndexCode);
					fs.writeFile(modelDirPath+"index.js", result, "utf8", function(err4){
						if(err4)
							return reject(err4);
						resolve("createMongooseModel Successful!");
					});
				});
			});
		});
	});
}

var createModelCtrl = function(moduleName, model){
	/* Path value */
	var modelCtrlTemplatePath = pathD.join(__dirname, 
					'../.template/server/controller/template');
	var modelCtrlDirPath = pathD.join(__dirname, '../controllers/');
	return new Promise(function(resolve, reject){
		/* read ctrl template file and write ctrl file */
		fs.readFile(modelCtrlTemplatePath, "utf8", function(err1, templateData){
			if(err1)
				return reject(err1);
			// replace module name in template file
			var result = replaceModuleName(templateData, moduleName);
			// replace GCIT in template file
			var code = "";
			model.forEach(function(m){
				if(m.name && m.type){
					if(m.type != "Date")
						code+=(moduleName+"."+m.name+"=req.body."+m.name+";");
					else
						code+=(moduleName+"."+m.name+"="+" new Date();");
				}
			});
			result = replaceGCIT(result, code);
			fs.writeFile(modelCtrlDirPath+moduleName+".js", result, "utf8",function(err2){
				if(err2)
					return reject(err2);
				resolve("createModelCtrl Successful!");
			});
		});
	});
}

var addServerRESTApi = function(moduleName){
	/* Path value */
	var serverRouteTemplatePath = pathD.join(__dirname, 
					'../.template/server/route/index');
	var serverRouteDirPath = pathD.join(__dirname, '../routes/index.js');
	return new Promise(function(resolve, reject){
		/* read template file and write to index.js */
		fs.readFile(serverRouteTemplatePath, "utf8", function(err1, templateData){
			if(err1)
				return reject(err1);
			var templateResult = replaceModuleName(templateData, moduleName);
			fs.readFile(serverRouteDirPath, "utf8", function(err2, data){
				if(err2)
					return reject(err2);
				if(checkModuleNameMGCExist(data, moduleName)){
					var temp = "/*** " + capitalFirstChar(moduleName) 
									+" ***/ exists in server RESTApi!";
					return reject(temp);
				}
				result = replaceMGComment(data, templateResult);
				fs.writeFile(serverRouteDirPath, result, "utf8", function(err3){
					if(err3)
						return reject(err3);
					resolve("addServerRESTApi Successful!");
				});
			});
		});
	});
	
}

var removeFrontRouting = function(moduleName){
	var routingFilePath = 
		pathD.join(__dirname, '../../client/routing.js');
	return new Promise(function(resolve, reject){
		fs.readFile(routingFilePath, "utf8", function(err1, routingFile){
			if(err1)
				return reject(err1);
			if(!checkModuleNameMGCExist(routingFile, moduleName)){
					var temp = "/*** " + capitalFirstChar(moduleName) 
									+" ***/ not exists in front routing!";
					return reject(temp);
			}
			var result = removeRangeOfStr(routingFile, moduleName);
			fs.writeFile(routingFilePath, result, "utf8", function(err2){
				if(err2)
					return reject(err2);
				resolve("removeFrontRouting Successful!");
			});
		});
	});
}

var removeFrontRESTApi = function(moduleName){
	var meanDataPath = 
		pathD.join(__dirname, '../../client/common/services/data.service.js');
	return new Promise(function(resolve, reject){
		fs.readFile(meanDataPath, "utf8", function(err1, meanData){
			if(err1)
				return reject(err1);
			if(!checkModuleNameMGCExist(meanData, moduleName)){
					var temp = "/*** " + capitalFirstChar(moduleName) 
									+" ***/ not exists in front RESTApi!";
					return reject(temp);
			}
			var result = removeRangeOfStr(meanData, moduleName);
			result = removeRangeOfStr(result, moduleName+"R");
			fs.writeFile(meanDataPath, result, "utf8", function(err2){
				if(err2)
					return reject(err2);
				resolve("removeFrontRESTApi Successful!");
			});
		});
	});
}

var removeMongooseModel = function(moduleName){
	var modelDirPath = pathD.join(__dirname, '../models/');
	return new Promise(function(resolve, reject){
		/* remove code from index.js */
		fs.readFile(modelDirPath+"index.js", "utf8", function(err1, indexFile){
			if(err1)
				return reject(err1);
			var result = removeRangeOfStr(indexFile, moduleName);
			if(!checkModuleNameMGCExist(indexFile, moduleName)){
					var temp = "/*** " + capitalFirstChar(moduleName) 
									+" ***/ not exists in server/model/index.js!";
					return reject(temp);
			}
			fs.writeFile(modelDirPath+"index.js", result, "utf8", function(err2){
				if(err2)
					return reject(err2);
				/* remove from model folder */
				fs.unlink(modelDirPath+moduleName+".js", function(err3){
					if(err3)
						return reject(err3);
					resolve("removeMongooseModel Successful!");
				});
			});
		});
	});
}

var removeServerRESTApi = function(moduleName){
	var serverRouteDirPath = pathD.join(__dirname, '../routes/index.js');
	return new Promise(function(resolve, reject){
		fs.readFile(serverRouteDirPath, "utf8", function(err1, data){
			if(err1)
				return reject(err1);
			if(!checkModuleNameMGCExist(data, moduleName)){
					var temp = "/*** " + capitalFirstChar(moduleName) 
									+" ***/ not exists in server RESTApi!";
					return reject(temp);
			}
			var result = removeRangeOfStr(data, moduleName);
			fs.writeFile(serverRouteDirPath, result, "utf8", function(err2){
				if(err2)
					return reject(err2);
				resolve("removeServerRESTApi Successful!");
			});
		});
	});
}

var removeViewAndCtrl = function(moduleName){
	var path = pathD.join(__dirname, '../../client/' + moduleName + '/');
	deleteFolderRecursive(path);
}

var removeModelCtrl = function(moduleName){
	var modelCtrlDirPath = pathD.join(__dirname, '../controllers/')
	return new Promise(function(resolve, reject){
		fs.unlink(modelCtrlDirPath+moduleName+".js", function(err){
			if(err)
				return reject(err);
			resolve("removeModelCtrl Successful!");
		});
	});
}
/*
var mm = new ModuleModel();
mm.created = new Date();
mm.module_name = "Common";
mm.isEnable = false;
mm.save(function(err){
	if(err)
		return console.log(err);
	console.log("OK");
});*/

var writeModuleInfomToDB = function(moduleName, model, front_url){
	var mm = new ModuleModel();
	var required_p = [];
	var not_required_p = [];
	mm.module_name = capitalFirstChar(moduleName.toLowerCase());
	model.forEach(function(m){
		if(m.name && m.type){
			var temp = {};
			temp[m.name] = m.type;
			if(m.required === true)
				required_p.push(temp);
			else
				not_required_p.push(temp);
		}
	});
	mm.required_p = required_p;
	mm.not_required_p = not_required_p;
	mm.front_url = front_url;
	mm.isEnable = true;
	mm.created = new Date();
	return new Promise(function(resolve, reject){
		mm.save(function(err){
			if(err)
				return reject(err);
			resolve("writeModuleInfomToDB Successful!");
		});
	});
}

var removeModuleInformFromDB = function(id){
	return new Promise(function(resolve, reject){
		ModuleModel.findOneAndRemove({_id: id}, function(err){
			if(err)
				return reject(err);
			resolve("removeModuleInformFromDB Successful!");
		});
	});
}
// when changed finished, write signal file
var changeSignalFile = function(){
	var filePath = pathD.join(__dirname, 
		'../../signal.js');
	fs.writeFile(filePath, "utf8", function(err){
		if(err)
			return console.log(err);
	});
}

module.exports.removeModule = function(req, res){
	var moduleName = req.query.moduleName.toLowerCase();
	removeViewAndCtrl(moduleName);
	
	removeFrontRouting(moduleName).then(function(a1){
		console.log(a1);
		removeViewAndCtrl(moduleName);
		removeFrontRESTApi(moduleName).then(function(a2){
			console.log(a2);
			removeServerRESTApi(moduleName).then(function(a3){
				console.log(a3);
				removeModelCtrl(moduleName).then(function(a4){
					console.log(a4);
					removeMongooseModel(moduleName).then(function(a5){
						console.log(a5);
						removeModuleInformFromDB(req.query.id).then(function(a6){
							console.log(a6);
							/* remove from module_name DB */
							// console.log(mongoose.connection.collections['tests']);
							res.status(200).json({"message": "Module Removed!"});
							changeSignalFile();
						}, function(err5){
							responseErrMsg(res, err5);
						});
					}, function(err4){
						responseErrMsg(res, err4);
					});
				});
			}, function(err3){
				responseErrMsg(res, err3);
			});
		}, function(err2){
			responseErrMsg(res, err2);
		});
	}, function(err){
		responseErrMsg(res, err);
	});
}

module.exports.moduleGenerator = function(req, res){
	var moduleName = req.body.moduleName.toLowerCase();
	var frontUrl = req.body.frontUrl;
	var model = req.body.prop;
	
	var ModuleName = capitalFirstChar(req.body.moduleName);
	ModuleModel.find({module_name: ModuleName}, function(err, mm){
		if(err)
			return res.status(500).send(err);
		console.log(mm)
		if(mm.length > 0){
			return res.status(200).json({"message": "This module already exist!"});
		} else {
			generateFrontView(moduleName).then(function(a1){
				console.log(a1);
				generateFrontController(moduleName).then(function(a2){
					console.log(a2);
					addFrontRouting(moduleName, frontUrl).then(function(a3){
						console.log(a3);
						addFrontRESTApi(moduleName).then(function(a4){
							console.log(a4);
							createMongooseModel(moduleName, model).then(function(a5){
								console.log(a5);
								createModelCtrl(moduleName, model).then(function(a6){
									console.log(a6);
									addServerRESTApi(moduleName).then(function(a7){
										console.log(a7);
										writeModuleInfomToDB(moduleName, model, frontUrl).then(function(a8){
											console.log(a8);
											res.status(200).json({"message": "Module "+req.body.moduleName
															+" Created!"});
											changeSignalFile();
										}, function(err8){
											responseErrMsg(res, err8);
										});
									}, function(err7){
										responseErrMsg(res, err7);
									});
								}, function(err6){
									responseErrMsg(res, err6);
								});
							}, function(err5){
								responseErrMsg(res, err5);
							});
						}, function(err4){
							responseErrMsg(res, err4);
						});
					}, function(err3){
						responseErrMsg(res, err3);
					});
				}, function(err2){
					responseErrMsg(res, err2);
				});
			}, function(err1){
				responseErrMsg(res, err1);
			});
		}
	});
}
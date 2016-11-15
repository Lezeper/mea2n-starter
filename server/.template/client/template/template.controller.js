(function(){
	app.controller("module*nameCtrl", ["$scope", "meanData", 
		function($scope, meanData){

		$scope.getAllModule*Name = function(){
			return new Promise(function(resolve, reject){
				meanData.getAllModule*Name().then(function(res){
					resolve(res.data);
				}, function(err){
					alert(err.data.errmsg);
					reject();
				});
			})
		}

		$scope.getModule*NameById = function(){
			return new Promise(function(resolve, reject){
				meanData.getModule*NameById().then(function(res){
					resolve(res.data);
				}, function(err){
					alert(err.data.errmsg);
					reject();
				});
			})
		}

		$scope.createModule*Name = function(module*name){
			return new Promise(function(resolve, reject){
				meanData.createModule*Name(module*name).then(function(res){
					alert(res.data.message);
					resolve(res.data.id);
				}, function(err){
					alert(err.data.errmsg);
					reject(err.data.errmsg);
				});
			});
		}

		$scope.updateModule*Name = function(module*name){
			return new Promise(function(resolve, reject){
				meanData.updateModule*Name(module*name).then(function(res){
					alert(res.data.message);
					resolve();
				}, function(err){
					alert(err.data.errmsg);
					reject();
				});
			});
		}

		$scope.deleteModule*NameById = function(id){
			return new Promise(function(resolve, reject){
				meanData.deleteModule*NameById(id).then(function(res){
					alert(res.data.message);
					resolve();
				}, function(err){
					alert(err.data.errmsg);
					reject();
				});
			});
		}

	}]);
})();
angular.module('assignment').controller('AddTaskCtrl',['$scope','TaskContainer',function($scope,TaskContainer){
	$scope.task = new Task();
	var newObject = function() {
		$scope.task = new Task();
	};
	$scope.filterHours = function() {
		var str = $scope.task.hours.toString();
		var parts = str.split('.');
		if(parts.length >= 2) {
			str = parts[0]+"."+parts[1];
		} else if(parts.length == 1) {
			str = parts[0];
		} else {
			str = "";
		}
		$scope.task.hours = str.replace(/[^0-9\.]+/g,'');
	};
	$scope.submitForm = function() {
		if($scope.task.name.length == 0) {
			$scope.task.name = "New Task " + (TaskContainer.getTasks().length+1);
		}
		$scope.task.hours = parseFloat($scope.task.hours);
		TaskContainer.createTask($scope.task);
		
		
		newObject();
	};
	
	newObject();
}]);
angular.module('assignment').controller('EmployeeCtrl',['$scope','EmployeeContainer','TaskContainer','$sce',function($scope,EmployeeContainer,TaskContainer,$sce){
	$scope.employeeList = EmployeeContainer.getEmployees();
	$scope.taskList = TaskContainer.getTasks();
	$scope.colWidth = 4;
	
	$scope.getTaskByEmployee = function(employeeId) {
		var list = [];
		for(var i = 0; i < $scope.taskList.length; i++) {
			if($scope.taskList[i].employee == employeeId && !$scope.taskList[i].isOpen()) {
				list.push($scope.taskList[i]);
			}
		}
		
		return list;
	};
	
	$scope.getTotalHours = function(employeeId) {
		var tasks = $scope.getTaskByEmployee(employeeId);
		var total = 0;
		for(var i = 0; i < tasks.length; i++) {
			if(tasks[i].employee == employeeId && !tasks[i].isResolved()) {
				total+=tasks[i].hours;
			}
		}
		
		return total;
	};
	
	$scope.addBreak = function(index) {
		var html = "";
		if(index > 0 && index % $scope.colWidth == 0) {
			html = "<br /><div class='col-xs-12'><hr /></div><br />";
		}

		return $sce.trustAsHtml(html);
	}
	
	$scope.$on('newEmployee',function(event,empId){
		$scope.employeeList = EmployeeContainer.getEmployees();
	});
	
	$scope.$on('newTask',function(event,taskId) {
		$scope.taskList = TaskContainer.getTasks();
	});
}]);
angular.module('assignment').controller('TaskListCtrl',['$scope','TaskContainer','EmployeeContainer',function($scope,TaskContainer,EmployeeContainer){
	var buildTasks = function() {
		var list = TaskContainer.getTasks();
		$scope.taskList = [];
		
		for(var i = 0; i < list.length; i++) {
			if(list[i].isOpen() && !list[i].employee) {
				$scope.taskList.push(list[i]);
			}
		}
		
		if(!$scope.$$phase) {
			$scope.$apply();
		}
	};
	
	$scope.taskList = [];
	$scope.employeeList = EmployeeContainer.getEmployees();
	
	$scope.assignTask = function(task) {
		if(!task.employee == "") {
			task.assigned();
		}
		
		buildTasks();
	};
	
	$scope.deleteTask = function(taskId) {
		TaskContainer.removeTask(taskId);
		buildTasks();
	};
	
	$scope.$on('newTask',function(event,taskId) {
		buildTasks();
	});
	
	$scope.$on('newEmployee',function(event,employeeId) {
		$scope.employeeList = EmployeeContainer.getEmployees();
	});
	
	buildTasks();
}]);
angular.module('assignment').controller('AddEmployeeCtrl',['$scope','EmployeeContainer',function($scope,EmployeeContainer){
	$scope.employee = new Employee();
	var newObject = function() {
		$scope.employee = new Employee();
	};

	$scope.submitForm = function() {
		if($scope.employee.name == "") {
			$scope.employee.name = "New Employee";
		}
		
		if($scope.employee.title == "") {
			$scope.employee.title = "New Title";
		}
		
		EmployeeContainer.createEmployee($scope.employee);		
		newObject();
	};
	
	newObject();
}]);
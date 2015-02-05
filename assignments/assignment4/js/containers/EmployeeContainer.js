'use strict';
(function() {
        var Instance = null;
        angular.module('assignment').factory('EmployeeContainer', ['$rootScope', 'TaskContainer', function($rootScope,TaskContainer) {
		function EmployeeContainer() {
			var arrEmployees = [];
			
			var init = function() {
				var object = new Employee();
				object.name = "Brittany Roque";
				object.title = "artist";
				that.createEmployee(object);
				
				object = new Employee();
				object.name = "Frank Sinatra";
				object.title = "artist";
				that.createEmployee(object);
				
				object = new Employee();
				object.name = "Bill Gates";
				object.title = "programmer";
				that.createEmployee(object);
				
				object = new Employee();
				object.name = "Meagan Fisher";
				object.title = "designer";
				that.createEmployee(object);
			};
			
			this.createEmployee = function(employee) {
				employee.id = arrEmployees.length;
				arrEmployees.push(employee);
				
				$rootScope.$broadcast('newEmployee',employee.id);
			};
			
			this.getEmployees = function() {
				return arrEmployees;
			};
			
			this.removeEmployee = function(empId) {
				for(var i in arrEmployees) {
					if(empId == arrEmployees[i].id) {
						arrEmployees.splice(i,1);
					}					
				}
				
				var tasks = TaskContainer.getTasks();
				for(var i = 0; i < tasks.length; i++) {
					if(tasks[i].employee == empId) {
						tasks[i].employee = null;
					}
				}
			};
						
			var that = this;
			init();
		};

		if(Instance == null) {
			Instance = new EmployeeContainer();
		}
		
		return Instance;
	}]);
})();

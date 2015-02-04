'use strict';
(function() {
        var Instance = null;
        angular.module('assignment').factory('EmployeeContainer', ['$rootScope', function($rootScope) {
		function EmployeeContainer() {
			var arrEmployees = [];
			
			var init = function() {
				var object = new Employee();
				object.name = "John Doe";
				object.title = "artist";
				that.createEmployee(object);
				
				object = new Employee();
				object.name = "Jane Doe";
				object.title = "writer";
				that.createEmployee(object);
				
				object = new Employee();
				object.name = "Daine Wolf";
				object.title = "programmer";
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

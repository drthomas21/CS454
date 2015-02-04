'use strict';
(function() {
        var Instance = null;
        angular.module('assignment').factory('TaskContainer', ['$rootScope', function($rootScope) {
		function TaskContainer() {
			var arrTasks = [];
			
			this.createTask = function(task) {
				task.id = arrTasks.length;
				arrTasks.push(task);
				
				$rootScope.$broadcast('newTask',task.id);
			};
			
			this.getTasks = function() {
				return arrTasks;
			};
			
			this.getTask = function(taskId) {
				for(var i in arrTasks) {
					if(taskId == arrTasks[i].id) {
						return arrTasks[i];
					}					
				}
				
				return null;
			}
			
			this.removeTask = function(taskId) {
				for(var i in arrTasks) {
					if(taskId == arrTasks[i].id) {
						arrTasks.splice(i,1);
					}					
				}
			};
			
			var that = this;
		};

		if(Instance == null) {
			Instance = new TaskContainer();
		}
		
		return Instance;
	}]);
})();
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
				var list = [];
				for(var i = 0; i < arrTasks.length; i++) {
					if(arrTasks[i]) {
						list.push(arrTasks[i]);
					}					
				}
				return list;
			};
			
			this.getTask = function(taskId) {
				var list = that.getTasks();
				for(var i = 0; i < list.length; i++) {
					if(list[i] && taskId == list[i].id) {
						return list[i];
					}					
				}
				
				return null;
			};
			
			this.removeTask = function(taskId) {
				for(var i in arrTasks) {
					if(arrTasks[i] && taskId == arrTasks[i].id) {
						arrTasks[i] = null;
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
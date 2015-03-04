'use strict';
(function() {
	var Instance = null;
	app.factory('LocationService',['$location','$timeout',function($location,$timeout){
		var LocationService = function() {
			var search = "";
			
			var init = function() {
				var obj = $location.search();
				search = obj.search;
			};
			
			this.setSearch = function(value) {
				if(value && typeof(value) == "string" && value.length > 0) {
					search = value;	
					$location.path('/');
					$location.search('search',value);					
				} else {
					search = null;
					$location.search('search',null);
				}
			};
			
			this.getSearch = function() {
				return search;
			};
			
			this.setCharacterId = function(value) {
				if(value && parseInt(value) > 0) {
					search = null;
					$location.search('search',null);
					$location.path("/"+parseInt(value));
				} else {
					$location.path("/");
				}
			};
			
			this.getCharacter = function() {
				return $location.path().replace(/[^0-9]/,'');
			}
			
			init();
		}
		
		if(!Instance) {
			Instance = new LocationService();
		}
		
		return Instance
	}]);
})();
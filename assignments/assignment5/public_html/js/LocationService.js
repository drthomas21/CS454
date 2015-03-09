'use strict';
(function() {
	var Instance = null;
	app.factory('LocationService',['$location','$timeout',function($location,$timeout){
		var LocationService = function() {
			var search = "";
			var ids = [];
			var isSearching = false;
			
			var init = function() {
				var obj = $location.search();
				if(obj.search) {
					search = obj.search;
				} else {
					search = "";
				}
				
				if(obj.id) {
					ids = obj.id;
				} else {
					ids = [];
				}
			};
			
			this.setIsSearching = function(value) {
				isSearching = value;
			};
			
			this.getIsSearching = function() {
				return isSearching;
			}
			
			this.setSearch = function(value) {
				if(value && typeof(value) == "string" && value.length > 0) {
					search = value;	
					$location.path('/');
					$location.search('search',value);					
				} else {
					search = "";
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
			
			this.setVersusCharacterId = function(id1,id2) {
				if(parseInt(id1) > 0 && parseInt(id2) > 0) {
					search = null;
					ids = [id1,id2];
					$location.search('id',ids);
					$location.path("/versus");
				}
			};
			
			this.getVersusCharacterIds = function() {
				return ids
			}
			
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

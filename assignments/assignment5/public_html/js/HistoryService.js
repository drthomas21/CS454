'use strict';
(function() {
	var Instance = null;
	app.factory('HistoryService',['$timeout','$rootScope',function($timeout,$rootScope){
		var HistoryService = function() {
			var characterSearches = {};
			var charactersSearches = [];
			var timeout = null;
			
			this.addToCharacters= function(Character) {
				characterSearches[Character.id] = Character;
			};
			
			this.getCharacter = function(id) {
				return characterSearches[id];
			}
			
			this.setCharacterList = function(Characters) {	
				charactersSearches = Characters;
			};
			
			this.getCharacterList = function() {
				return charactersSearches;
			};
		}
		
		if(!Instance) {
			Instance = new HistoryService();
		}
		
		return Instance;
	}]);
})();

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
				charactersSearchers = Characters;
			};
			
			this.getCharacterList = function() {
				return charactersSearches;
			};
			
			$rootScope.$on('characters',function(event,Characters,value){
				if(timeout) {
					$timeout.cancel(timeout);
				}
				
				timeout = $timeout(function() {
					charactersSearches = [];
					if(value && value.length > 0) {
						for(var i = 0; i < Characters.length; i++) {
							if(Characters[i].name.indexOf(value) >= 0) {
								charactersSearches.push(Characters[i]);
							}
						}
					}
					
					$rootScope.$broadcast("filteredCharacters",charactersSearches);	
				},1000);
							
			});
		}
		
		if(!Instance) {
			Instance = new HistoryService();
		}
		
		return Instance
	}]);
})();
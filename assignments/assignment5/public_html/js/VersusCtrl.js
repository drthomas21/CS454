app.controller('VersusCtrl',['$scope','$rootScope','$timeout','$window','$routeParams','$http','LocationService','HistoryService',function($scope,$rootScope,$timeout,$window,$routeParams,$http,LocationService,HistoryService){
	$scope.message = null;
	$scope.Characters = [];
	$scope.searching = false;
	var limits = {
			friends: 10,
			enemies: 10,
			powers: 5
	};
	$scope.count = 0;
	
	var init = function() {
		$scope.searching = true;
		var ids = LocationService.getVersusCharacterIds();
		if(ids.length > 0) {
			ids.forEach(function(id) {
				var Character = HistoryService.getCharacter(id);
				if(!Character) {
					$http.get('/api/character/'+id)
					.success(function(data,status,headers,config){
						if(data.success) {
							var temp = data.character;
							HistoryService.addToCharacters(temp);
							$scope.Characters.push(formatCharacter(temp));
							if($scope.Characters.length == ids.length)  {
								$scope.searching = false;
								$scope.count = $scope.Characters.length;
								if($scope.count > 6) {
									$scope.count = 6;
									$scope.Characters.splice(0,6);
								}
							}
						} else {		
							$scope.message = data.message
						}
					})
					.error(function(data,status,headers,config){
						if(data) {
							$rootScope.$broadcast('searchFailed',data);
						}
					});	
				} else {
					$scope.Characters.push(formatCharacter(Character));
				}
			});
		}
	};
	
	var formatCharacter = function(Character) {
		Character.friends = {
			length: Character.character_friends.length,
			list: Character.character_friends.splice(0,limits.friends)
		};
		
		Character.enemies = {
			length: Character.character_enemies.length,
			list: Character.character_enemies.splice(0,limits.enemies)
		};
		
		Character.powers = {
			length: Character.powers.length,
			list: Character.powers.splice(0,limits.powers)
		};
		
		return Character;
	};
	
	$scope.getClassName = function() {
		var colSpan = 2;
		if($scope.Characters.length <= 6) {
			colSpan = Math.floor(12 / $scope.Characters.length);
		}
		
		return "col-md-"+colSpan;
	}
	
	$scope.filterLinks = function(string) {
		if(typeof(string) == "string") {
			return string.replace(/\<a[^\>]+\>|\<\/a\>/g,"");
		}
		return "";
	};
	
	$scope.loadCharacter = function(Character) {
		LocationService.setCharacterId(Character.id);
	};
	
	$scope.loadVersus = function(Character) {
		LocationService.setVersusCharacterId($scope.Character.id,Character.id);
	};
	
	$scope.getImage = function(Character) {
		if(!Character || !Character.image || Character.image.length == 0) {
			return "";
		}
		
		return Character.image.medium_url || Character.image.large_url;
	};
	
	$scope.getSmallImage = function(Character) {
		if(!Character || !Character.image || Character.image.length == 0) {
			return "";
		}
		
		return Character.image.icon_url || Character.image.small_url;
	};
	
	$scope.getDate = function() {
		var date = new Date($scope.Character.date_last_updated);
		return date.getMonth() +"/"+(date.getDate() < 10 ? "0"+date.getDate() : date.getDate()) +"/"+date.getFullYear()
	};
	
	$scope.hasNoResults = function() {
		for(var i = 0; i < $scope.Characters.length; i++) {
			if($scope.Characters[i].name.indexOf($scope.search) >= 0){
				return false;
			}
		}
		return true;
	};
	
	$scope.clear = function() {
		$scope.Character = null;
		$scope.Characters = [];
		$rootScope.$broadcast("clear");
	};
	
	init();
	
	$scope.$on('clear',function() {
		
	});
}]);

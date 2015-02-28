var app = angular.module('app',['ngSanitize','ui.select']);

app.controller('DashboardCtrl',['$scope','$rootScope','$http','$timeout',function($scope,$rootScope,$http,$timeout){
	$scope.search;
	$scope.characters = [];
	var names = "";
	var timeout = null;
	
	$scope.getCharacters = function() {
		return $scope.characters;
	};
	
	$scope.getCharacterNames = function() {
		var list = [];
		for(var i = 0; i < $scope.characters.length; i++) {
			list.push($scope.characters[i].name);
		}
		
		return list;
	};
	
	$scope.selectedCharacter = function(Characters) {
		if(timeout) {
			$timeout.cancel($timeout);
		}
		
		timeout = $timeout(function(){
			$rootScope.$broadcast('characters',Characters);
		}, 1000);		
	};
	
	var buildCharacterList = function(value) {
		var Characters = [];
		for(var i = 0; i < $scope.characters.length; i++) {
			if($scope.characters[i].name.indexOf(value.toLowerCase()) >= 0 || $scope.characters[i].name.indexOf(value.toUpperCase()) >= 0) {
				Characters.push($scope.characters[i]);
			}
		}
		
		$scope.selectedCharacter(Characters);
	}
	
	$scope.refreshCharacters = function(value) {
		var names = $scope.getCharacterNames();
		if(value.replace(' ','').length > 0 && names.join(',').indexOf(value) == -1) {
			$rootScope.$broadcast('searching');
			$http.get('/api/search?name='+value)
			.success(function(data,status,headers,config){
				if(data.success) {
					$scope.characters = [];
					for(var i = 0; i < data.results.length; i++) {
						$scope.characters.push(data.results[i]);
					}
					buildCharacterList(value);
				} else {
					$rootScope.$broadcast('error',data.message);
				}
				
			})
			.error(function(data,status,headers,config){
				$rootScope.$broadcast('searchFailed',data);
				});
		} else {
			buildCharacterList(value);
		} 
	};
	
	$scope.clear = function() {
		$rootScope.$broadcast('clear');
	}
}]);

app.controller('CharacterCtrl',['$scope','$timeout',function($scope,$timeout){
	$scope.isSearching = false;
	$scope.Characters = [];
	$scope.Character = null;
	
	$scope.textOffset = 0;
	$scope.textValue = "Searching...";
	var emptyCharacter = function() {
		$scope.Characters = [];
	};
	
	emptyCharacter();
	
	$timeout(function() { animate() }, 0);
    var animate = function() {
    	if ($scope.textOffset < $scope.textValue.length) {
        	$scope.textOffset +=1;
            $timeout(animate,100,true);
        } else {
        	$scope.textOffset = 0;
        	$timeout(animate,1000,true);
        }
    }
	
	$scope.getImage = function(Character) {
		if(!Character || !Character.image || Character.image.length == 0) {
			return "";
		}
		
		return Character.image.medium_url || Character.image.large_url;
	};
	
	$scope.getDate = function() {
		var date = new Date($scope.Character.date_last_updated);
		return date.getMonth() +"/"+(date.getDate() < 10 ? "0"+date.getDate() : date.getDate()) +"/"+date.getFullYear()
	};
	
	$scope.loadCard = function(Character) {
		$scope.Character = Character;
	};
	
	$scope.clear = function() {
		$scope.Character = null;
		$scope.Characters = []
	};
	
	$scope.$on('searching',function(){
		$scope.isSearching = true;
		$scope.Character = null;
		emptyCharacter();
	});
	
	$scope.$on('searchFailed',function(event,message){
		$scope.isSearching = false;
		emptyCharacter();
	});
	
	$scope.$on('characters',function(event,Characters){
		$scope.Characters = [];
		$scope.Character = null;
		if(Characters && Characters.length >= 0) {
			$scope.isSearching = false;
			$scope.Characters = Characters;
			if(Characters.length == 1) {
				$scope.loadCard(Characters[0]);
			}
		}
		
	});
	
	$scope.$on('clear',function() {
		$scope.isSearching = false;
		emptyCharacter();
	});
}]);
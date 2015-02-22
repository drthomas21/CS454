var app = angular.module('app',['ngSanitize','ui.select']);

app.controller('DashboardCtrl',['$scope','$rootScope','$http',function($scope,$rootScope,$http){
	$scope.search;
	$scope.characters = [];
	var names = "";
	
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
	
	$scope.selectedCharacter = function(Character) {
		$rootScope.$broadcast('character',Character);
	}
	
	$scope.refreshCharacters = function(value) {
		var names = $scope.getCharacterNames();
		if(value.replace(' ','').length > 0 && names.join(',').indexOf(value) == -1) {
			$http.get('/api/search?name='+value)
			.success(function(data,status,headers,config){
				if(data.success) {
					for(var i = 0; i < data.results.data.results.length; i++) {
						$scope.characters.push(data.results.data.results[i]);
					}
					$rootScope.$broadcast('searching');
				} else {
					
				}
				
			})
			.error(function(data,status,headers,config){
				$rootScope.$broadcast('searchFailed',data);
			});
		} else if(value.replace(' ','').length > 0 && names.indexOf(value) >= 0 || names.join(',').indexOf(value) >= 0) {
			var Character = null;
			var index = names.indexOf(value);
			
			if(index >= 0) {
				Character = $scope.characters[index];
			} else {
				for(var i = 0; i < $scope.characters.length; i++) {
					if($scope.characters[i].name.indexOf(value) >= 0) {
						Character = $scope.characters[i];
						break;
					}
				}
			}
			
			$scope.selectedCharacter(Character);	
		} else if($scope.search && $scope.search.replace(' ','').length == 0) {
			$rootScope.$broadcast('clear');
		}
	};
	
	$scope.clear = function() {
		$rootScope.$broadcast('clear');
	}
}]);

app.controller('CharacterCtrl',['$scope','$timeout',function($scope,$timeout){
	$scope.isSearching = false;
	$scope.Character = null;
	
	$scope.textOffset = 0;
	$scope.textValue = "Searching...";
	var emptyCharacter = function() {
		$scope.Character = {
			id: '',
			name: '',
			description: '',
			modified: '',
			thumbnail: {
				path: '',
				extension: ''
			},
			resourceURI: '',
			comics: {},
			series: {
				items: []
			},
			stories: {
				items: []
			},
			events: {
				items: []
			},
			urls: [],
		};
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
	
	$scope.getImage = function() {
		if(!$scope.Character.thumbnail || $scope.Character.thumbnail.length == 0) {
			return "";
		}
		
		$src = $scope.Character.thumbnail.path+"."+$scope.Character.thumbnail.extension;
		if($src == ".") {
			return "";
		}
		
		return $src;
	};
	
	$scope.getDate = function() {
		var date = new Date($scope.Character.modified);
		return date.getMonth() +"/"+(date.getDate() < 10 ? "0"+date.getDate() : date.getDate()) +"/"+date.getFullYear()
	}
	
	$scope.$on('searching',function(){
		$scope.isSearching = true;
		emptyCharacter();
	});
	
	$scope.$on('searchFailed',function(event,message){
		$scope.isSearching = false;
		emptyCharacter();
	});
	
	$scope.$on('character',function(event,Character){
		if(Character) {
			$scope.isSearching = false;
			$scope.Character = Character;
		}
		
	});
	
	$scope.$on('clear',function() {
		$scope.isSearching = false;
		emptyCharacter();
	});
}]);
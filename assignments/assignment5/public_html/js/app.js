var app = angular.module('app',['ngSanitize','ui.select']);

app.controller('DashboardCtrl',['$scope','$rootScope','$http','$q',function($scope,$rootScope,$http,$q){
	$scope.search = undefined;
	$scope.characters = [];
	var names = "";
	var timeout = null;
	var canceler = $q.defer();
	var initalSearch = ["man","iron","spide","x","wolf","ame"];
	
	$scope.getCharacters = function() {
		return $scope.characters;
	};
	
	$scope.getCharacterNames = function() {
		var list = [];
		for(var i = 0; i < $scope.characters.length; i++) {
			list.push($scope.characters[i].name.toLowerCase());
		}
		
		return list;
	};
	
	$scope.selectedCharacter = function(Characters,value) {
		$rootScope.$broadcast('characters',Characters,value);		
	};
	
	var buildCharacterList = function(value) {
		$scope.selectedCharacter($scope.characters,value);
	};
	
	$scope.refreshCharacters = function(value,send) {
		$scope.search = value;
		if(value.length > 0) {
			$rootScope.$broadcast('searching');
			if(canceler && send) {
				canceler.resolve();
				canceler = $q.defer();
			}
			
			$http.get('/api/search?name='+value,{timeout: canceler.promise})
			.success(function(data,status,headers,config){
				if(data.success) {
					for(var i = 0; i < data.results.length; i++) {
						var bool = true;
						for(var j = 0; j < $scope.characters.length; j++) {
							if($scope.characters[j].name == data.results[i].name) {
								bool = false;
							}
						}
						
						if(bool) {
							$scope.characters.push(data.results[i]);
						}
						
					}
					if(send) {
						buildCharacterList(value);
					}
				} else {
					$rootScope.$broadcast('error',data.message);
				}
				
			})
			.error(function(data,status,headers,config){
				$rootScope.$broadcast('searchFailed',data);
			});
		}
	};
	
	$scope.clear = function() {
		$scope.search = undefined;
		$rootScope.$broadcast('clear');
	};
	
	$scope.$on('clear',function() {
		$scope.search = undefined;
	});
	
	initalSearch.forEach(function(value) {
		$scope.refreshCharacters(value);
	});
}]);

app.controller('CharacterCtrl',['$scope','$rootScope','$timeout','$window',function($scope,$rootScope,$timeout,$window){
	$scope.isSearching = false;
	$scope.Characters = [];
	$scope.Character = null;
	$scope.search = "";
	
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
	
	$scope.hasNoResults = function() {
		for(var i = 0; i < $scope.Characters.length; i++) {
			if($scope.Characters[i].name.indexOf($scope.search) >= 0){
				return false;
			}
		}
		return true;
	}
	
	$scope.clear = function() {
		$scope.Character = null;
		$scope.Characters = [];
		$rootScope.$broadcast("clear");
	};
	
	$scope.$on('searching',function(){
		$scope.isSearching = true;
		$scope.Character = null;
		emptyCharacter();
	});
	
	$scope.$on('searchFailed',function(event,message){
		$scope.isSearching = false;
		$scope.Character = null;
		emptyCharacter();
	});
	
	$scope.$on('characters',function(event,Characters,value){
		$scope.Characters = [];
		$scope.search = value;
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
		$scope.Character = null;
		$scope.search = "";
		$window.scrollTo(0,0);
		emptyCharacter();
	});
}]);
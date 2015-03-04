app.controller('CharacterCtrl',['$scope','$rootScope','$timeout','$window','$routeParams','$http',function($scope,$rootScope,$timeout,$window,$routeParams,$http){
	$scope.message = null;
	$scope.Character = null;
	$scope.searching = false;
	$scope.tabs = ['friends']
	
	var init = function() {
		if($routeParams.id) {
			$scope.searching = true;
			$http.get('/api/character/'+$routeParams.id)
			.success(function(data,status,headers,config){
				if(data.success) {
					$scope.Character = data.character;
					console.log($scope.Character);
				} else {
					$scope.Character = null;					
					$scope.message = data.message
				}
				$scope.searching = false;				
			})
			.error(function(data,status,headers,config){
				if(data) {
					$rootScope.$broadcast('searchFailed',data);
				}
			});
			
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
	
	init();
	
	$scope.$on('clear',function() {
		
	});
}]);
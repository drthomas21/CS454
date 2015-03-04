app.controller('ListCtrl',['$scope','$rootScope','$timeout','$window','LocationService',function($scope,$rootScope,$timeout,$window,LocationService){
	$scope.isSearching = false;
	$scope.Characters = [];
	$scope.Character = null;
	$scope.message = "";
	$scope.search = "";
	$scope.slides = [{
		src: "/images/slides/slide-001.jpg",
		text: "Invisible Woman"
	},{
		src: "/images/slides/slide-002.png",
		text: "Iron Man"
	},{
		src: "/images/slides/slide-003.jpg",
		text: "Captain America"
	},{
		src: "/images/slides/slide-004.png",
		text: "Elektra"
	},{
		src: "/images/slides/slide-005.jpg",
		text: "Spiderman"
	},{
		src: "/images/slides/slide-006.jpg",
		text: "Black Widow"
	},{
		src: "/images/slides/slide-007.jpg",
		text: "Wolverine"
	}];
	angular.element('body').ready(function() {
		angular.element('.carousel').carousel({
			interval: 3000,
			pause: 'none'
		});
	});
	$scope.textOffset = 0;
	$scope.textValue = "Searching...";
	var emptyCharacter = function() {
		$scope.Characters = [];
	};
	
	emptyCharacter();
	
	$scope.loadCard = function(Character) {
		LocationService.setCharacterId(Character.id);
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
	
	$scope.$on('searching',function(event,value){
		$scope.isSearching = true;
		$scope.Character = null;
		$scope.search = value;
	});
	
	$scope.$on('searchFailed',function(event,message){
		$scope.isSearching = false;
		$scope.Character = null;
		emptyCharacter();
	});

	$scope.$on('error',function(event,message) {
		$scope.isSearching = false;
		$scope.message = message;
	});
	
	$scope.$on('characters',function(event,Characters,value){
		$scope.isSearching = false;
		$scope.search = value;
		if(Characters && Characters.length >= 0) {
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
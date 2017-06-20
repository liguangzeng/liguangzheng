angular.module('starter.services', [])
.factory('home', function($http,$stateParams) {
		var getHomeData =function(){
			return $http.get("/api/billboard/home?__t=1489388291713")
									.then(function(res){
											return res.data
									})
		};
		var nowplaying = function(){
			return $http.get("/api/film/now-playing?__t=1489388291717&page=1&count=5")
									.then(function(res){
											return res.data
									})
		};
		var comingsoon = function(){
			return $http.get("/api/film/coming-soon?__t=1489388291721&page=1&count=3")
									.then(function(res){
											return res.data
									})
		};
		var filmInformData = function(){
			return $http.get("/api/film/"+$stateParams.filmId+"?__t=1489456484277")
									.then(function(res){
									
											return res.data
									})
		};
		return {
			getHomeData:getHomeData,
			nowplaying:nowplaying,
			comingsoon:comingsoon,
			filmInformData:filmInformData
		}
})
.directive('hideTabs',function($rootScope){
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            scope.$on('$ionicView.beforeEnter', function() {
                scope.$watch(attributes.hideTabs, function(value){
                    $rootScope.hideTabs = value;
                });
            });

            scope.$on('$ionicView.beforeLeave', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
})
.directive('hdb',function($rootScope,$ionicScrollDelegate){
    return {
        restrict: 'A',
        link: function($scope, element, attributes) {
//       console.dir(element[0])
			element[0].onscroll = function(){
			if (element[0].scrollTop >160) {
				$scope.$apply(function(){
//					console.log($scope.$parent)
					$scope.$parent.isshow= true;
				});
			} else{
					$scope.$apply(function(){
					$scope.$parent.isshow= false;
				});
			}
		}
			$scope.$parent.btnClick =function(){
//				console.log(1)
				$ionicScrollDelegate.scrollTop(true);
			}
        }
    };
})
.factory('filmss', function($http,$stateParams) {
		var nowplaying = function(arr){
			return $http.get("/api/film/now-playing?page="+(arr.length/7 + 1)+"&count=7")
									.then(function(res){
											return res.data
									})
		};
		var comingsoon = function(arr){
			return $http.get("/api/film/coming-soon?page="+(arr.length/7 + 1)+"&count=7")
									.then(function(res){
											return res.data
									})
		};
		return {
			nowplaying:nowplaying,
			comingsoon:comingsoon
		}
})
.factory('cinemaData', function($http,$stateParams) {
	var timer = new Date().getTime()
		var cinemaData = function(){
			return $http.get("	/api/cinema?__t="+ timer)
									.then(function(res){
											return res.data
									})
		};
		
		return {
			cinemaData:cinemaData
		}
})
.factory('cinemainfo', function($http,$stateParams) {
	var timer = new Date().getTime()
		var cinemaData = function(){
			return $http.get("/api/cinema/"+$stateParams.cinemaId+"?__t="+ timer)
									.then(function(res){
											return res.data
											console.log($stateParams.cinemaId)
									})
		};
		return {
			cinemaData:cinemaData
		}
})
.factory('addressdata', function($http,$stateParams) {
		var timer = new Date().getTime()
		var addressdata = function(){
			return $http.get("/api/city?__t="+ timer)
									.then(function(res){
											return res.data
											
									})
		};
		return {
			addressdata:addressdata
		}
})

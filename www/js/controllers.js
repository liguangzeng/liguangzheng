angular.module('starter.controllers', [])
	.controller('Address', function($scope, addressdata, $ionicScrollDelegate) {
		$scope.adcd = []
		$scope.cities = []
		addressdata.addressdata()
			.then(function(res) {
				var c = res.data.cities
				c.forEach(function(i) {
					if($.inArray(i.pinyin[0], $scope.adcd) == -1) {
						$scope.adcd.push(i.pinyin[0])
						var obj = { title: i.pinyin[0], list: [i], count: i.pinyin[0].charCodeAt() }
						$scope.cities.push(obj)
					} else {
						var f = $.inArray(i.pinyin[0], $scope.adcd)
						$scope.cities[f].list.push(i)
					}
				})

				$scope.exchange = function(l1, l2) {
					var x = $scope.cities[l1]
					$scope.cities[l1] = $scope.cities[l2]
					$scope.cities[l2] = x
				}
				for(var i = 0; i < $scope.cities.length - 1; i++) {
					var minindex = i
					for(var j = i + 1; j < $scope.cities.length; j++) {
						if($scope.cities[minindex].count > $scope.cities[j].count) {
							minindex = j
						}
					}
					$scope.exchange(minindex, i)
				}
			})

		$scope.tiao = function($event) {
			var c = $event.target.dataset.index
			var d = document.getElementsByClassName("ti" + c)[0].offsetTop
			console.dir(d)
			$ionicScrollDelegate.scrollTo(0, d, true);
		}
		$scope.add = function($event) {
			var c = $event.target.attributes.data.value
			console.log(c)
			var d = JSON.parse(c)
			$.cookie("cityId", d.id)
			$.cookie("cityName", d.name)
			document.getElementsByClassName("cv")[0].innerHTML = d.name
			//				console.log(document.getElementsByClassName("cv")[0])
			localStorage.setItem("account", c);
			window.location.href = "/#/tab/chats"
			location.reload()
		}
	})
	.controller('DashCtrl', ["$scope", "cinemaData", function($scope, cinemaData, $event) {
		$scope.adcd = []
		$scope.bbb = []
		cinemaData.cinemaData()
			.then(function(res) {
				var c = res.data.cinemas
				c.forEach(function(i) {
					if($.inArray(i.district.name, $scope.adcd) == -1) {
						$scope.adcd.push(i.district.name)
						var obj = { title: i.district.name, list: [i], isShow: false }
						$scope.bbb.push(obj)
					} else {
						var f = $.inArray(i.district.name, $scope.adcd)
						$scope.bbb[f].list.push(i)
					}
				})
				$scope.bbb[0].isShow = true
			})
		$scope.showli = function($event) {
			var i = $event.target.dataset.index
			$scope.bbb[i].isShow = !$scope.bbb[i].isShow
		}
	}])

	.controller("ChatsCtrl", ["$scope", "home", "$ionicScrollDelegate", function($scope, home, $ionicScrollDelegate) {

		$scope.isshow = false
		$scope.mainData = ""
		$scope.nowplaying = ""
		$scope.comingsoon = ""
		$scope.xianshi = false
		home.getHomeData()
			.then(function(data) {
				$scope.mainData = data.data.billboards
			})
		home.nowplaying()
			.then(function(data) {
				$scope.nowplaying = data.data.films
			})
		home.comingsoon()
			.then(function(data) {
				$scope.comingsoon = data.data.films

				$scope.comingsoon.forEach(function(item) {
					item.month = new Date(item.premiereAt).getMonth() + 1
					item.day = new Date(item.premiereAt).getDate()
				})
				$scope.xianshi = true
			})

	}])

	.controller('FilmInform', ["home", "$scope", function(home, $scope) {
		$scope.filmInformData = ''
		$scope.isShow = false
		home.filmInformData()
			.then(function(res) {
				$scope.filmInformData = res.data.film
				$scope.filmInformData.month = new Date($scope.filmInformData.premiereAt).getMonth() + 1
				$scope.filmInformData.day = new Date($scope.filmInformData.premiereAt).getDate()
				$scope.isShow = true
			})
	}])

	.controller('AccountCtrl', function($scope, $ionicScrollDelegate, $http, filmss) {
		$scope.nowingFilms = []
		$scope.comingFilms = []
		$scope.xianshi = false
		$scope.hahaShow = true
		$scope.heheShow = false
		$scope.hahaPage = 1
		$scope.hehePage = 1
		$scope.meile = false

		$scope.xq = ["0", "一", "二", "三", "四", "五", "六", "日"]
		//		document.getElementsByClassName("scroll-content")[0].style.backgroundColor = "#FFFFFF"
		$scope.top = 0
		$scope.haha = function() {
			document.getElementsByClassName("haha")[0].id = "nihao"
			document.getElementsByClassName("hehe")[0].id = "n"

			$scope.hahaShow = true

			$scope.heheShow = false
			//刷新之后就有类似vue中keep-alive效果直接跳转没有不知道为什么 
			$ionicScrollDelegate.scrollTo(0, $scope.top, true);
			$scope.top = document.getElementById("hua").scrollTop
			
			$scope.loadMore();

			$scope.meile = false
		}
		$scope.hehe = function() {
			document.getElementsByClassName("haha")[0].id = "n"
			document.getElementsByClassName("hehe")[0].id = "nihao"

			$scope.hahaShow = false

			$scope.heheShow = true

			$ionicScrollDelegate.scrollTo(0, $scope.top, true);
			$scope.top = document.getElementById("hua").scrollTop
		
			$scope.loadMore();
			$scope.meile = false

		}

		$scope.moreDataCanBeLoaded = function() {
			if($scope.hahaShow) {
				if($scope.hahaPage == 1) {
					return true
				} else {
					if($scope.hahaPage <= Math.round($scope.nowingFilms.length / 7)) {
						$scope.meile = true
						return false
					} else {
						return true
					}
				}
			} else {
				if($scope.hehePage == 1) {
					return true
				} else {
					if($scope.hehePage <= Math.round($scope.comingFilms.length / 7)) {
						$scope.meile = true
						return false
					} else {
						return true
					}
				}

			}
		}

		$scope.loadMore = function() {
			if($scope.hahaShow) {
				filmss.nowplaying($scope.nowingFilms)
					.then(function(res) {
						var c = res.data.films
						$scope.hahaPage = res.data.page.total
						$scope.nowingFilms = $scope.nowingFilms.concat(c)
						$scope.$broadcast('scroll.infiniteScrollComplete');

					})

			} else {
				filmss.comingsoon($scope.comingFilms)
					.then(function(res) {
						var c = res.data.films
						$scope.hehePage = res.data.page.total
						c.forEach(function(item) {
							item.month = new Date(item.premiereAt).getMonth() + 1
							item.day = new Date(item.premiereAt).getDate()
							var c = new Date(item.premiereAt).getDay() * 1
							item.data = $scope.xq[c]
						})
						$scope.comingFilms = $scope.comingFilms.concat(c)
						$scope.$broadcast('scroll.infiniteScrollComplete');

					})
			}

		}
		$scope.$on('stateChangeSuccess', function() {
			$scope.loadMore();
		});

	})
	.controller('Personal', function($scope) {
		//		document.getElementsByClassName("scroll-content")[0].style.backgroundColor = "#F6F6F6"
	})

	.controller('CinemaInform', function($scope, cinemainfo) {
		$scope.cinform = ''
		$scope.in = '暂无信息'
		cinemainfo.cinemaData()
			.then(function(res) {
				$scope.cinform = res.data.cinema
			})

		$scope.btnclick1 = function($event) {
			var c = $event.target.dataset.index
			$("#ai>li p").removeClass("xxk2")
			$("#ai>li p")[c].classList.add("xxk2")
			$("#ai>li").css("border-bottom", "1px solid #ccc")
			$("#ai>li")[c].style.borderBottom = "3px solid #FE8233"
			$scope.in = '暂无信息'
			$scope.cinform.services.forEach(function(i) {
				if(c == (i.type * 1 - 1)) {
					$scope.in = i.description
				}
			})

		}

	})
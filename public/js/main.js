/*
	//SNIPPET: DISABLE MOUSE WHEEL
document.onmousewheel = function() {
	stopWheel();
}
if (document.addEventListener) { 
	document.addEventListener('DOMMouseScroll', stopWheel, false);
}
function stopWheel(e) {
	if (!e) {
		e = window.event;
	}
	if (e.preventDefault) {
		e.preventDefault();
	} 
	e.returnValue = false; 
}

*/



$(document).ready(function() {});


//ANGULARJS
var app = angular.module('myApp', ['ngResource', 'ui.router', 'myAppApiService']);

app.config(['$httpProvider', '$sceDelegateProvider',
	function($httpProvider, $sceDelegateProvider) {
		$httpProvider.defaults.useXDomain = true;
		$sceDelegateProvider.resourceUrlWhitelist(['self', /^https?:\/\/(cdn\.)?quadramma.com/]);
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}
]);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
	$urlRouterProvider.otherwise('/'); //DEFAULT
});

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
	$stateProvider
		.state('/', {
			url: '^/',
			views: {
				'': {
					templateUrl: 'views/home.html',
					controller: 'homeCtrl'
				}
			}
		})
		.state('home', {
			url: '^/home',
			views: {
				'': {
					templateUrl: 'views/home.html',
					controller: 'homeCtrl'
				}
			}
		})
		.state('services', {
			url: '^/services',
			views: {
				'': {
					templateUrl: 'views/services.html'
						//controller: 'HomeController'
				}
			}
		})
		.state('location', {
			url: '^/location',
			views: {
				'': {
					templateUrl: 'views/location.html'
						//controller: 'HomeController'
				}
			}
		})
		.state('contact', {
			url: '^/contact',
			views: {
				'': {
					templateUrl: 'views/contact.html'
						//controller: 'HomeController'
				}
			}
		})
		.state('gallery', {
			url: '^/gallery',
			views: {
				'': {
					templateUrl: 'views/gallery.html'
						//controller: 'HomeController'
				}
			}
		});
});


app.factory('focus', function($timeout) {
	return function(selector, val) {
		$timeout(function() {
			var element = $(selector);
			if (element) {
				if (typeof val == 'undefined' || val == true) {
					element.focus();
				} else {
					if (typeof val !== 'undefined' && val == false) {
						element.focusout();
					}
				}

			}
		});
	};
});

app.factory('select', function($timeout) {
	return function(selector, callback) {
		$timeout(function() {
			var element = $(selector);
			callback(element);
		});
	};
});



app.controller("mainCtrl", function($scope, $state, $rootScope, $ws, focus, select, $timeout) {
	console.info("mainCtrl");

	//WEB-API
	//$rootScope.apiUrl = "http://www.quadramma.com/backend/api";
	//var ws = $ws.getController("wineyard", true); //ignore bad request !
	//ws.post({action: "register",ignorecache: true}, $scope.form, function(res) {	console.log(res);});

	$scope.go = function(where) {
		$state.go(where, {});
	};

});

app.controller("homeCtrl", function($scope, $state, $rootScope, $ws, focus, select, $timeout) {
	console.info("homeCtrl");

	$('.full-width').fullWidth({
			//maxHeight: 450, // maximum height of slider, px
			//minHeight: 375, // minimum height of slider, px
			//delay: 5000, // delay between slides, ms
			delay: 9999, // delay between slides, ms
			transition: 1000, // transition speed, ms
			//maxFont: 36, // maximum font size, px
			//minFont: 24 // minimum font size, px
		})
		.on('fws.start', function(e, data) {
			console.log('Moving ' + data.direction + ' from slide ' + data.status.previous + ' to slide ' + data.status.current);
		})
		.on('fws.finish', function(e, data) {
			console.log('Moved from slide ' + data.status.previous + ' to slide ' + data.status.current);
		});

});
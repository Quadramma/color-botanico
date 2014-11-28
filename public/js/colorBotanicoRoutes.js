app = angular.module("colorBotanicoRoutes", ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {


	$stateProvider.state('home', {
		url: '^/',
		templateUrl: 'views/home.html',
		controller: 'homeCtrl'
	});
	$stateProvider.state('apartaments', {
		url: '^/apartaments',
		templateUrl: 'views/apartaments.html',
		controller: 'apartamentsCtrl'

	});
	$stateProvider.state('services', {
		url: '^/services',
		templateUrl: 'views/services.html',
		controller: 'servicesCtrl'
	});
	$stateProvider.state('location', {
		url: '^/location',
		templateUrl: 'views/location.html'
	});
	$stateProvider.state('contact', {
		url: '^/contact',
		views: {
			'': {
				templateUrl: 'views/contact.html',
				controller: 'contactCtrl',
			}
			/*,
			'selectCountry@contact': {
				templateUrl: 'views/partial.selectCountry.html',
				controller: 'selectCountryCtrl'
			}*/

		}
	});
	$stateProvider.state('gallery', {
		url: '^/gallery',
		views: {
			'': {
				templateUrl: 'views/gallery.html',
				controller: 'galleryCtrl'
			}
		}
	});

	$stateProvider.state('/apartamentsA', {
		url: '^/apartamentsA',
		views: {
			'': {
				templateUrl: 'views/apartamentsA.html'
			}
		},
		onEnter: function() {
			app.anchorScroll();
		}
	});

	$stateProvider.state('/apartamentsB', {
		url: '^/apartamentsB',
		views: {
			'': {
				templateUrl: 'views/apartamentsB.html'
			}
		},
		onEnter: function() {
			app.anchorScroll();
		}
	});

	$stateProvider.state('/apartamentsC', {
		url: '^/apartamentsC',
		views: {
			'': {
				templateUrl: 'views/apartamentsC.html'
			}
		},
		onEnter: function() {
			app.anchorScroll();
		}
	});


});
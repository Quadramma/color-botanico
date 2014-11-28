//should be called 'app'
var app = angular.module('myApp', [

	'qjarvisCtrls', 'qjarvisRoutes', 'qjarvisConfig'

	, 'qjarvisApi', 'qjarvisLang',

	, 'colorBotanicoCtrls', 'colorBotanicoRoutes'
]);



app.controller("mainCtrl", function(
	$scope, $state, $rootScope, $api

	, focus, select, $timeout, $Lang, $timeout, $anchorScroll, $location) {
	console.info("mainCtrl");

	//WEB-API
	//$rootScope.apiUrl = "http://www.quadramma.com/backend/api";
	//var ws = $api.getController("wineyard", true); //ignore bad request !
	//ws.post({action: "register",ignorecache: true}, $scope.form, function(res) {	console.log(res);});

	//console.log('stateParams:');
	//console.info($state);



	$rootScope.nextApartamentSection = function() {
		var name = $state.current.name;
		var next = null;
		if (name == '/apartaments') {
			next = '/apartamentsA';
		} else {
			if (name == '/apartamentsA') {
				next = '/apartamentsB';
			} else {
				if (name == '/apartamentsB') {
					next = '/apartamentsC';
				} else {
					if (name == '/apartamentsC') {
						next = '/apartamentsA';
					}
				}
			}
		}

		if (next == null) {
			console.warn('Current section should be /apartaments /apartamentsA,B or C');
			return;
		}
		$timeout(function() {
			$location.hash('header');
			$state.go(next, {});
		});
		console.log('next:' + next);
	};



});
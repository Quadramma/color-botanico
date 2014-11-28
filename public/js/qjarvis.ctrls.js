var app = angular.module("qjarvisCtrls", []);

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

app.controller("appCtrl", function(

	$scope, $state, $rootScope, $api, $location

	, focus, select, $timeout) {
	console.info("appCtrl");


	$rootScope.openModal = function(selector) {
		if (typeof $rootScope.modalFixedArr == 'undefined') {
			$rootScope.modalFixedArr = {};
		}
		if (typeof $rootScope.modalFixedArr[selector] == 'undefined') {
			$rootScope.modalFixedArr[selector] = true;
			$(selector).bind('hidden.bs.modal', function() {
				$("html").css("margin-right", "0px");
			});
			$(selector).bind('show.bs.modal', function() {
				$("html").css("margin-right", "-15px");
			});
		}

		$timeout(function() {
			console.log('openModal -> ' + selector);
			$(selector).modal('show');
		});
	};

	//smooth scrolling to anchor. (uses location.hash)
	app.anchorScroll = function() {
		//$anchorScroll();
		if ($location.hash().toString().length > 0) {
			console.log($location.hash());
			$('html, body').animate({
				scrollTop: $($location.hash()).offset().top
			}, 500);
		}

	};


	$scope.carousel = function(selector, method) {
		$timeout(function() {
			$(selector).carousel(method);
		});
	};

	$scope.go = function(where) {
		//console.info('go :' + where);
		$state.go(where, {});
	};
	$scope.isState = function(state) {
		var rta = $state.current.name == state;
		//console.log('state ' + state + ' > ' + rta);
		return rta;
	};


});

/*
app.controller("selectCountryCtrl", function(
	$scope, $state, $rootScope, $api, focus, select, $timeout) {
	console.info("selectCountryCtrl");
	$timeout(function() {
		$('#select-country').selectize();
	});
});
*/
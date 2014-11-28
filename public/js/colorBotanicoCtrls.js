var app = angular.module("colorBotanicoCtrls", []);


app.controller("apartamentsCtrl", function(

	$scope, $state, $rootScope, $api, $location

	, focus, select, $timeout) {
	console.info("apartamentsCtrl");
});

app.controller("apartamentsACtrl", function(

	$scope, $state, $rootScope, $api, $location

	, focus, select, $timeout) {
	console.info("apartamentsACtrl");
});


app.controller("servicesCtrl", function(
	$scope, $state, $rootScope, $api

	, focus, select, $timeout, $Lang, $timeout) {
	console.info("servicesCtrl");
	$timeout(function() {
		googleTranslateElementInit($timeout);
	});
});


app.controller("homeCtrl", function(

	$scope, $state, $rootScope, $api

	, focus, select, $timeout) {
	console.info("homeCtrl");
	$timeout(function() {
		googleTranslateElementInit($timeout);
	});
	$timeout(function() {
		$('.carousel').carousel({
			interval: 5000
		});
	});
});

app.controller("contactCtrl", function(

	$scope, $state, $rootScope, $api

	, focus, select, $timeout) {
	console.info("contactCtrl");

	$scope.form = {};

	$scope.send = function() {
		console.info($scope.form);
	};

	$scope.initCountrySelect = function() {
		$timeout(function() {
			$('#select-country').selectize();
			console.log('initCountrySelect!');
		});
		$('#select-country').on('change', function(v, d) {
			$scope.form.pais = $("#select-country").next().find(".item").html();
		});
	}

	$timeout(function() {
		$('#dtpFrom').datetimepicker();
		$('#dtpFrom').on('dp.change', function(e) {
			$scope.form.fechaDesde = e.date._d;
		});

		$('#dtpTo').datetimepicker();
		$('#dtpTo').on('dp.change', function(e) {
			$scope.form.fechaHasta = e.date._d;
		});

		$('#apartamentType').selectize();
		$('#apartamentType').on('change', function(v) {
			$scope.form.tipoApartamento = $("#apartamentType").next().find(".item").html();
		});



	});
});
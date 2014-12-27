var app = angular.module("colorBotanicoCtrls", [])


.run(function($rootScope) {


	$rootScope.lang = store.get('CBOTANICO_LANG') || {
		spa: true,
		eng: false
	};
	$rootScope.setLang = function(name) {
		for (var x in $rootScope.lang) {
			if (x == name) {
				$rootScope.lang[x] = true;
			} else {
				$rootScope.lang[x] = false;
			}
		}
		store.set('CBOTANICO_LANG', $rootScope.lang);
		$rootScope.$emit('setLang', {
			name: name
		});
	};
	$rootScope.isLangActive = function(name) {
		for (var x in $rootScope.lang) {
			if (x == name) {
				return $rootScope.lang[name] == true;
			}
		}
	};


	$rootScope
		.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams) {
				//console.log("State Change: transition begins!");
			});

	$rootScope
		.$on('$stateChangeSuccess',
			function(event, toState, toParams, fromState, fromParams) {
				//console.log("State Change: State change success!");
				//console.info(toState);
				if (toState.name == 'location') {
					$rootScope.tripadvisor = true;
				} else {
					$rootScope.tripadvisor = false;
				}
			});
	/*
		$rootScope
			.$on('$stateChangeError',
				function(event, toState, toParams, fromState, fromParams) {
					console.log("State Change: Error!");
				});

		$rootScope
			.$on('$stateNotFound',
				function(event, toState, toParams, fromState, fromParams) {
					console.log("State Change: State not found!");
				});

		$rootScope
			.$on('$viewContentLoading',
				function(event, viewConfig) {
					console.log("View Load: the view is loaded, and DOM rendered!");
				});

		$rootScope
			.$on('$viewcontentLoaded',
				function(event, viewConfig) {
					console.log("View Load: the view is loaded, and DOM rendered!");
				});
			*/

})


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
		$('#myCarousel').carousel({
			interval: 5000
		});
	});
});

app.controller("contactCtrl", function(

	$scope, $state, $rootScope, $api

	, focus, select, $timeout) {
	console.info("contactCtrl");

	$scope.form = {
		nombreyapellido: '',
		tipoApartamento: '',
		email: '',
		telefono: '',
		pais: '',
		dtpFrom: '',
		dtpTo: '',
		comentario: '',
	};

	$scope.send = function() {
		console.info($scope.form);

		//validations
		var successValidation = true;
		var field = '';

		field = 'nombreyapellido';
		if (!$scope.form[field] || $scope.form[field] == null || $scope.form[field] == "" || $scope.form[field].length == 0) {
			focus("form #fullname");
			successValidation = false;
		}
		field = 'email';
		if (!$scope.form[field] || $scope.form[field] == null || $scope.form[field] == "" || $scope.form[field].length == 0) {
			focus("form #email");
			successValidation = false;
		}
		field = 'telefono';
		if (!$scope.form[field] || $scope.form[field] == null || $scope.form[field] == "" || $scope.form[field].length == 0) {
			focus("form #phone");
			successValidation = false;
		}
		field = 'dtpFrom';
		if (!$scope.form[field] || $scope.form[field] == null || $scope.form[field] == "" || $scope.form[field].length == 0) {
			focus("form #dtpFrom");
			successValidation = false;
		}
		field = 'dtpTo';
		if (!$scope.form[field] || $scope.form[field] == null || $scope.form[field] == "" || $scope.form[field].length == 0) {
			focus("form #dtpTo");
			successValidation = false;
		}
		if (!successValidation) {
			return;
		}


		$.post("email/index.php", $scope.form)
			.done(function(data) {
				console.info(data);


				$scope.showPopUp(data);


			})
			.fail(function() {
				$scope.showPopUp('Server error');
			})
			.always(function() {

			});
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



	$scope.initDtp = function(name) {
		//$rootScope.initDtpBase(name, $scope.form);

		$timeout(function() {
			var options = {
				autoclose: true,
				todayHighlight: true,
				language: 'en'
			};
			if ($rootScope.isLangActive('spa')) {
				options['language'] = "es";
			}
			//console.info('init dtp para ' + name + ' with options ' + JSON.stringify(options));
			$('#' + name).datepicker(options);
			$('#' + name).on('changeDate', function(e) {
				//console.info('changeDate');
				//console.info(e);
				$scope.form[name] = e.date;
			});
		});

		//
		$rootScope.$on('setLang', function(p, p2) {
			$scope.initDtp(name);
		});

	};


	$timeout(function() {

		/*
		$('#dtpFrom').datetimepicker();
		$('#dtpFrom').on('dp.change', function(e) {
			$scope.form.fechaDesde = e.date._d;
		});

		$('#dtpTo').datetimepicker();
		$('#dtpTo').on('dp.change', function(e) {
			$scope.form.fechaHasta = e.date._d;
		});*/

		$('#apartamentType').selectize();
		$('#apartamentType').on('change', function(v) {
			$scope.form.tipoApartamento = $("#apartamentType").next().find(".item").html();
		});

	});

	function autoCloseMessage() {
		$timeout(function() {
			/*
			$('.alert-autocloseable-success').hide();
			$('.alert-autocloseable-warning').hide();
			$('.alert-autocloseable-danger').hide();
			$('.alert-autocloseable-info').hide();
	*/

			$scope.showPopUp = function(result) {

				var selector = ''
				if (result == '1') {
					selector = '.alert-cbotanico-success';
				} else {
					selector = '.alert-cbotanico-fail';
				}

				//$('#autoclosable-btn-info').prop("disabled", true);
				//$('.alert-autocloseable-info p').html(txt);
				$(selector).show();
				$(selector).delay(6000).fadeOut("slow", function() {
					// Animation complete.
					//$('#autoclosable-btn-info').prop("disabled", false);
				});

			};

		});

	}
	autoCloseMessage();

	/*
		$timeout(function() {
			$scope.showPopUp('Esto es una prueba');
		}, 3000);
	*/

});


app.controller("galleryCtrl", function(

	$scope, $state, $rootScope, $api

	, focus, select, $timeout) {
	console.info("galleryCtrl");
	$timeout(function() {
		googleTranslateElementInit($timeout);
	});
	$timeout(function() {
		$('#galleryCarousel').carousel({
			interval: 5000
		});
	});
});
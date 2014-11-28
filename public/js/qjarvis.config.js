var app = angular.module("qjarvisConfig", []);
app.config(['$httpProvider', '$sceDelegateProvider',
	function($httpProvider, $sceDelegateProvider) {
		$httpProvider.defaults.useXDomain = true;
		$sceDelegateProvider.resourceUrlWhitelist(['self', /^https?:\/\/(cdn\.)?quadramma.com/]);
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}
]);
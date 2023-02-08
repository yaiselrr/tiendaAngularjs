'use strict';

app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
	
	$routeProvider
		.when('/', {
			templateUrl: 'components/compras/compras.html',
			controller: 'comprasCtrl'
		})
		.when('/resumen-compras', {
			templateUrl: 'components/compras/resumen.html',
			controller: 'comprasCtrl'
		})
		.otherwise({
			redirectTo: 'pagina-no-encontrada.html'
		});

}]);
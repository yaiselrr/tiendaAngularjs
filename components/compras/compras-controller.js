'use strict';

app.controller('comprasCtrl', ['$scope', 'comprasService', '$location', function ($scope, comprasService, $location) {    

    $scope.carrito = [];
    $scope.products = [];
    $scope.resumenCarrito = comprasService.resumenCompra($scope);
    $scope.resumenTotalCompra = comprasService.resumenTotalCompra($scope);
    $scope.subTotal = 0;
    $scope.total = 0;

    comprasService.get($scope);

    $scope.agregarItem = function (product) {

        comprasService.agregarItem(product, $scope);
    };

    $scope.quitarItem = function (itemCart) {

        comprasService.quitarItem(itemCart, $scope);
    };

    $scope.efectuarCompra = function () {

        comprasService.efectuarCompra($scope);
    };

    $scope.cancelarCompra = function () {

        comprasService.cancelarCompra($scope);
    };
}]);
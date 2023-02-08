'use strict';

app.factory('comprasService', ['$http', '$location', 'sessionsControl', 'apiUrl', function ($http, $location, sessionsControl, apiUrl) {

    var cacheSession = function (datos) {
        sessionsControl.setList("productos", datos.productos);
        sessionsControl.setList("carrito", datos.carrito);
        sessionsControl.set("total", datos.total);
    }

    var unCacheSession = function () {
        sessionsControl.unset("productos");
        sessionsControl.unset("carrito");
        sessionsControl.unset("total");
    }

    return {
        get: function ($scope) {
            var validate = $http.get(
                `${apiUrl.servidor}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            validate.then(function (response) {
                    if (response.data) {
                        $scope.products = response.data;
                    }
                },
                function (response) {
                    console.log(response);
                });
        },

        agregarItem: function (p, $scope) {
            var itemActual;
            $scope.carrito.forEach(element => {
                if (element.id == p.Id) {
                    console.log(element);
                    itemActual = element;
                }
            });

            if (!itemActual) {
                var itemNuevo = {
                    id: p.Id,
                    categoria: p.Categoria,
                    producto: p.Producto,
                    precio: p.Precio,
                    cantidad: 1
                };

                $scope.carrito.push(itemNuevo);
                this.setTotal($scope);
                console.log('carrito' + $scope.carrito);
            } else {
                itemActual.cantidad++;
                this.setTotal($scope);
            }
        },

        quitarItem: function (itemCart, $scope) {
            if (itemCart.cantidad > 1) {
                itemCart.cantidad--;
                this.setTotal($scope);
            } else {
                $scope.carrito.splice($scope.carrito.indexOf(itemCart), 1);
                this.setTotal($scope);
            }

        },

        setTotal: function ($scope) {
            if ($scope.carrito.length == 0) {
                $scope.total = 0;
            } else {
                $scope.carrito.forEach(element => {
                    $scope.subTotal += element.precio * element.cantidad;
                });
                $scope.total = $scope.subTotal;
                $scope.subTotal = 0;
            }
        },

        efectuarCompra: function ($scope) {
            if ($scope.carrito.length == 0) {
                alert("Necesita agregar productos al carrito");
            } else {
                cacheSession($scope);
                $scope.resumenCarrito = sessionsControl.get("carrito");
                $scope.carrito = [];
                $scope.total = 0;
            }
        },

        cancelarCompra: function ($scope) {
            if ($scope.carrito.length == 0) {
                alert("No hay productos en el carrito");
            } else {
                unCacheSession($scope);
                $scope.carrito = [];
                $scope.total = 0;
            }
        },

        resumenCompra: function ($scope) {
            return sessionsControl.getList("carrito");
        },

        resumenTotalCompra: function ($scope) {
            return sessionsControl.getList("total");
        }

    };

}])
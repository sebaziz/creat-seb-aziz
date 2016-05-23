angular.module('Creative')
	.controller('orderUpdateCtrl', ['$scope', '$http', '$routeParams', '$location', 'GlobalService', 'userResolve',
		function ($scope, $http, $routeParams, $location, GlobalService, userResolve) {

			$http.get('/api/orders/'+$routeParams.id)
			.success(function(order) {
				$scope.order = order;
				$scope.title = order.title;
			})
			.error(function(err) {
				console.log('Error: ' + err);
			});
			$scope.submit = function() {
				if(GlobalService.validateArticleForm($scope.order, 'Mis à jour')) {
					$scope.order.updater = userResolve.getInfo().id;
					$http.put('/api/orders/' + $routeParams.id, $scope.order)
						.success(function (data) {
							$location.path("/order/profile/" + $routeParams.id);
						})
						.error(function (err) {
							console.log('Erreur: ' + err);
						});
				}
			};

		}
	]);
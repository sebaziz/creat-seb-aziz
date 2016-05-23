angular.module('Creative')
	.controller('ordersCtrl', ['$scope', '$http', 'userResolve', 'Notification', 'GlobalService',
		function ($scope, $http, userResolve, Notification, GlobalService) {

			$scope.userStat = userResolve.getStatus();
			if($scope.userStat) {
				$scope.user = userResolve.getInfo();
			}

			$scope.infiniteOrders = [];
			$scope.isBusy = false;
			$scope.loadMore = function() {
				$scope.isBusy = true;
				$http.post('/api/infinite/orders', {orderTotalCount : $scope.infiniteOrders.length})
					.success(function(newlyLoadedOrders) {
						Array.prototype.push.apply($scope.infiniteOrders, newlyLoadedOrders);
						$scope.isBusy = false; // request processed
					})
					.error(function(err) {
						//console.log("Error on getting infinite order.", err);
					});
			};
			$scope.loadMore();

			$scope.submitOrder = function(orders) {
				if(GlobalService.validateOrderForm(orders, 'create')) {
					orders.author = $scope.user.id;
					orders.updater = $scope.user.id;
					$http.post('/api/orders', orders)
						.success(function(data) {
							data.id = data._id;
							delete data._id;
							data.author = {
								id: data.author,
								username: $scope.user.username
							};
							Array.prototype.push.apply($scope.infiniteOrders, [data]);
						})
						.error(function(err) {
							console.log('Error: ' + err);
						});
				}
			};

			$scope.delete = function(id, title) {
				$http.delete('/api/orders/'+id)
					.success(function(data) {
						Notification.success({message: 'Successfully deleted order: '+title+' !'});
						$scope.infiniteOrders = [];
						$scope.loadMore();
					})
					.error(function(err) {
						console.log('Error: ' + err);
					});
			};

		}
	]);
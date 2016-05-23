angular.module('Creative')
	.controller('orderListCtrl', ['$scope', '$http', 'userResolve', 'Notification', 'GlobalService', function ($scope, $http, userResolve, Notification, GlobalService) {

		$http.get('/api/orders')
			.success(function(data) {
				console.log("list orders ", data);
				$scope.orders = data;
				$scope.search = lol($scope);
			})
			.error(function(err) {
				console.log('orderListCtrl Error: ' + err);
			});

		function lol($scope) {
			return GlobalService.getProperty();
		}

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
					console.log("Error on getting infinite order.", err);
				});
		};
		$scope.loadMore();

		$scope.submitArticle = function(orders) {
			if(GlobalService.validateArticleForm(orders, 'create')) {
				orders.author = $scope.user.id;
				$http.post('/api/orders', orders)
					.success(function(data) {
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
					Notification.success({message: 'Successfully deleted orders: '+title+' !'});
					$scope.infiniteArticles = [];
					$scope.loadMore();
				})
				.error(function(err) {
					console.log('Error: ' + err);
				});
		};


	}]);
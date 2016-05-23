angular.module('Creative')
	.directive('userOrder', ['GlobalService', '$http', '$routeParams', 'Notification', function(GlobalService, $http, $routeParams, Notification) {
		return {
			templateUrl: 'client/users/profile/userOrders/userOrder.html',
			link: function (scope, element, attrs) {

				scope.currentPage = 1;
				scope.pageSize = 10;

				$http.get('/api/orders/user/' + $routeParams.id)
					.success(function(postedOrders) {
						angular.forEach(postedOrders, function(order, key) {
							order.status = {};
							if(order.content === null) {
								// if deleted
								order.status.msg = (order.author === order.updater.id ? "Deleted safely." : "Deleted by admin : ");
								order.status.state = (order.author === order.updater.id ? 0 : 2);
							}
							else {
								// if not deleted
								if(order.created === order.updated) {
									// if not updated since creation
									order.status.msg = "Created on safely.";
									order.status.state = 0;
								}
								else {
									// if updated
									order.status.msg = (order.author === order.updater.id ? "Updated safely." : "Updated by admin : ");
									order.status.state = (order.author === order.updater.id ? 0 : 1);
								}
							}
						});
						scope.postedOrders = postedOrders;
					})
					.error(function(err) {
						console.log('Error: ' + err);
					});

			}
		};
	}]);


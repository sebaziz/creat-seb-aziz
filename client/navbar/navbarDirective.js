
angular.module('Creative')
	.directive('navBar', ['GlobalService', '$location', '$route', function(GlobalService, $location, $route) {
		return {
			templateUrl: 'client/navbar/navbar.html',
			link: function (scope, element, attrs) {

				scope.user = null;
				scope.$on('auth:logged', function(event,data) {
					scope.user = data;
				});
				scope.$on('auth:logout', function(event) {
					scope.user = null;
				});


				scope.search = "";
				scope.searchQuery = function() {
					GlobalService.setProperty(scope.search);
					if ($location.path() == '/orders/list'){
						$route.reload();
						$location.path('/orders/list');
					}
					else
						$location.path('/orders/list');
				}

			}
		};
	}]);



angular.module('Creative')
	.controller('listUsersCtrl', ['$scope', '$http', function ($scope, $http) {

		$scope.infiniteUsers = [];
		$scope.isBusy = false;
		$scope.loadMore = function() {
			$scope.isBusy = true;
			$http.post('/api/infinite/users', {userTotalCount : $scope.infiniteUsers.length})
				.success(function(newlyLoadedUsers) {
					Array.prototype.push.apply($scope.infiniteUsers, newlyLoadedUsers);
					$scope.isBusy = false; // request processed
				})
				.error(function(err) {
					console.log("Error on getting infinite order.", err);
				});
		};
		$scope.loadMore();

	}]);
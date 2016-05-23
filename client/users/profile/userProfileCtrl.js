angular.module('Creative')
	.controller('userProfileCtrl', ['$scope', '$http', '$routeParams', 'userResolve', 'AuthService', '$location', 'Notification',
		function ($scope, $http, $routeParams, userResolve, AuthService, $location, Notification) {

			// If user not profile owner / admin, send to own profile
			$scope.loggedUser = userResolve.getInfo();
			if($scope.loggedUser.id !== $routeParams.id &&  $scope.loggedUser.role !== 0) {
				$location.path("/user/profile/" + $scope.loggedUser.id);
			}

			$http.get('/api/users/'+$routeParams.id)
				.success(function(user) {
					$scope.user = user;
				})
				.error(function(err) {
					console.log('Error: ' + err);
				});

			$scope.deleteAccount = function() {
				$http.delete('/api/users/'+$scope.loggedUser.id)
					.success(function(user) {
						Notification.success({message : "Successfully deleted your account."});
						AuthService.logout()
							.then(function () {
								$location.path('/login');
							});
					})
					.error(function(err) {
						console.log('Error: ' + err);
					});
			}
		}
	]);
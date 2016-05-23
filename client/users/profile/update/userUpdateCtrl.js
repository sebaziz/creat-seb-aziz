angular.module('Creative')
	.controller('userUpdateCtrl', ['$scope', '$http', '$routeParams', '$location', 'GlobalService', 'userResolve',
		function ($scope, $http, $routeParams, $location, GlobalService, userResolve) {

			// If user not profile owner / admin, send to own profile
			$scope.loggedUser = userResolve.getInfo();
			if($scope.loggedUser.id !== $routeParams.id &&  $scope.loggedUser.role !== 0) {
				$location.path("/user/profile/" + $routeParams.id);
			}

			$http.get('/api/users/'+$routeParams.id)
				.success(function(user) {
					$scope.user = user;
					$scope.username = user.username;
				})
				.error(function(err) {
					console.log('Error: ' + err);
				});
			$scope.submit = function() {
				if(GlobalService.validateUserForm($scope.user)) {
					$http.put('/api/users/' + $routeParams.id, $scope.user)
						.success(function (data) {
							$location.path("/user/profile/" + $routeParams.id);
						})
						.error(function (err) {
							console.log('Error: ' + err);
						});
				}
			};



		}
	]);
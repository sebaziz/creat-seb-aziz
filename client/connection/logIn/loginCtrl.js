angular.module('Creative')
	.controller('loginCtrl', ['$scope', '$location', 'AuthService', '$http', 'Notification',
		function ($scope, $location, AuthService, $http, Notification) {

			$scope.user = {};
			$scope.submitLogin = function() {
				$http.get('/api/username/'+$scope.user.username)
					.success(function(user) {
						if(user.access === 0 || typeof user === 'string') {
							// Call login from Auth Service
							AuthService.login($scope.user)
								// handle success
								.then(function () {
									//AuthService.notif("success", "Welcome back " + $scope.user.username + " !!");
									$location.path('/orders');
									//$location.path('/user/profile/'+user._id);
								})
								// handle error
								.catch(function () {
									$scope.user = {};
								});
						} else {
							console.log("user", typeof user);
							Notification.error({message: "Sorry but you have been blocked by an admin. LOL"});
						}
					})
					.error(function(err) {
						console.log('Error: ' + err);
					});
			}

		}
	]);
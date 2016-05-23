angular.module('Creative')
	.controller('signUpCtrl', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {

		$scope.user = {};
		$scope.submitSignup = function() {
			// call register from service
			AuthService.register($scope.user)
				// handle success
				.then(function () {
					$location.path('/login');
				})
				// handle error
				.catch(function () {
					$scope.user = {};
				});
		}

	}]);
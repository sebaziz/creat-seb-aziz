angular.module('Creative')
	.controller('logoutCtrl', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {

		AuthService.logout()
			.then(function () {
				$location.path('/login');
			});

	}]);
angular.module('Creative')
	.controller('NotFoundCtrl', ['$scope', '$location', function ($scope, $location) {

		$scope.error = $location.search();
		if(!$scope.error.code) {
			$scope.error = {
				code: 404,
				title: 'Page Not Found.',
				msg: "We're sorry but the page that you have requested does not exist !"
			}
		}

	}]);
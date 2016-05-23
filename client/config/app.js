
angular.module('Creative', [
	'ngRoute',
	'ui-notification',
	'ngFileUpload',
	'infinite-scroll',
	'angularUtils.directives.dirPagination',
	'angularFileUpload',
	'ngCookies',
	'ui.bootstrap'
])

	.controller('MainCtrl', ['$scope', function ($scope) {
		$scope.test = "poptarts !";
	}])

	.controller('testCtrl', ['$scope', '$http',
		function ($scope, $http) {
			$scope.test = "poptarts !";
		}])

	.service('GlobalService', function (Notification) {
		var property = "";

		return {
			getProperty: function () {
				return property;
			},
			setProperty: function(value) {
				property = value;
			},
			validateOrderForm: function(order, type) {
				var returnValue = false,
						successMsg = {
							create : 'Successfully published a new order!',
							update : 'Successfully modified an order!'
						};
				switch(true) {
					case (typeof order === 'undefined' || order.title === "" && order.content === ""):
						Notification.error({message: "Please fill in the needed information to post a new order."});
						break;
					case (typeof order.title === 'undefined' || order.title === ""):
						Notification.error({message: "Cannot post an order without a title!"});
						break;
					case (typeof order.img === 'string' && order.img !== '' && /(https?:\/\/.*\.(?:jpg|jpeg|png|gif))/i.test(order.img) === false):
						Notification.error({message: "Picture link is invalid!"});
						break;
					case (typeof order.content === 'undefined' || order.content === ""):
						Notification.error({message: "Cannot post an order without a content!"});
						break;
					default:
						returnValue = true;
						Notification.success({message: successMsg[type]});
				}
				return returnValue;
			},
			validateUserForm: function(user) {
				var returnValue = false;
				switch(true) {
					case (user.email === "" && user.username === ""):
						Notification.error({message: "Please fill in the needed information to update the profile."});
						break;
					case (user.username === ""):
						Notification.error({message: "Cannot update profile without username!"});
						break;
					case (user.email === ""):
						Notification.error({message: "Cannot update profile without email!"});
						break;
					default:
						returnValue = true;
						Notification.success({message: "Successfully modified the profile!"});
				}
				return returnValue;
			}
		};
	});

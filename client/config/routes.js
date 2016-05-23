angular.module('Creative')

	.config(['$routeProvider', '$locationProvider', 'NotificationProvider',
		function($routeProvider, $locationProvider, NotificationProvider) {

			NotificationProvider.setOptions({
				delay: 3000,
				startTop: 60,
				startRight: 10,
				verticalSpacing: 20,
				horizontalSpacing: 20,
				positionX: 'right',
				positionY: 'top'
			});


			// Système de routage
			$routeProvider
				.when('/', {
					templateUrl: 'client/home/creative-home.html',
					//templateUrl: 'client/home/home.html',
					controller: 'HomeCtrl',
					access: {restricted: false}
				})
				.when('/login', {
					templateUrl: 'client/connection/login/login.html',
					controller: 'loginCtrl',
					access: {restricted: false}
				})
				.when('/signUp', {
					templateUrl: 'client/connection/signUp/signUp.html',
					controller: 'signUpCtrl',
					access: {restricted: false}
				})
				.when('/logout', {
					templateUrl: 'client/connection/logout/logout.html',
					controller: 'logoutCtrl',
					access: {restricted: true}
				})
				.when('/admin/listUsers', {
					templateUrl: 'client/users/admin/listUsers/list.html',
					controller: 'listUsersCtrl',
					access: {restricted: true}
				})
				.when('/user/profile/:id', {
					templateUrl: 'client/users/profile/userProfile.html',
					controller: 'userProfileCtrl',
					access: {restricted: true},
					resolve: {
						userResolve: function(AuthService) {
							return getResolve(AuthService);
						}
					}
				})
				.when('/user/update/:id', {
					templateUrl: 'client/users/profile/update/userUpdate.html',
					controller: 'userUpdateCtrl',
					access: {restricted: false},
					resolve: {
						userResolve: function(AuthService) {
							return getResolve(AuthService);
						}
					}
				})
				.when('/orders', {
					templateUrl: 'client/orders/orders.html',
					controller: 'ordersCtrl',
					access: {restricted: false},
					resolve: {
						userResolve: function(AuthService) {
							return getResolve(AuthService);
						}
					}
				})
				.when('/order/profile/:id', {
					templateUrl: 'client/orders/profile/orderProfile.html',
					controller: 'orderProfileCtrl',
					access: {restricted: false},
					resolve: {
						userResolve: function(AuthService) {
							return getResolve(AuthService);
						}
					}
				})
				.when('/order/update/:id', {
					templateUrl: 'client/orders/update/orderUpdate.html',
					controller: 'orderUpdateCtrl',
					access: {restricted: true},
					resolve: {
						userResolve: function(AuthService) {
							return getResolve(AuthService);
						}
					}
				})
				.when('/orders/list', {
					templateUrl: 'client/orders/list/orderList.html',
					controller: 'orderListCtrl',
					access: {restricted: false},
					resolve: {
						userResolve: function(AuthService) {
							return getResolve(AuthService);
						}
					}
				})
				.when('/You-Shall-Not-Pass!!', {
					templateUrl : 'client/404/404.html',
					controller: 'NotFoundCtrl',
					access: {restricted: false}
				});

			$locationProvider.html5Mode({enabled: true});

			function getResolve(AuthService) {
				return {
					getStatus : AuthService.getUserStatus,
					getInfo   : AuthService.getUserInfo

				}
			}

		}
	])

	.run(function ($rootScope, $location, $route, AuthService) {
		$rootScope.$on('$routeChangeStart', function (event, next, current) {
			if (next.access.restricted && AuthService.isLoggedIn() === false) {
				$location.search({
					code: 401, title: 'Bad Request.',
					msg: "We're sorry but you don't have the permission to access the requested page !"
				});
				$location.path('/You-Shall-Not-Pass!!');
				$route.reload();
			}
		});
	});

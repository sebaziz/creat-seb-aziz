
angular.module('Creative')
	.factory('AuthService', ['$q', '$timeout', '$http', '$rootScope', 'Notification', 'albumProvider',
		function ($q, $timeout, $http, $rootScope, Notification, albumProvider) {

			// create user variable
			var user = null,
					userInfo = null;

			// return available functions for use in controllers
			return ({
				isLoggedIn: function() {
					return (user !== null);
				},
				getUserStatus: function() {
					return user;
				},
				getUserInfo: function() {
					return userInfo;
				},
				login: function(loggingUser) {
					// create a new instance of deferred
					var deferred = $q.defer();

					// send a post request to the server
					$http.post('/api/user/login', loggingUser)
						// handle success
						.success(function (data, status) {
							if(status === 200){
								Notification.success({message: 'Bienvenu sur votre espace client ' + data.username + ' !'});
								user = true;
								userInfo = data;
								$rootScope.$broadcast('auth:logged', data);
								deferred.resolve();
							} else {
								user = false;
								deferred.reject();
							}
						})
						// handle error
						.error(function (data) {
							Notification.error({message: data.err.message});
							user = false;
							deferred.reject();
						});

					// return promise object
					return deferred.promise;
				},
				logout: function() {
					// create a new instance of deferred
					var deferred = $q.defer();
					// send a get request to the server
					$http.get('/api/user/logout')
						// handle success
						.success(function (data) {
							Notification.success({message: 'À bientôt ' + userInfo.username + ' !'});
							$rootScope.$broadcast('auth:logout');
							user = false;
							userInfo = null;
							deferred.resolve();
						})
						// handle error
						.error(function (data) {
							Notification.error({message: data.err.message});
							user = false;
							deferred.reject();
						});

					// return promise object
					return deferred.promise;
				},
				register: function(newUser) {
					// create a new instance of deferred
					var deferred = $q.defer();
					// send a post request to the server
					$http.post('/api/user/register', newUser)
						// handle success
						.success(function (data, status) {
							if(status === 200 && data.status){
								console.log("newUser : ", newUser);
								var album = {
									title: newUser.username,
									name: newUser.username,
									date: moment(new Date()).format("YYYY/MM/DD"),
									description: "A user log"
								};
								albumProvider.addAlbum(album, function (err, album) {
									//TODO :: do something with album ?
									Notification.success({message: 'Enregistrement réussi!'});
									deferred.resolve();
								});
							} else {
								deferred.reject();
							}
						})
						// handle error
						.error(function (data) {
							Notification.error({message: data.err.message});
							deferred.reject();
						});

					// return promise object
					return deferred.promise;
				}
			});

		}
	]);
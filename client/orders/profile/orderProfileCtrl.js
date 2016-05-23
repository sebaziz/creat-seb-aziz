angular.module('Creative')
	.controller('orderProfileCtrl', ['$scope', '$http', '$routeParams', 'userResolve', 'Notification', '$location',
		function ($scope, $http, $routeParams, userResolve, Notification, $location) {

			$scope.userStat = userResolve.getStatus();
			if($scope.userStat) {
				$scope.user = userResolve.getInfo();
			}
			$http.get('/api/orders/'+$routeParams.id)
				.success(function(data) {

					//data.img = AuthService.validatePicture(data.img);
					// Get author
					$http.get('/api/users/'+data.author)
						.success(function(author) {
							data.author = {
								id: author._id,
								username: author.username
							}
						})
						.error(function(err) {
							console.log("Erreur lors de l'obtention pour["+key+"] author : ", err);
						});
						$scope.order = data;

				})
				.error(function(err) {
					console.log('Error: ' + err);
				});

			$scope.delete = function(id, title) {
				$http.delete('/api/orders/'+id)
					.success(function(data) {
						Notification.success({message: 'la commande a été supprimer avec succès: '+title+' !'});
						$location.path('/orders');
					})
					.error(function(err) {
						console.log('Erreur: ' + err);
					});
			}

			}

	]);
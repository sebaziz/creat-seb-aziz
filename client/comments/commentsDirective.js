angular.module('Creative')
	.directive('comments', ['$routeParams', '$http', 'Notification', function($routeParams, $http, Notification) {
		return {
			templateUrl: 'client/comments/comments.html',
			restrict: 'E',
			scope: {
				user: '=user'
			},
			link: function (scope, element, attrs) {

				scope.$watch('user', function(data) {
					scope.user = data;
				});

				// Get comments
				$http.get('/api/comments/'+$routeParams.id)
					.success(function(comments) {
						angular.forEach(comments, function (comment) {
							$http.get('/api/users/'+comment.author)
								.success(function(author) {
									comment.authorName = author.username;
								})
								.error(function(err) {
									console.log('Error: ' + err);
								});
						});
						scope.comments = comments;
					})
					.error(function(err) {
						console.log('Error: ' + err);
					});

				scope.submitComment = function(msg) {
					if(msg) {

						 // WOrking code
						var comment = {
							order: $routeParams.id,
							author: scope.user.id,
							comment: msg
						};

						$http.post('/api/comments', comment)
							.success(function(new_comment) {
								new_comment.authorName = scope.user.username;
								scope.comments.push(new_comment);
							})
							.error(function(err) {
								console.log('Error: ' + err);
							});

					}
					else {
						Notification.error({message: "NEIN!! Thou shalt not post an empty comment!"});
					}

				};

				scope.deleteComment = function(id) {
					$http.delete('/api/comments/'+id)
						.success(function(new_comment) {
							angular.forEach(scope.comments, function(comment, index) {
								if(comment._id === id)
									scope.comments.splice(index, 1);
							});
						})
						.error(function(err) {
							console.log('Error: ' + err);
						});
				}

			}
		};
	}]);
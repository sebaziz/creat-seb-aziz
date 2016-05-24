angular.module('Creative')
	.controller('ordersCtrl', ['$scope', '$http', 'userResolve', 'Notification', 'GlobalService', 'albumProvider',
		function ($scope, $http, userResolve, Notification, GlobalService, albumProvider) {

			$scope.userStat = userResolve.getStatus();
			if($scope.userStat) {
				$scope.user = userResolve.getInfo();
				$scope.album_name = userResolve.getInfo().username;
			}

			console.log("date with moment: ", moment(new Date()).format("YYYY/MM/DD"));

			$scope.album_name = $scope.user.username;
			$scope.page_load_error = "";
			$scope.descriptions = {};

			albumProvider.getPhotosForAlbum($scope.album_name, function (err, photos) {
				if (err) {
					if (err.code == "not_found")
						$scope.page_load_error = "No such album. Are you doing this right?";
					else
						$scope.page_load_error = "Unexpected error loading page: " + err.code + " " + err.message;
				} else {
					$scope.photos = photos;
					$scope.uploader = albumProvider.getUploader($scope.album_name, $scope);
					console.log('uploader : ', $scope.uploader);

					$scope.uploader.bind("completeall", function (event, items) {
						$scope.done_uploading = true;
						albumProvider.albumChanged($scope.album_name);
					});


					$scope.uploader.bind("beforeupload", function (event, item) {
						console.log("item : ", item);
						var fn = _fix_filename(item.file.name);
						var d = item.file.lastModifiedDate;
						var dstr = d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate();

						item.formData = [{
							filename: fn,
							date: dstr ? dstr : "",
							description: $scope.descriptions[item.file.name]
						}];
					});
				}
			});

			function _fix_filename(fn) {
				if (!fn || fn.length == 0)  return "unknown";

				var r = new RegExp("^[a-zA-Z0-9\\-_.]+$");
				var out = "";

				for (var i = 0; i < fn.length; i++) {
					if (r.exec(fn[i]) != null)
						out += fn[i];
				}

				if (!out) out = "unknown_" + (new Date()).getTime();
				return out;
			}


			//
			//$scope.infiniteOrders = [];
			//$scope.isBusy = false;
			//$scope.loadMore = function() {
			//	$scope.isBusy = true;
			//	$http.post('/api/infinite/orders', {orderTotalCount : $scope.infiniteOrders.length})
			//		.success(function(newlyLoadedOrders) {
			//			Array.prototype.push.apply($scope.infiniteOrders, newlyLoadedOrders);
			//			$scope.isBusy = false; // request processed
			//		})
			//		.error(function(err) {
			//			//console.log("Error on getting infinite order.", err);
			//		});
			//};
			//$scope.loadMore();
			//
			//$scope.submitOrder = function(orders) {
			//	if(GlobalService.validateOrderForm(orders, 'create')) {
			//		orders.author = $scope.user.id;
			//		orders.updater = $scope.user.id;
			//		$http.post('/api/orders', orders)
			//			.success(function(data) {
			//				data.id = data._id;
			//				delete data._id;
			//				data.author = {
			//					id: data.author,
			//					username: $scope.user.username
			//				};
			//				Array.prototype.push.apply($scope.infiniteOrders, [data]);
			//			})
			//			.error(function(err) {
			//				console.log('Error: ' + err);
			//			});
			//	}
			//};
			//
			//$scope.delete = function(id, title) {
			//	$http.delete('/api/orders/'+id)
			//		.success(function(data) {
			//			Notification.success({message: 'Successfully deleted order: '+title+' !'});
			//			$scope.infiniteOrders = [];
			//			$scope.loadMore();
			//		})
			//		.error(function(err) {
			//			console.log('Error: ' + err);
			//		});
			//};

		}
	]);
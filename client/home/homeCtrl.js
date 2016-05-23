angular.module('Creative')
	.controller('HomeCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
		$scope.test = "This is the Home Controller!";

		$scope.team = [
			{
				img_src: "../../public/sebastien_aziz.jpg",
				name: "Sébastien AZIZ",
				description: "En charge du site avec ces diffèrentes fonctionnalités. Mon but en tant que développeur est de transformer les besoins exprimés par Steve en fonctionnalités utilisables."
			},
			{
				img_src: "../../public/steve_abraham.jpg",
				name: "Steve ABRAHAM",
				description: "Propriétaire du produit, en charge de la communication et du marketing. Je porte la vision du produit à réaliser. "
			},
			{
				img_src: "../../public/guillaume_bazire.jpg",
				name: "Guillaume BAZIRE",
				description: "Scrum master et développeur de l'équipe. Mon but est d’assurer un environnement de travail agréable pour l’ensemble des membres de l’équipe. "
			}
		];

		$scope.uploadFiles = function (files) {
			$scope.files = files;
			if (files && files.length) {
				console.log("files : ", files);
				Upload.upload({
					url: '/api/upload',
					data: {
						files: files
					}
				}).then(function (response) {
					$timeout(function () {
						console.log("inside timeout : ", response.data);
						$scope.result = response.data;
					});
				}, function (response) {
					if (response.status > 0) {
						$scope.errorMsg = response.status + ': ' + response.data;
					}
				}, function (evt) {
					$scope.progress =
						Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
				});
			}
		};

	}]);

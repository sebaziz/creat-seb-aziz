angular.module('Creative')
	.service('albumProvider', ['$http', '$fileUploader',
		function ($http, $fileUploader) {
			var album_cache = {};

			this.getUploader = function (album_name, scope) {
				return $fileUploader.create({
					scope: scope,
					method: "PUT",
					url: "/v1/albums/" + album_name + "/photos.json"
				});
			};

			this.albumChanged = function (name) {
				if (album_cache[name]) delete album_cache[name];
			};

			this.getAlbums = function (callback) {
				$http.get("/v1/albums.json")
					.success(function (data, status, headers, conf) {
						callback(null, data);
					})
					.error(function (data, status, headers, conf) {
						callback(data);
					});
			};

			this.getAlbum = function (name, callback) {
				if (album_cache[name]) return callback(null, album_cache[name]);

				$http.get("/v1/albums/" + name + ".json")
					.success(function (data, status, headers, conf) {
						album_cache[name] = data;
						callback(null, data);
					})
					.error(function (data, status, headers, conf) {
						callback(data);
					});
			};

			this.getPhotosForAlbum = function (name, callback) {
				if (album_cache[name]) return callback(null, album_cache[name].photos);
				$http.get("/v1/albums/" + name + "/photos.json")
					.success(function (data, status, headers, conf) {
						album_cache[name] = data;
						callback(null, data);
					})
					.error(function (data, status, headers, conf) {
						callback(data);
					});
			};


			this.addAlbum = function (album_data, callback) {

				if (!album_data.name) return callback({ code: "missing_name" });
				if (!album_data.title) return callback({ code: "missing_title" });
				if (!album_data.description) return callback({ code: "missing_description" });
				if (!album_data.date) return callback({ code: "missing_date" });
				$http.put("/v1/albums.json", album_data)
					.success(function (data, status, headers, conf) {
						console.log('inside success : ');
						console.log('inside status : ', status);
						console.log('inside headers : ', headers);
						console.log('inside conf : ', conf);
						callback(null, data);
					})
					.error(function (data, status, headers, conf) {
						console.log('inside error : ');
						console.log('inside status : ', status);
						console.log('inside headers : ', headers);
						console.log('inside conf : ', conf);
						callback(data);
					});
			};

		}
	]);
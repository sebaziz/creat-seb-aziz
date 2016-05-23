angular.module('Creative')
	.filter('dateFormat', function() {
		return function(date, dateFormat) {
			return moment(date).format(dateFormat);
		}
	})
	.filter('checkAccessibility', function() {
		return function(userStat, itemAuthorID, user) {
			return (userStat && itemAuthorID == user.id || userStat && user.role == 0);
		}
	})
	.filter('validatePicture', function() {
		var noPic = [
				'/public/nopic1.jpg',
				'/public/nopic2.jpg',
				'/public/nopic3.jpg',
				'/public/nopic4.jpg'
			];
		var validate = /(https?:\/\/.*\.(?:jpg|jpeg|png|gif))/i;
		return function(givenPic) {
			return validate.test(givenPic) ? givenPic : noPic.sort(function(){return .5 - Math.random()}).slice(0,1)[0];
		}
	});

'use strict';

app.factory('sessionsControl', ['$http', '$location', function ($http, $location) {

	return {

		get: function (key) {
			return sessionStorage.getItem(key);
		},
		set: function (key, val) {
			return sessionStorage.setItem(key, val);
		},
		getList: function (key) {
			return JSON.parse(sessionStorage.getItem(key));
		},
		setList: function (key, list) {
			return sessionStorage.setItem(key, JSON.stringify(list));
		},
		unset: function (key) {
			return sessionStorage.removeItem(key);
		},
		clear: function () {
			return sessionStorage.clear();
		}

	};
}]);
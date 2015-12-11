;(function () {

	angular
		.module('<%= appName %>.Main')
		.factory('mainService', mainService);

	function mainService($http) {
		return {
			get : get
		};

		function get() {
			return $http.get(mainUrl());
		}
	}

	function mainUrl() {
		var url = '/main';

		return url;
	}

} ());
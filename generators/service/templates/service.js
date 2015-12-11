;(function () {

	angular
		.module('<%= moduleName %>')
		.factory('<%= name %>Service', <%= name %>Service);

	function <%= name %>Service($http) {
		return {
			save: save,
			destroy: destroy,
			get : get
		};

		function save(data) {
			return (data.id) ? update(data) : create(data);
		}

		function create(data) {
			return $http.post(<%= name %>Url(), data);
		}

		function update(data) {
			return $http.put(<%= name %>Url(data.id), data);
		}

		function destroy(data) {
			return $http.delete(<%= name %>Url(data.id));
		}

		function get(id) {
			return $http.get(<%= name %>Url(id));
		}
	}

	function <%= name %>Url(id) {
		var url = '/<%= name %>';

		return (id) ? url + '/' + id : url;
	}

} ());
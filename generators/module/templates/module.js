;(function () {

	angular
		.module('<%= moduleName %>', [

		])
		.config(routerConfig);

	function routerConfig($stateProvider) {
		$stateProvider
			.state('<%= name %>', {
				url: '/<%= name %>',
				templateUrl: 'app/modules/<%= name %>/views/<%= name %>.html',
				controller: '<%= capitalizedName %>Ctrl',
				controllerAs: '<%= name %>Ctrl'
			});
	}

} ());
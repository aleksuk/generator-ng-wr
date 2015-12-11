;(function () {

	angular
		.module('<%= moduleName %>')
		.controller('<%= capitalizedName %>Ctrl', <%= capitalizedName %>Ctrl);

	function <%= capitalizedName %>Ctrl() {
		var vm = this;
	}

} ());
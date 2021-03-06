;(function () {

    angular
        .module('<%= moduleName %>', [])
        .directive('<%= name %>', <%= name %>);

    function <%= name %>() {
        return {
            restrict: 'E',
            templateUrl: '<%= templateUrl %>',
            bindToController: true,
            controller: <%= capitalizedName %>Ctrl,
            controllerAs: '<%= name %>Ctrl'
        };
    }

    function <%= capitalizedName %>Ctrl(<%= (service) ? name + 'Service' : '' %>) {
        var vm = this;
    }

} ());

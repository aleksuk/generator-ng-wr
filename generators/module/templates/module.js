;(function () {

    angular
        .module('<%= moduleName %>', [

        ])
        .config(routerConfig);

    function routerConfig($stateProvider) {
        $stateProvider
            .state('<%= defaultName %>', {
                url: '/<%= defaultName %>',
                templateUrl: 'app/modules/<%= defaultName %>/views/<%= defaultName %>.html',
                controller: '<%= capitalizedName %>Ctrl',
                controllerAs: '<%= name %>Ctrl'
            });
    }

} ());

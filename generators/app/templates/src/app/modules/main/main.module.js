;(function () {

    angular
        .module('<%= appName %>.Main', [
            '<%= appName %>.Clock'
        ])
        .config(routerConfig);

    function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('index', {
                url: '',
                templateUrl: 'app/modules/main/views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'mainCtrl'
            })
            .state('main', {
                url: '/',
                templateUrl: 'app/modules/main/views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'mainCtrl'
            });
    }

} ());

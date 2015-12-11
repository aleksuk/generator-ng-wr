;(function () {

    angular
        .module('<%= appName %>.Main')
        .directive('test', test);

    function test() {
        return {
            scope: {
                'data': '='
            },
            restrict: 'E',
            templateUrl: 'app/modules/main/directives/test/test.html',
            bindToController: true,
            controller: TestCtrl,
            controllerAs: 'testCtrl'
        };
    }

    function TestCtrl() {
        var vm = this;

        vm.text = 'Test directive';
    }

} ());
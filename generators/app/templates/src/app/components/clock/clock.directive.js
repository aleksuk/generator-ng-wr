;(function () {

    angular
        .module('<%= appName %>.Clock', [])
        .directive('clock', clock);

    function clock() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/clock/clock.html',
            bindToController: true,
            controller: ClockCtrl,
            controllerAs: 'clockCtrl'
        };
    }

    function ClockCtrl($interval, $scope, clockService) {
        var vm = this,
            MINUTE = 60000,
            timerPromise;

        updateTime();

        timerPromise = $interval(updateTime, MINUTE);
        $scope.$on('$destroy', function () {
            $interval.cancel(timerPromise);
        });

        function updateTime() {
            vm.currentTime = clockService.getTime();
        }
    }

} ());
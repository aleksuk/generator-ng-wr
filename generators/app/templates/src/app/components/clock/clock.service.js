;(function () {
    angular
        .module('<%= appName %>.Clock')
        .service('clockService', clockService);

    function clockService() {
        return {
            getTime: getTime
        };

        function getTime() {
            var date = new Date();

            return [
                date.getHours(),
                ':',
                checkNumberFormat(date.getMinutes())
            ].join('');
        }

        function checkNumberFormat(num) {
            return (num < 10) ? '0' + num : num;
        }
    }
} ());
;(function () {

    angular
        .module('<%= appName %>', [
            'ui.router',
            '<%= appName %>.Main'
        ]).run(function() {
            console.log('run');
        });

} ());

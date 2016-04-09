;(function () {

    angular
        .module('<%= appName %>', [
            'ui.router',
            '<%= appName %>.Main'/* injection */
        ]).run(function() {
            console.log('run');
        });

} ());

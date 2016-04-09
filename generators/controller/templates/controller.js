;(function () {

    angular
        .module('<%= moduleName %>')
        .controller('<%= capitalizedName %>Ctrl', <%= capitalizedName %>Ctrl);

    /* @ngInject */
    function <%= capitalizedName %>Ctrl() {
        var vm = this;
    }

} ());

;(function () {

    angular
        .module('<%= moduleName %>')
        .controller('<%= capitalizedName %>Ctrl', <%= capitalizedName %>Ctrl);

    /* @ngInject */
    function <%= capitalizedName %>Ctrl(<%= (service) ? name + 'Service' : '' %>) {
        var vm = this;
    }

} ());

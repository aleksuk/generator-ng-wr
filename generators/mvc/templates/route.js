.state('<%= defaultName %>', {
                url: '/<%= defaultName %>',
                templateUrl: 'app/modules/<%= moduleName %>/views/<%= defaultName %>.html',
                controller: '<%= capitalizedName %>Ctrl',
                controllerAs: '<%= name %>Ctrl'
            })

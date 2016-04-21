# generator-ng-wr [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> 

## Installation

First, install [Yeoman](http://yeoman.io) and generator-ng-wr using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-ng-wr
```

Then generate your new project:

```bash
yo ng-wr
```

### Project structure
├── gulp
├── src
│   ├── app
│   │   ├── components
│   │   │   ├── clock
│   │   │   │   ├── clock.controller.js
│   │   │   │   ├── clock.service.js
│   │   │   │   ├── clock.html
│   │   │   │   └── clock.scss
│   │   ├── modules
│   │   │   ├── main
│   │   │   │   ├── controllers
│   │   │   │   │   └── main.controller.js
│   │   │   │   ├── services
│   │   │   │   │   └── main.service.js
│   │   │   │   ├── views
│   │   │   │   │   └── main.html
│   │   │   │   ├── styles
│   │   │   │   │   └── main.scss
│   │   │   │   ├── directives
│   │   │   │   │   ├── some-directive
│   │   │   │   │   │   ├── some-directive.directive.js
│   │   │   │   │   │   ├── some-directive.service.js
│   │   │   │   │   │   ├── some-directive.html
│   │   │   │   │   │   └── some-directive.scss
│   │   ├── init.js
│   ├── assets
│   │   ├── libs
│   │   ├── styles
│   │   │   ├── partials
│   │   │   │   ├── base.scss
│   │   │   │   ├── mixins.scss
│   │   │   │   └── variables.scss
│   │   │   └── main.scss
│   │   └── images
│   ├── dependencies.js
│   └── index.html
├── .yo-rc.json
├── .bowerrc
├── bower.json
├── Gulpfile.js
├── package.json
└── .jshintrc

## Available sub-generators
- module
- component
- directive

### module
```
yo ng-wr:module module-name
```
Next files will be created:
```
src/app/modules/module-name/module-name.module.js
src/app/modules/module-name/services/module-name.service.js
src/app/modules/module-name/controllers/module-name.controller.js
src/app/modules/module-name/views/module-name.html
src/app/modules/module-name/styles/module-name.scss
```

**src/app/modules/module-name/module-name.module.js**
```
;(function () {

    angular
        .module('MyCoolProj.SomeModule', [

        ])
        .config(routerConfig);

    function routerConfig($stateProvider) {
        $stateProvider
            .state('some-module', {
                url: '/some-module',
                templateUrl: 'app/modules/some-module/views/some-module.html',
                controller: 'SomeModuleCtrl',
                controllerAs: 'someModuleCtrl'
            });
    }

} ());
```

**src/app/modules/module-name/services/module-name.service.js**
```
;(function () {

    angular
        .module('MyCoolProj.SomeModule')
        .factory('someModuleService', someModuleService);

    /* @ngInject */
    function someModuleService($http) {
        return {
            save: save,
            destroy: destroy,
            get : get
        };

        function save(data) {
            return (data.id) ? update(data) : create(data);
        }

        function create(data) {
            return $http.post(someModuleUrl(), data);
        }

        function update(data) {
            return $http.put(someModuleUrl(data.id), data);
        }

        function destroy(data) {
            return $http.delete(someModuleUrl(data.id));
        }

        function get(id) {
            return $http.get(someModuleUrl(id));
        }
    }

    function someModuleUrl(id) {
        var url = '/some-module';

        return (id) ? url + '/' + id : url;
    }

} ());
```

**src/app/modules/module-name/controllers/module-name.controller.js**
```
;(function () {

    angular
        .module('MyCoolProj.SomeModule')
        .controller('SomeModuleCtrl', SomeModuleCtrl);

    /* @ngInject */
    function SomeModuleCtrl(someModuleService) {
        var vm = this;
    }

} ());
```

**src/app/modules/module-name/views/module-name.html**
```
<section class="some-module">
    some-module
</section>
```

**src/app/modules/module-name/styles/module-name.scss**
```
.some-module {

}
```

### directive
```
yo ng-wr:directive some-directive
```

It will ask you about module name, and after will generate directive in this module.

```
src/app/modules/some-module/directives/some-directive/some-directive.directive.js
src/app/modules/some-module/directives/some-directive/some-directive.service.js
src/app/modules/some-module/directives/some-directive/some-directive.html
src/app/modules/some-module/directives/some-directive/some-directive.scss
```

**src/app/modules/some-module/directives/some-directive/some-directive.directive.js**
```
;(function () {

    angular
        .module('MyCoolProj.SomeModule')
        .directive('someDirective', someDirective);

    function someDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/modules/some-module/directives/some-directive/some-directive.html',
            bindToController: true,
            controller: SomeDirectiveCtrl,
            controllerAs: 'someDirectiveCtrl'
        };
    }

    /* @ngInject */
    function SomeDirectiveCtrl(someDirectiveService) {
        var vm = this;
    }

} ());
```

### component
```
yo ng-wr:directive some-component
```

It will generate directive in component folder (directive which don't have binding to a particular module)

```
src/app/components/some-component/some-component.directive.js
src/app/components/some-component/some-component.service.js
src/app/components/some-component/some-component.html
src/app/components/some-component/some-component.scss
```

Also all of files will be included in dependencies.json and main.scss.


## Getting To Know Yeoman

Yeoman has a heart of gold. He&#39;s a person with feelings and opinions, but he&#39;s very easy to work with. If you think he&#39;s too opinionated, he can be easily convinced. Feel free to [learn more about him](http://yeoman.io/).

## License

Apache-2.0 © [Mykhailo Aleksiuk]()


[npm-image]: https://badge.fury.io/js/generator-ng-wr.svg
[npm-url]: https://npmjs.org/package/generator-ng-wr
[travis-image]: https://travis-ci.org/aleksuk/generator-ng-wr.svg?branch=master
[travis-url]: https://travis-ci.org/aleksuk/generator-ng-wr
[daviddm-image]: https://david-dm.org/aleksuk/generator-ng-wr.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/aleksuk/generator-ng-wr
[coveralls-image]: https://coveralls.io/repos/aleksuk/generator-ng-wr/badge.svg
[coveralls-url]: https://coveralls.io/r/aleksuk/generator-ng-wr

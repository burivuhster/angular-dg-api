(function() {
    'use strict';

    var dgApiModule = angular.module("dg-api", ['ngResource']);

    function DgApiProvider() {
        var options = {
            output: 'jsonp',
            callback: 'JSON_CALLBACK'
        };

        this.init = function(opts) {
            angular.extend(options, opts);
        };

        this.$get = function($resource) {
            return {
                Projects: $resource('http://catalog.api.2gis.ru/project/list', options, {
                    query: {method:'JSONP', isArray:false}
                }),
                Rubricator: $resource('http://catalog.api.2gis.ru/rubricator', options, {
                    query: {method:'JSONP', isArray:false}
                })
            };
        };

        this.$get.$inject = ['$resource'];
    }

    dgApiModule.config(function($provide) {
        $provide.provider('dgApi', DgApiProvider);
    });
})();
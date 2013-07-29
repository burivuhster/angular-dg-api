(function() {
    'use strict';

    var dgApiModule = angular.module("dg-api", ['ngResource']);

    /**
     * 2GIS API Provider
     * @constructor
     */
    function DgApiProvider() {
        var options = {
            output: 'jsonp',
            version: '1.3',
            callback: 'JSON_CALLBACK'
         };

        /**
         * Init provider
         * @param {Object} opts
         * @param {Object} opts.key Your 2GIS API key
         */
        this.init = function(opts) {
            angular.extend(options, opts);
        };

        this.$get = function($resource) {
            /**
             * Profile resource
             */
            var Profile = $resource('http://catalog.api.2gis.ru/profile', options, {
                get: {method: 'JSONP', isArray: false}
            });

            /**
             * Register business connection for profile
             */
            Profile.prototype.registerBC = function() {
                if(!this.register_bc_url) {
                    return;
                }

                // Send GET request via script tag insertion
                var script = document.createElement('script');
                script.async = true;
                script.src = this.register_bc_url;
                script.onload = function() {
                    document.body.removeChild(script);
                };

                document.body.appendChild(script);
            };

            return {
                /**
                 * Projects resource
                 * For a list of available parameters please see {@link http://api.2gis.ru/doc/firms/list/project-list/}
                 */
                Projects: $resource('http://catalog.api.2gis.ru/project/list', options, {
                    query: {method: 'JSONP', isArray: false}
                }),

                /**
                 * Rubricator resource
                 * For a list of available parameters please see {@link http://api.2gis.ru/doc/firms/list/rubricator/}
                 */
                Rubricator: $resource('http://catalog.api.2gis.ru/rubricator', options, {
                    query: {method: 'JSONP', isArray: false}
                }),

                /**
                 * Search service
                 * For a list of available parameters please see {@link http://api.2gis.ru/doc/firms/searches/search/}
                 */
                Search: $resource('http://catalog.api.2gis.ru/search', options, {
                    query: {method: 'JSONP', isArray: false}
                }),

                /**
                 * Search in rubric
                 * {@link http://api.2gis.ru/doc/firms/searches/searchinrubric/}
                 */
                SearchInRubric: $resource('http://catalog.api.2gis.ru/searchinrubric', options, {
                    query: {method: 'JSONP', isArray: false}
                }),

                /**
                 * Search for Ads
                 * {@link http://api.2gis.ru/doc/firms/searches/adssearch/}
                 */
                SearchAds: $resource('http://catalog.api.2gis.ru/ads/search', options, {
                    query: {method: 'JSONP', isArray: false}
                }),

                /**
                 * Profile resource
                 * @link {http://api.2gis.ru/doc/firms/profiles/profile/}
                 */
                Profile: Profile
            };
        };

        this.$get.$inject = ['$resource'];
    }

    dgApiModule.config(['$provide', function($provide) {
        $provide.provider('dgApi', DgApiProvider);
    }]);
})();
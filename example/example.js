angular.module('myApp', ['dg-api'])
    .config(function(dgApiProvider) {
        dgApiProvider.init({
            key: 'ruzqvd2307'
        });
    })
    .controller('ExampleCtrl', function($scope, dgApi) {

        $scope.projects = dgApi.Projects.query();

        $scope.rubrics = dgApi.Rubricator.query({
            where: 'Москва'
        });

        $scope.searchResult = dgApi.Search.query({
            what: 'starbucks',
            where: 'Москва'
        }, function(data) {
            // retrieve profile info for the first search result
            if(data && data.result && data.result.length) {
                $scope.profile = dgApi.Profile.get({
                    id: data.result[0].id,
                    hash: data.result[0].hash
                }, function(profile) {
                    console.log(profile);
                });
            }
        });

        $scope.searchInRubricResult = dgApi.SearchInRubric.query({
            what: 'хостинг',
            where: 'Москва'
        });

        $scope.searchAdsResult = dgApi.SearchAds.query({
            what: 'окна',
            where: 'Москва'
        });
    });
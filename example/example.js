angular.module('myApp', ['dg-api'])
    .config(function(dgApiProvider) {
        dgApiProvider.init({
            key: 'ruzqvd2307',
            version: '1.3'
        });
    })
    .controller('ExampleCtrl', function($scope, dgApi) {
        $scope.projects = dgApi.Projects.query();
        $scope.rubrics = dgApi.Rubricator.query({
            where: 'Москва'
        });
    });
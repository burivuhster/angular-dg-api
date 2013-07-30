angular.module('dgExample', ['dg-api'])
    .config(function(dgApiProvider) {
        dgApiProvider.init({
            key: 'ruzqvd2307'
        })
    })
    .controller('MainCtrl', function($scope, dgApi) {
        $scope.projects = dgApi.Projects.query();

        $scope.search = function() {
            $scope.searchResult = dgApi.Search.query({
                what: $scope.query,
                where: $scope.selectedProject
            });
        };
    });
Angular 2GIS API
==============

Angular-dg-api is an angular provider with the set of resources that enables seamless integration of 2GIS API into your AngularJS app.

Pull-requests are welcome!

# Installation
Before using angular-dg-api you must include the main Angular.js library, angular-resource library, and the angular-dg-api.js script.
```html
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.0.6/angular.min.js"></script>
<script src="/path/to/angular-resource.js"></script>
<script src="/path/to/angular-dg-api.js"></script>
<script src="/path/to/your-angular-controller.js"></script>
```

Next you will need to make your application's module depend on the dg-maps module:
```javascript
var app = angular.module("myApp", ["dg-api"]);
```

And configure dgApiProvider with your 2GIS API key:
```javascript
angular.module('myApp', ['dg-api'])
    .config(function(dgApiProvider) {
        dgApiProvider.init({
            key: 'YOUR_2GIS_API_KEY'
        });
    })
```

# Usage
Now inside your controller you can use 2GIS API like this:
```javascript
$scope.projects = dgApi.Projects.query();
```

or like this
```javascript
$scope.searchResult = dgApi.Search.query({
    what: 'starbucks',
    where: 'Москва'
});
```

You can also retrieve profile info for the one of search results and "register a business connection" for it:
```javascript
$scope.profile = dgApi.Profile.get({
    id: $scope.searchResult.results[0].id,
    hash: $scope.searchResult.results[0].hash
}, function(profile) {
    profile.registerBC();
});
```

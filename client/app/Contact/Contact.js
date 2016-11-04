'use strict';

angular.module('myApp.Contact', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Contact', {
    templateUrl: 'Contact/Contact.html',
    controller: 'ContactCtrl'
  });

}])
.controller('ContactCtrl', ['$scope',function($scope) {
  
}]);

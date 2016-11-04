'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.InstanceFailure',
  'myApp.CPUUsage',
  'myApp.Network',
  'myApp.RAM',
  'myApp.Overview',
  'myApp.Contact',
  'myApp.Alerts'
]).
config(['$locationProvider', '$routeProvider',function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/Overview'});
}]);

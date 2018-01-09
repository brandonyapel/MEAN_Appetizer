let myApp = angular.module('myApp', ['ngRoute']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/myHome', {
      templateUrl: '/views/templates/myHome.html',
      controller: 'myHomeController as vm',
      resolve: {
        getuser : function(UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/myProjects', {
      templateUrl: '/views/templates/myProjects.html',
      controller: 'myProjectsController as pc',
      resolve: {
        getuser : function(UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/myCode', {
      templateUrl: '/views/templates/myCode.html',
      controller: 'myCodeController as mc',
      resolve: {
        getuser : function(UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/input', {
      templateUrl: '/views/templates/input.html',
      controller: 'inputController as ic',
      resolve: {
        getuser : function(UserService) {
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
});

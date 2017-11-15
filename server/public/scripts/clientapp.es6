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
    .when('/marketplace', {
      templateUrl: '/views/templates/marketplace.html',
      controller: 'MarketController as mc',
      resolve: {
        getuser : function(UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/leaderboard', {
      templateUrl: '/views/templates/leaderboard.html',
      controller: 'LeaderController as lbc',
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

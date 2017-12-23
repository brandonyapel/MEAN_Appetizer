myApp.controller('myHomeController',['UserService', function (UserService) {
  console.log('myHomeController created');
  self = this;
  self.userObject = UserService.userObject;
  console.log('myHomeController is Logging',self.userObject);
}]);

myApp.controller('myCodeController',['UserService', function (UserService) {
    console.log('myCodeController created');
    self = this;
    self.userObject = UserService.userObject;
    console.log('myCodeController is Logging',self.userObject);
  }]);
  
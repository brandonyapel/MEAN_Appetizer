myApp.controller('inputController',['UserService','InputService' function (UserService,InputService) {
    console.log('inputController created');
    self = this;
    self.userObject = UserService.userObject;

    
  }]);
  
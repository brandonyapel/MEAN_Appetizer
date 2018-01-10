myApp.controller('InputController',['UserService','InputService', function (UserService,InputService) {
    console.log('InputController created');
    self = this;
    self.userObject = UserService.userObject;

    //object to model all properties onto
    self.formInputs = InputService.formInputs;

   self.consoleLog  = function(){
        console.log(self.formInputs)
    }

    //function to add another property/column to table
    self.addProperty = InputService.addProperty;
  }]);
  
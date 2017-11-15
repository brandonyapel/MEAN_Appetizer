myApp.controller('MarketController', function(UserService) {
  console.log('MarketController created');
  let vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
});

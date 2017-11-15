myApp.controller('LeaderController', function(UserService) {
  console.log('LeaderController created');
  let vm = this;
  vm.userService = UserService;
});

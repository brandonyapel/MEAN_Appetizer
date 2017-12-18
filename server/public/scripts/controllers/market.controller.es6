myApp.controller('MarketController',['UserService','MarketService', function (UserService, MarketService) {
  console.log('MarketController created');
  let mc = this;
  // mc.userService = UserService;
  mc.userObject = UserService.userObject;
  mc.itemsArray = MarketService.itemsArray
}]);

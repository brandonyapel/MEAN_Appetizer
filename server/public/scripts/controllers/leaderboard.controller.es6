myApp.controller('LeaderController', function(LeaderService) {
  console.log('LeaderController created');
  let vm = this;
  // vm.LeaderService = LeaderService;
  vm.leaderArray = LeaderService.leaderArray;
  

});

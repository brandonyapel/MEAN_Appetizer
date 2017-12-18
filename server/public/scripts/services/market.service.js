myApp.service('MarketService', function($http){
    console.log('UserService Loaded');
    let vm = this

    vm.itemsArray = { list: [] }


self.getItems = function () {
  $http({
      method: 'GET',
      url: '/market/items'
  }).then(function(response) {
      console.log('response', response.data);
      vm.itemsArray.list = response.data;
  });
};

self.getItems();

})


// import { setInterval } from "timers";

myApp.service('MarketService', function($http){
    console.log('UserService Loaded');
    let vm = this

    vm.itemsArray = { list: [] }


self.getItems = () => {
  $http({
      method: 'GET',
      url: '/market/items'
  }).then(function(response) {
      console.log('response', response.data);
      vm.itemsArray.list = response.data;
  });
};

self.getItems();
let requestUpdatedItems = setInterval(() => {self.getItems()}, 8000)


})
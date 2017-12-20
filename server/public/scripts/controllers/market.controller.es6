myApp.controller('MarketController', ['UserService', 'MarketService', function (UserService, MarketService) {
  console.log('MarketController created');
  let mc = this;
  // mc.userService = UserService;
  mc.userObject = UserService.userObject;
  mc.itemsArray = MarketService.itemsArray

  mc.personalInventory = [
    { id: 1, name: 'Apple', count: 0 },
    { id: 2, name: 'Tomato', count: 0 },
    { id: 3, name: 'Coffee', count: 0 },
    { id: 4, name: 'Flowers', count: 0 },
    { id: 5, name: 'Orange', count: 0 },
    { id: 6, name: 'Pepper', count: 0 },
    { id: 7, name: 'Lettuce', count: 0 },
    { id: 8, name: 'Basket', count: 0 },
    { id: 9, name: 'Apron', count: 0 },
    { id: 10, name: 'Potholders', count: 0 }

  ]

  setTimeout(mc.calculatePersonalIventory = function () {
    console.log(mc.userObject)
    console.log(mc.itemsArray)
    console.log('hit the calculate personal inventory function')
    // for (let i = 0; i < mc.personalInventory.length; i++) {
    //   mc.personalInventory[i].count = 0;

    // }
    for (let marketItemIndex = 0; marketItemIndex < mc.itemsArray.list.length; marketItemIndex++) {
      console.log('in for loop')
      for (let basketIndex = 0; basketIndex < mc.userObject.basket.length; basketIndex++) {
        console.log('user object basket', mc.userObject.basket)

        if (mc.userObject.basket[basketIndex].id == mc.itemsArray.list[marketItemIndex].id) {
          mc.personalInventory[marketItemIndex].count++;
        }
      }

    }
    console.log(mc.personalInventory)
  }, 1000);

  mc.calculatePersonalIventory()
}




]);

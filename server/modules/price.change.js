let marketItems = require('./market.items.js');

const changeItemPrices = basket => {
    for(let i =0;i<basket.length;i++){
      let randomPriceChange = randomNumberGenerator(-.15, .15);
      basket[i].cost += randomPriceChange;
      basket[i].cost = Number((basket[i].cost).toFixed(2))
      
    }
    console.log('hey bitch, ', basket);
  }
  
  const randomNumberGenerator = (min, max) => {
    return Number((Math.random()*(max-min)+min).toFixed(2));
  }
  
  let currentBasketItems = setInterval(function(){changeItemPrices(marketItems)}, 10000);

  module.exports = {
      currentBasketItems,
      marketItems
  };
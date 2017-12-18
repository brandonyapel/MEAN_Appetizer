/**
 * Express router providing market related routes
 * @module routes/market
 * @requires express
 */

// express module
let express = require('express');

// Express router to mount market related functions on.
let router = express.Router();

// For base mode, use this array
// As a stretch goal, move this to the database
let priceChangeObject = require('../modules/price.change.js');

const changeItemPrices = basket => {
  for(let i =0;i<basket.length;i++){
    let randomPriceChange = randomNumberGenerator(-.15, .15);
    basket[i].cost += randomPriceChange;
    
  }
  console.log(basket);
}

const randomNumberGenerator = (min, max) => {
  return Number((Math.random()*(max-min)+min).toFixed(2));
}

// let currentBasketItems = setInterval(function(){changeItemPrices(marketItems)}, 10000);

/**
 * Route serving market items
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.get('/items', (req, res) => {
  console.log('marketRouter - get /items');
  res.send(priceChangeObject.marketItems);
});

router.put('/buy/:id', (req, res) => {
  console.log('marketRouter - put /buy');
  // TODO: Save to the database
  res.sendStatus(200); // <- Temporary
});

router.put('/sell/:id', (req, res) => {
  console.log('marketRouter - put /sell');
  // TODO: Save to the database
  res.sendStatus(200); // <- Temporary
});

router.get('/leaderboard', (req, res) => {
  console.log('marketRouter - get /leaderboard');
  // TODO: Retrieve from the database
  res.send([]); // <- Temporary
});

module.exports = router;


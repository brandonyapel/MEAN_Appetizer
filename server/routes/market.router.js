/**
 * Express router providing market related routes
 * @module routes/market
 * @requires express
 */

// express module
let express = require('express');

// Express router to mount market related functions on.
let router = express.Router();
let users = require('../models/user.model')

// For base mode, use this array
// As a stretch goal, move this to the database
let marketItems = [
  {id: 1, name: 'Apple', cost: 0.99},
  {id: 2, name: 'Tomato', cost: 1.19},
  {id: 3, name: 'Coffee', cost: 2.99},
  {id: 4, name: 'Flowers', cost: 8.99},
  {id: 5, name: 'Orange', cost: 0.89},
  {id: 6, name: 'Pepper', cost: 1.29},
  {id: 7, name: 'Lettuce', cost: 2.99},
  {id: 8, name: 'Basket', cost: 5.99},
  {id: 9, name: 'Apron', cost: 19.99},
  {id: 10, name: 'Potholders', cost: 19.99}
];

/**
 * Route serving market items
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.get('/items', (req, res) => {
  console.log('marketRouter - get /items');
  res.send(marketItems);
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
  users.find({}, function(errorMakingDatabaseQuery, data){
    if (errorMakingDatabaseQuery){
      console.log('error finding users', errorMakingDatabaseQuery);
      res.sendStatus(500);
    }
    else {
      res.send(data)
    }
  }).sort({'money': -1}).limit(10)
  // res.send([]); // <- Temporary
});

module.exports = router;



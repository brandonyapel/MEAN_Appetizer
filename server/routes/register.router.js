let express = require('express');
let router = express.Router();
let passport = require('passport');
let Users = require('../models/user.js');
let path = require('path');

// Handles request for HTML file
router.get('/', (req, res, next) => {
  console.log('get /register route');
  res.sendFile(path.resolve(__dirname, '../public/views/templates/register.html'));
});

// Handles POST request with new user data
router.post('/', (req, res, next) => {
  console.log('post /register route');
  /*
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true},
  recipes: {type: Array}
  */
    let userToSave = {
      username : req.body.username,
      password : req.body.password
    };


    Users.create(userToSave, (err, post) => {
      console.log('post /register -- User.create');
         if(err) {
           console.log('post /register -- User.create -- failure');
           // next() here would continue on and route to routes/index.js
           next(err);
         } else {
           console.log('post /register -- User.create -- success');
          // route a new express request for GET '/'
          res.redirect('/');
         }
    });
});


module.exports = router;

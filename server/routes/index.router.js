let express = require('express');
let router = express.Router();
let passport = require('passport');
let path = require('path');

// Handles login form POST from index.html
router.post('/',
    passport.authenticate('local', { // local strategy - userStrategy.js
        // request stays within node/express and is routed as a new request
        successRedirect: '/user'   // goes to routes/user.js
    })
);

router.get('/*', (req, res) => {
  console.log("404 : ", req.params);
  res.sendStatus(404);
});

module.exports = router;

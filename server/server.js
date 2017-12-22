let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');

let passport = require('./strategies/user.strategy');
let sessionConfig = require('./modules/session.config');
let port = process.env.PORT || 5000;

// Route includes
let indexRouter = require('./routes/index.router');
let userRouter = require('./routes/user.router');
let registerRouter = require('./routes/register.router');
let codeRouter = require('./routes/code.router')


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static('./server/public'));

// Passport Session Configuration //
app.use(sessionConfig);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', registerRouter);
app.use('/user', userRouter);

app.use('/code', codeRouter)

// Catch all bucket, must be last!
app.use('/', indexRouter);

//DB Module
//let db = require('./modules/db.config.js');

// Listen //
app.listen(port, function(){
   console.log('Listening on port', port);
});

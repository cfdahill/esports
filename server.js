const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const routes = require("./routes/index");
const passport = require('./mongo-connector/passport');
const dbConnection = require("./models/mongo");

const PORT = process.env.PORT || 3001;
//look at dbConnection and app.use(session) part of calPal

app.use(morgan('dev'));
app.use(cookieParser());

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Establish individual user
app.use(
  session({
    secret: 'blizzpick_passphrase',
    store: new MongoStore({mongooseConnection: dbConnection}),
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.use('/static', express.static(path.join(__dirname, './client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build'));
  });
}

// app.use('/auth', require('./routes/auth'));

app.use((err, req, res, cb) => {
  console.log(err.stack);
  res.status(500);
});

app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
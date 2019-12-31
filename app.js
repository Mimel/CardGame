const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Login/Register functions.
const login = require('./server/login.js');

const app = express();
const router = express.Router();

// Allow Handlebars rendering.
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'vanity fair',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/login', login);

// Game model files.
const game = require('./js/game.js');

// Render homepage.
app.get('/', (req, res, next) => {
  if(req.user) {
    res.render('index', { allCards: game.cardtemplates });
  } else {
    res.redirect('/login');
  }
});

// Initialize server.
app.listen(3000, () => {
  console.log('Listening on port 3000...');
});

const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const router = express.Router();

// Allow Handlebars rendering.
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Game model files.
const game = require('./js/game.js');

// Render homepage.
app.get('/', (req, res, next) => {
  res.render('index', { allCards: game.cardtemplates });
});

// Initialize server.
app.listen(3000, () => {
  console.log('Listening on port 3000...');
});

const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mysql = require('mysql');
const argon2 = require('argon2');

//Temporary local connection.
const serverConn = mysql.createConnection({
  host: '127.0.0.1',
  database: 'cardgame',
  user: 'root',
  password: ''
});

//Login strategy.
passport.use(new LocalStrategy({
    usernameField: 'l_user',
    passwordField: 'l_pass'
  },
  function(username, password, done) {
    verifyPassQuery = mysql.format('SELECT ?? from User WHERE ?? = ?', ['pass', 'user', username]);
    serverConn.query(verifyPassQuery, function(error, results, fields) {
      if(error) {
        console.log(error);
        return done(error);
      } else if(results.length > 0) {
        argon2.verify(results[0].pass, password).then((out) => {
          if(out) {
            return done(null, username);
          } else {
            return done(null, false, { message: 'Incorrect password. Try again.' });
          }
        });
      } else {
        return done(null, false, { message: username + ' does not exist.' });
      }
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Render login page.
router.get('/', (req, res, next) => {
  res.render('login');
});

// Check login.
router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login'
  }), (req, res, next) => {
    res.redirect('/');
  }
);

// Register a new user.
router.post('/register', (req, res, next) => {
  var insertUserQuery = 'INSERT INTO User(??, ??, ??) VALUES(?, ?, ?);';

  var hashPromise = new Promise(function(resolve, reject) {
    var pass = argon2.hash(req.body.r_pass);
    resolve(pass);
  }).then(function(value) {
    var values = ['user', 'email', 'pass', req.body.r_user, req.body.r_email, value];
    insertUserQuery = mysql.format(insertUserQuery, values);
    serverConn.query(insertUserQuery, function(error, results, fields) {
      if(error) {
        console.log(error);
      } else {
        res.render('index');
      }
    });
  });
});

// End user session.
router.post('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;

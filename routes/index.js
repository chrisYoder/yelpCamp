const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/userModel');

// ============
// Auth Routes
// ============

router.get('/', (req, res) => {
  res.render('campgrounds/landing');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const newUser = new User({username: req.body.username});
  
  User.register(newUser, req.body.password, (err, user) => {
    if(err){
      console.log(err);
      res.render('register');
    }
    
    passport.authenticate('local')(req, res, () => {
      res.redirect('/campgrounds');
    });
  });
});

// ============
// login Routes
// ============
    
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds', 
    failureRedirect: '/login',
  }), (req, res) => {
  
});
  
// =============
// logout Routes
// ============= 

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/campgrounds');
});



module.exports = router;
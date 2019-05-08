const express = require('express');
const router = express.Router();
const Campground = require('../models/campgroundModel');
const isLoggedIn = require('../public/javascript/isLoggedIn');



// INDEX - show all campgrounds
router.get('', (req, res) => {
  // res.render('campgrounds', { campgrounds: campgrounds });
  // get all campgrounds from dv
  
  Campground.find({}, (err, allCampgrounds) => {
    if(err){
      console.log(err);
    }else{
      res.render('campgrounds/index', {campgrounds: allCampgrounds});
    }
  });
});

// CREATE --> adds new campground to the db
router.post('/', isLoggedIn, (req, res) => {
  // get data from the form and add it the campgrounds array
  // redirect back to the campgrounds page
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.desc;
  let user = req.user.username;
  
  let newCampground = {
    name: name,
    image: image,
    description: description,
    user: user,
  };

  Campground.create(newCampground, (err, newCampground) => {
    if(err){
      console.log(err);
    }else{
      res.redirect('');
    }
  });
});



//  NEW 
router.get('/new', isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
});

// SHOW 
router.get('/:id', (req, res) => {
  let id = req.params.id;
  Campground.findById(id).populate('comments').exec( (err, campground) => {
    if(err){
      console.log(err);
    } else {
      res.render('campgrounds/show', {campground: campground});
    }
  });
  
});

module.exports = router;
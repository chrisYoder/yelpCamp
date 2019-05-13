const express = require('express');
const router = express.Router();
const Campground = require('../models/campgroundModel');
const middleware= require('../middleware/index.js');




// INDEX - show all campgrounds
router.get('', (req, res) => {
  // res.render('campgrounds', { campgrounds: campgrounds });
  // get all campgrounds from dv
  
  Campground.find({}, (err, allCampgrounds) => {
    err ? console.log(err) : res.render('campgrounds/index', {campgrounds: allCampgrounds});
  });
});

// CREATE --> adds new campground to the db
router.post('/', middleware.isLoggedIn, (req, res) => {
  // get data from the form and add it the campgrounds array
  // redirect back to the campgrounds page
  let name          = req.body.name,
      image         = req.body.image,
      description   = req.body.desc,
      author        = {
        id: req.user._id,
        username: req.user.username
      };
  
  
  let newCampground = {
    name:         name,
    image:        image,
    description:  description,
    author:       author
  };

  Campground.create(newCampground, (err, newCampground) => {
    err ? console.log(err) : res.redirect('/campgrounds');
  });
});



//  NEW 
router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
});

// SHOW 
router.get('/:id', (req, res) => {
  let id = req.params.id;
  Campground.findById(id).populate('comments').exec( (err, campground) => {
    err ? console.log(err) : res.render('campgrounds/show', {campground: campground});
  });
});

//EDIT Campground
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    err ? console.log(err) : res.render('campgrounds/edit', {campground: campground});
  });
});


// UPDATE Campground
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
    err ? console.log(err) : res.redirect('/campgrounds');
  });
});

// DELETING Campgrounds
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    err ? console.log(err) : res.redirect('/campgrounds');
  });
});



module.exports = router;
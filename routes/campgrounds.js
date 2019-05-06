const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');


// INDEX - show all campgrounds
router.get('/campgrounds', (req, res) => {
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
router.post('/campgrounds', (req, res) => {
  // get data from the form and add it the campgrounds array
  // redirect back to the campgrounds page
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.desc;
  let newCampground = {
    name: name,
    image: image,
    description: description
  };

  Campground.create(newCampground, (err, newCampground) => {
    if(err){
      console.log(err);
    }else{
      res.redirect('/campgrounds');
    }
  });
});



//  NEW --> show from to create new campground
router.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
});

// SHOW --> show more info about one campground
router.get('/campgrounds/:id', (req, res) => {
  // FIND THE CAMPGROUND WITH PROVIDED ID
  // RENDER THE SHOW TEMPLATE WITH THAT CAMPGROUND
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
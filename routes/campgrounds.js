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
    if(err){
      console.log(err);
    }else{
      res.redirect('/campgrounds');
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

//EDIT Campground
router.get('/:id/edit', isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if(err) {
      res.redirect('/campgrounds');
    } else {
       res.render('campgrounds/edit', {campground: campground});
    }
  });
});


// UPDATE Campground
router.put('/:id', (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
    if(err) {
      res.redirect('/campground');
    } else {
      res.redirect(`/campgrounds/${req.params.id}`)
    }
  })
});

// DELETING Campgrounds
router.delete('/:id', (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if(err){
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds');
    }
  })
})

module.exports = router;
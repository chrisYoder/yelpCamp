const express     = require('express'),
      router      = express.Router({mergeParams: true}),
      Campground  = require('../models/campgroundModel'),
      Review      = require('../models/reviewModel'),
      middleware  = require('../middleware');
      

// review index
router.get('/', (req, res) => {
  Campground.findById(req.params.id).populate({
    path: 'reviews', 
    options: {sort: {createdAt: -1}} //sorts reviews array to show the latest first
  }).exec( (err, campground) => {
    (err || !campground) ? (req.flash('error', err.message), res.redirect('back')) : res.render('reviews/index', {campground: campground});
  });
});

//reviews new
router.get('/new', middleware.isLoggedIn, middleware.checkReviewExistence, (req, res) => {
  //checkReviewExistence checks if user already reviewed the campground. only one review per user is allowed
  Campground.findById(req.params.id, (err, campground) => {
    err ? (req.flash('error', err.message), res.redirect('back')) : res.render('reviews/new', {campground: campground});
  });
});

//reviews create

router.post('/', middleware.isLoggedIn, middleware.checkReviewExistence, (req, res) => {
  Campground.findById(req.params.id).populate('reviews').exec( (err, campground) => {
    if(err){
      req.flash('error', err.message);
      return res.redirect('back');
    }
    Review.create(req.body.review, (err, review) => {
      if(err) {
        req.flash('error', err.message);
        return res.redirect('back');
      }
      
      review.author.id = req.user._id;
      review.author.username = req.user.username;
      review.campground = campground;
      review.save();
      campground.reviews.push(review);
      campground.rating = calculateAverage(campground.reviews);
      campground.save();
      req.flash('success', 'Your review has been successfully added.');
      res.redirect(`/campgrounds/${campground._id}`);
    });
  });
});

//reviews edit
router.get('/:review_id/edit', middleware.checkReviewOwnership, (req, res) => {
  Review.findById(req.params.review_id, (err, foundReview) => {
    if(err) {
      req.flash('error', err.message);
      return res.redirect('back');
    }
    res.rend('reviews/edit', {campground_id: req.params.id, review: foundReview});
  });
});

// reviews update
router.put('/:review_id', middleware.checkReviewOwnership, (req, res) => {
  Review.findByIdAndUpdate(req.params.id).populate('reviews').exec((err, campground) => {
    if(err) {
      req.flash('error', err.message);
      return res.redirect('back');
    }
    campground.rating = calculateAverage(campground.reviews);
    campground.save();
    req.flash('success', 'Your review was successfully edited');
    res.redirect(`/campgrounds/${campground._id}`);
  });
});

// reviews delete
router.delete('/:review_id', middleware.checkReviewOwnership, (req, res) => {
  Review.findByIdAndRemove(req.params.review_id, (err) => {
    if(err) {
      req.flash('error', err.message);
      return res.redirect('back');
    }
    Campground.findByIdAndUpdate(req.params.id, {$pull: {reviews: req.params.review_id}}, {new: true}).populate('reviews').exec( (err, campground) => {
      if(err) {
        req.flash('error', err.message);
        return res.redirect('back');
      }
      campground.rating = calculateAverage(campground.reviews);
      campground.save();
      req.flash('success', 'Your review was deleted successfully');
      res.redirect(`/campgrounds/${req.params.id}`)
    })
  })
})


function calculateAverage(reviews) {
  if(reviews.length === 0) {
    return 0;
  }
  
  let sum = 0;
  reviews.forEach( review => {
    sum += review.rating;
  });
  
  return sum / reviews.length;
}

module.exports = router;
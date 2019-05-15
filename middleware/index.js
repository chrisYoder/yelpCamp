const Campground  = require('../models/campgroundModel'),
      Comment     = require('../models/commentModel'),
      Review      = require('../models/reviewModel');


const middlewareObject = {};

middlewareObject.checkCampgroundOwnership = function (req, res, next){
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, (err, foundCampground) => {
      if(err || !foundCampground) {
        req.flash('error', 'Campground not found');
        res.redirect('/campgrounds');
      } else {
        if(foundCampground.author.id.equals(req.user._id)){
          req.campground = foundCampground;
          next();
        } else {
          req.flash('error', `You don't have permission to do that.`);
          res.redirect(`/campgrounds/${req.params.id}`);
        }
      }
    });  
  } else {
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('back');
  }
};
  
  
middlewareObject.checkCommentOwnership = function (req, res, next) {
  if(req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if(err || !foundComment){
        console.log(err);
        req.flash('error', 'That comment does not exist');
        res.redirect('back');
      }else{
        if(foundComment.author.id.equals(req.user._id)){
          req.comment = foundComment;
          next();
        }else{
          req.flash('error', `You don't have permission to do that`);
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('back');
  }
};

middlewareObject.isLoggedIn = function (req, res, next) {
  req.isAuthenticated() ? next() : (req.flash('error', 'You need to be logged in to do that'), res.redirect('/login'));
};

middlewareObject.checkReviewOwnership = function(req, res, next) {
  if(req.isAuthenticated()) {
    Review.findById(req.params.review_id, (err, foundReview) => {
      if(err || !foundReview) {
        res.redirect('back');
      } else {
        if(foundReview.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', `You don't have permission to do that.`);
          res.redirect('back');
        }
      }
    });
  } else {
    req.glash('error', 'You need to be logged in to do that');
    res.redirect('back');
  }
};

middlewareObject.checkReviewExistence = function(req, res, next){
  if(req.isAuthenticated){
    Campground.findById(req.params.id).populate('reviews').exec( (err, foundCampground) => {
      if(err) {
        req.flash('error', 'Campground not found');
        res.redirect('back');
      } else {
        let foundUserReview = foundCampground.reviews.some( review => {
          return review.author.id.equals(req.user._id);
        });
        if(foundUserReview) {
          req.flash('error', 'You already wrote a review');
          return res.redirect('back');
        }
        next();
      }
    });
  } else {
    req.flash('error', 'You need to be logged in first');
    res.redirect('back');
  }
};

module.exports = middlewareObject;
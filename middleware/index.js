const Campground = require('../models/campgroundModel');
const Comment = require('../models/commentModel');

const middlewareObject = {};

middlewareObject.checkCampgroundOwnership = function (req, res, next) {
  if(req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, campground) => {
      err ? res.redirect('back') : campground.author.id.equals(req.user._id) ? next() : res.redirect('back');
    });
  } else {
    res.redirect('back');
  } 
};
  
middlewareObject.checkCommentOwnership = function (req, res, next) {
  if(req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, comment) => {
      err ? res.redirect('back') : comment.author.id.equals(req.user._id) ? next() : res.redirect('back');
    });
  } else {
    res.redirect('back');
  } 
};

middlewareObject.isLoggedIn = function (req, res, next) {
  req.isAuthenticated() ? next() : res.redirect('/login');
};

module.exports = middlewareObject;
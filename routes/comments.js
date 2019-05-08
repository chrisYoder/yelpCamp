const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/campgroundModel');
const Comment = require('../models/commentModel');
const isLoggedIn = require('../public/javascript/isLoggedIn');

// ==========================
// COMMENT ROUTES
// ==========================

router.get('/new', isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if(err) {
      console.log(err);
    } else {
      res.render('comments/new', {campground: campground});
    }
  });
});

router.post('/', isLoggedIn, (req, res) => {
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               //add un and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               comment.save();
               //save comment
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
   
});





module.exports = router;
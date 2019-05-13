const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/campgroundModel');
const Comment = require('../models/commentModel');
const middleware= require('../middleware');
// ==========================
// COMMENT ROUTES
// ==========================

router.get('/new', middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    err ? console.log(err) : res.render('comments/new', {campground: campground});
  });
});

router.post('/', middleware.isLoggedIn, (req, res) => {
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

//edit
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
  Comment.findById(req.params.comment_id, (err, comment) => {
    err ? res.redirect('back') : res.render('comments/edit', {campground_id: req.params.id, comment: comment});
  });
  
});

//update
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updateComment) => {
    err ? console.log(err) : res.redirect(`/campgrounds/${req.params.id}`);
  });
});



//destroy
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, err => {
    err ? console.log(err) : res.redirect(`/campgrounds/${req.params.id}`);
  });
});



module.exports = router;
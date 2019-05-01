const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blog_demo_2', { useNewUrlParser: true} );

const Post = require('./models/post');
const User = require('./models/user');




// User.create({
//     email: 'shallanDavar@palanaeum.org',
//     name: 'Shallan Davar'
// });

Post.create({
    title: 'Oh Adolin', 
    content: 'I adore thee'
}, (err, post) => {
    if (err){
        console.log(err);
    }
    User.findOne({email: 'shallanDavar@palanaeum.org'}, (err, foundUser) => {
        if(err){
            console.log(err);
        }else{
            foundUser.posts.push(post);
            foundUser.save( (err, data) => {
                if(err){
                    console.log(err);
                }else{
                    console.log(data);
                }
            });
        }
    });   
});

// find user and all posts for that user

// User.findOne({email: "shallanDavar@palanaeum.org"}).populate('posts').exec( (err, user) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// });


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blog_demo', { useNewUrlParser: true} );

const postSchema = new mongoose.Schema({
    title: String, 
    content: String, 
});

const userSchema = new mongoose.Schema({
    email: String, 
    name: String,
    posts: [postSchema]
}); 

// Using this one to many  model of the db entry will be: 
// {
//     email: 'user@email.com', 
//     name: 'userName', 
//     posts: [
//             {title: 'postTitle', content: 'postContent'},
//             {title: 'postTitle', content: 'postContent'},
//             {title: 'postTitle', content: 'postContent'},
//             {title: 'postTitle', content: 'postContent'},
//         ]
// }

const User = mongoose.model('User', userSchema);

const Post = mongoose.model('Post', postSchema);

// const newUser = new User({
//     email: 'senecaTheYounger@stoicism.com', 
//     name: 'Seneca the Younger'
// });

// newUser.posts.push({
//     title: 'On Providence', 
//     content: 'You have asked me, Lucilius, why, if a Providence rules the world, it still happens that many evils befall good men. This would be more fittingly answered in a coherent work designed to prove a Providence does preside over the universe, and that God concerns himself with us. But since it is your wish that a part be severed from the whole, and that I refute a single objection while the main question is left untouched, I shall do so; the task is not difficult, — I shall be pleading the cause of the gods.'
// });

// newUser.save( (err, user) => {
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// const newPost = new Post({
//     title: "Mediations", 
//     content: ' Say to yourself at daybreak:[1] I shall come across the busy-body, the thankless, the bully, the treacherous, the envious, the unneighbourly.[2] All this has befallen them because they know not good from evil. But I, in that I have comprehended the nature of the Good that it is beautiful, and the nature of Evil that it is ugly, and the nature of the wrong-doer himself that it is akin to me, not as partaker of the same blood and seed but of intelligence and a morsel of the Divine, can neither be injured by any of them for no one can involve me in what is debasing nor can I be wroth with my kinsman and hate him. For we have come into being for co-operation, as have the feet, the hands, the eyelids, the rows of upper and lower teeth. Therefore to thwart one another is against Nature; and we do thwart one another by showing resentment and aversion.'
// });

// newPost.save( (err, post) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(post);
//     }
// });

User.findOne({name: 'Seneca the Younger'}, (err, user) => {
    if(err){
        console.log(err);
    }
    else {
        user.posts.push({
            title: 'On Anger', 
            content: 'All our senses ought to be trained to endurance. They are naturally long-suffering, if only the mind desists from weakening them. This should be summoned to give an account of itself every day. Sextius had this habit, and when the day was over and he had retired to his nightly rest, he would put these questions to his soul: "What bad habit have you cured to-day? What fault have you resisted? In what respect are you better?"'
        });
        user.save( (err, user) => {
            if(err){
                console.log(err);
            }
            else {
                console.log(user);
            }
        })
    }
})
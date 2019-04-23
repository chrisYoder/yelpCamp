const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cat_app', { useNewUrlParser: true });

//schema

const catSchema = new mongoose.Schema({
    name: String, 
    age: Number, 
    temperment: String
}); 

const Cat = mongoose.model('Cat', catSchema);

//adding a new cat to the db

// const george = new Cat({
//     name: 'Mrs. Norris', 
//     age: 27, 
//     temperment: 'evil'
// });

// george.save( (err, cat) => {
//     if(err) {
//         console.log('Something whent wrong');
//     } else {
//         console.log('save went well');
//         console.log(cat);
//     }
// });

// Cat.create({
//     name: 'Snow White', 
//     age: '10', 
//     temperment: 'aloof'
// }, (err, cat) => {
//     if(err){
//         console.log(err);
//     } else {
//         console.log('This is the creation log');
//         console.log(cat);
//     }
// });
//retreive all cats from db and console.log each one

Cat.find({}, (err, cats) => {
    if(err){
        console.log('Time to practice your Stoicism because there is an ERROR!!!!');
        console.log(err);
    } else {
        console.log('All the cats');
        console.log(cats);
    }
});

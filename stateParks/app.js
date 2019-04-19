const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const stateParksArray = [
        {name: 'Choke Canyon State Park', image: 'http://photos1.blogger.com/blogger/4619/1296/1600/RockingChair11.jpg'}, 
        {name: 'Government Canyon State Natural Area', image: 'https://s3-media2.fl.yelpcdn.com/bphoto/5a6kw4QcOZLbgewzurPNGQ/348s.jpg'},  
        {name: "Devil's Sinkhole State Natural Area", image: 'https://texashillcountry.com/wp-content/uploads/Sinkhole-bats-2.jpg'},  
    ];

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/stateParks', (req, res) => {
    let newPark = {
        name: req.body.newFriend, 
        image: req.body.newImage
    }
    console.log(newPark);
    console.log(stateParksArray)
    
});

app.get('/stateParks', (req, res) => {
    res.render('stateParks', {stateParks: stateParksArray});
});

app.get('/stateParks/new', (req, res) => {
    res.render('new');
})


app.listen(process.env.PORT, process.env.IP, () => console.log('Server is spinning'));
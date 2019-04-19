const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const campgrounds = [
  { name: 'campground1', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg' },
  { name: 'campground2', image: 'https://farm1.staticflickr.com/82/225912054_690e32830d.jpg' },
  { name: 'campground3', image: 'https://farm6.staticflickr.com/5108/5789045796_27c9217bf2.jpg' }
        ];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  res.render('campgrounds', { campgrounds: campgrounds });
});

app.post('/campgrounds', (req, res) => {
  // get data from the form and add it the campgrounds array
  // redirect back to the campgrounds page
  let name = req.body.name;
  let image = req.body.image;
  let newCampground = {
    name: name,
    image: image
  };

  campgrounds.push(newCampground);
  res.redirect('/campgrounds');
});

app.get('/campgrounds/new', (req, res) => {
  res.render('new.ejs');
})

app.listen(process.env.PORT, process.env.IP, () => console.log('Yelp Camp is running'));

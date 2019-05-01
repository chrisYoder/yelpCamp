const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      Campground = require('./models/campground'),
      Comment    = require('./models/comment'),
      seedDB     = require('./seeds');

   
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true} );
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
// seedDB();






app.get('/', (req, res) => {
  res.render('campgrounds/landing');
});

// INDEX - show all campgrounds
app.get('/campgrounds', (req, res) => {
  // res.render('campgrounds', { campgrounds: campgrounds });
  // get all campgrounds from dv
  Campground.find({}, (err, allCampgrounds) => {
    if(err){
      console.log(err);
    }else{
      res.render('campgrounds/index', {campgrounds: allCampgrounds});
    }
  });
});

// CREATE --> adds new campground to the db
app.post('/campgrounds', (req, res) => {
  // get data from the form and add it the campgrounds array
  // redirect back to the campgrounds page
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.desc;
  let newCampground = {
    name: name,
    image: image,
    description: description
  };

  Campground.create(newCampground, (err, newCampground) => {
    if(err){
      console.log(err);
    }else{
      res.redirect('/campgrounds');
    }
  });
});



//  NEW --> show from to create new campground
app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
});

// SHOW --> show more info about one campground
app.get('/campgrounds/:id', (req, res) => {
  // FIND THE CAMPGROUND WITH PROVIDED ID
  // RENDER THE SHOW TEMPLATE WITH THAT CAMPGROUND
  let id = req.params.id;
  Campground.findById(id).populate('comments').exec( (err, campground) => {
    if(err){
      console.log(err);
    } else {
      res.render('campgrounds/show', {campground: campground});
    }
  });
  
});

// ==========================
// COMMENT ROUTES
// ==========================

app.get('/campgrounds/:id/comments/new', (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if(err) {
      console.log(err);
    } else {
      res.render('comments/new', {campground: campground});
    }
  });
});

app.post("/campgrounds/:id/comments", function(req, res){
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
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
   //create new comment
   //connect new comment to campground
   //redirect campground show page
});


app.listen(process.env.PORT, process.env.IP, () => console.log('Yelp Camp is running'));

# Yelp Camp

### starting out
* Add Landing Page
* Add Campgrounds page that lists all campgrounds

Each campground includes
* name
* image

campground object:

```
[
    {name: nameOfCampground, image: imageOfCampground} 
]
```

### layout and basic styling
* create header and footer partials
* add in bootstrap

### Creating new campgrounds
* set new campground post route
* add in body-parser
* setup route to show form
* add basic unstyled form

### Style the campgrounds page
* add a better header/title
* make campgrounds display in a grid

### style the navbar and form
* Add navbar to all templates
* style the new campground form

### Add Mongoose
* install and configure mongoose
* setup campground model
* use campground model inside of our routes

### Show Page
* Review RESTful routes we've seen so far
* add description to our campground model
* show db.collection.drop()
* add a show route/template

##### RESTful Routes

name  | url       | verb | description|
|-----|-----------|------|------------|
|INDEX | /dogs     | GET  | Display a list of all dogs|
|NEW   | /dogs/new | GET | Displays form to make a new dog|
|CREATE| /dogs | POST | Add a new dog to the db|
|SHOW | /dogs/:id | GET | shows info about one dog|
|


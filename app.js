// Load the framework modules
var express      = require('express');
var app          = express();
var server       = require('http').Server(app);
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var Datastore    = require('nedb');
var config       = require('./libs/config');

// Load the controllers
var HomeController   = require('./controllers/HomeController');

var db = {
  users: new Datastore({ filename: 'storage/users.db', autoload: true })
};


// Set the middleware:

// View directory
app.set('views', __dirname + '/views')

// Set the view engine (EJS)
app.set('view engine', 'ejs');

// Serve static files from the /public directory
app.use(express.static(__dirname + '/public'));

// Enabled the bodyparser middleware for accessing POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable the cookieparser middleware for accessing cookies
app.use(cookieParser(config.cookie_secret));

// Enable the session middleware for managing sessions
app.use(session({
	secret: config.session_secret,
	saveUninitialized: true,
	resave: true
}));

// Routes
app.get('/', HomeController.getIndex);
app.post('/', HomeController.postIndex);


app.get('/users', function(req, res){
    db.users.find({},function(error, users){
        res.json(users);
    });
});

app.get('/users/:id', function(req, res){

  db.users.findOne({ _id: req.params.id }, function (err, user) {
      res.json(user);
  });

});

app.post('/users/create', function(req, res) {
  db.users.insert(req.body, function(err, user) {
    res.json(user);
  });
});


app.put('/users/update/:id', function(req, res) {
  // Set an existing field's value
  db.users.update({ _id: req.params.id }, { $set: { name: req.body.name } }, function (err, numReplaced) {
      res.send(numReplaced + 'aangepast');
  });

});

// Run the server
server.listen(config.port);

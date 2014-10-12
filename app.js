// Load the framework modules
var express      = require('express');
var app          = express();
var server       = require('http').Server(app);
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var config       = require('./libs/config');
var site         = require('./controllers/site');
var tasks         = require('./controllers/tasks');


app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

// Serve static files from the /public directoyr
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

// routes

app.get('/', site.index);

// Tasks
app.get('/tasks', tasks.list);
app.get('/task/:id', tasks.read);
app.post('/task/create', tasks.create);
app.put('/task/:id/update', tasks.update);
app.get('/task/:id/delete', tasks.delete);

// Run the server
server.listen(config.port);

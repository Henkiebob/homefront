// Load the framework modules
var express      = require('express');
var app          = express();
var server       = require('http').Server(app);
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var config       = require('./libs/config');
var site         = require('./controllers/site');
var task         = require('./controllers/tasks');


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
app.get('/tasks', task.list);
app.get('/task/:id', task.view);
app.get('/task/:id/view', task.view);
app.get('/task/:id/edit', task.edit);
app.put('/task/:id/edit', task.update);

// Run the server
server.listen(config.port);

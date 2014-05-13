var fs = require('fs'),
    port = process.env.PORT || 3000;

var express = require('express'),
    app = express(),
    justhtml = require('justhtml');

var dir = __dirname + '/client/';

//Configure
app.configure(function() {
    app.set('views', __dirname + '/client');
    app.set("view options", {layout: false});
	app.engine('html', justhtml.__express);
	app.set('view engine', 'html');
    app.use(express.compress());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express['static'](dir));
    app.use(app.router); 
});

//Index Route
app.get('/', function(req, res){
    res.render('index');
});

//Start Listening
app.listen(port);
console.log("Express server listening on port %d in %s mode", port, app.settings.env);

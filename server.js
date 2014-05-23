var fs = require('fs'),
    port = process.env.PORT || 3000;

var clientDir = __dirname + '/client/',
    express = require('express'),
    app = express(),
    shell = fs.readFileSync(clientDir + 'shell.html', 'UTF8');

var viewEngine = function(filename, options, callback) {
    console.log('reading ' + filename);
    fs.readFile(filename, 'UTF8', function (err, data) {
        callback(null, shell.replace('{{ body }}', data));
    });
};

//Configure
app.configure(function() {
    app.set('views', __dirname + '/client');
    app.set("view options", {layout: false});
	app.engine('html', viewEngine);
	app.set('view engine', 'html');
    app.use(express.compress());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express['static'](clientDir));
});

//Index Route
app.get('/', function(req, res){
    res.render('index');
});

//Start Listening
app.listen(port);
console.log("Express server listening on port %d in %s mode", port, app.settings.env);

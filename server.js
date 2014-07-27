var fs = require('fs'),
    port = process.env.PORT || 3000,
    clientDir = __dirname + '/client/',
    express = require('express'),
    app = express();

//Configure
app.configure(function() {
    app.use(express.compress());
    app.use(express.methodOverride());
    app.use(express['static'](clientDir));    
    app.use(app.router);
});

//Index Route
app.get('/*', function(req, res){
    res.sendfile(clientDir + '/index.html');
});

//Start Listening
app.listen(port);
console.log("Express server listening on port %d in %s mode", port, app.settings.env);

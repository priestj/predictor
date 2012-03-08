/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');

var app = module.exports = express.createServer();


// Configuration
app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    //this has to be before the app.router or the session middleware won't be
    //called until after the routes have fired
    app.use(express.session({
        secret: "hellomum"
    }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));


});

app.configure('development', function () {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));

    mongoose.connect('mongodb://xxxxxx');
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

//Routes now includes mongoose stuff too
require('./routes')(app);

app.listen(process.env.PORT, '0.0.0.0');
//console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
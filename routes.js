module.exports = function(app) {

    //Check user is logged in before they can do owt
    var auth = function(req, res, next) {
            // You would fetch your user from the db
            if (req.session.loggedIn) {
                next();
            }
            else {
                res.writeHead(403);
                res.end('<html><body>Sorry you are not authorized. \n\n<a href="/login">login</a></body></html>');
                // next(new Error('Unauthorized'));
                return;
            }
        };

    //Check for only admin users able to do certain things like delete users
    var andOnlyAdmin = function(req, res, next) {
            // You would fetch your user from the db
            if (req.session.userRole == "admin") {
                next();
            }
            else {
                res.writeHead(403);
                res.end('<html><body>Sorry you are not authorized, this is for administrators only. \n\n<a href="/users">back to users page</a></body></html>');
                // next(new Error('Unauthorized'));
                return;
            }
        };

    //The routes file should not know about the mongoose stuff only the controller should be aware...
    var users = require('./controllers/user_c');
    var authentication = require('./controllers/authentication_c');

    //Hav enow moved a lot of the code out into the Controllers (there is too much still but can now look to seperate out the view code into a view js file.
    // Routes
    app.get('/', function(req, res, next) {
        res.redirect('/login');
    });

    //These routes now reference a users controller file to make this neater
    app.get('/users/create', auth, andOnlyAdmin, users.create);
    app.post('/users/create', auth, andOnlyAdmin, users.save);
    app.get('/users', auth, users.list);
    app.get('/users/update/:userId', auth, andOnlyAdmin, users.update);
    app.post('/users/update', auth, andOnlyAdmin, users.save);
    app.get('/users/delete/:userId', auth, andOnlyAdmin, users.delete);

    app.get('/login', authentication.login);
    app.post('/loginAuthenticate', authentication.loginAuthenticate);


};
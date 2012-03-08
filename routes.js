
module.exports = function(app){
  var auth = function(req, res, next) {
  // You would fetch your user from the db
  if (req.session.loggedIn) {
    next();
  } else {
    res.writeHead(403);
    res.end('<html><body>Sorry you are not authorized. \n\n<a href="/login">login</a></body></html>');
   // next(new Error('Unauthorized'));
   return;
  }
};

  var forAllObjectProperties = function(obj, callback){
    for (var name in obj) {  
      if (obj.hasOwnProperty(name)) {  
        callback(name,obj);  
      }  
      else {  
        console.log('native: '+name); // toString or something else  
      }  
    } 
  };
  
  //The routes file should not know about the mongoose stuff only the controller should be aware...
 var users = require('./controllers/user_c'); 
 var authentication = require('./controllers/authentication_c');
  
  //Hav enow moved a lot of the code out into the Controllers (there is too much still but can now look to seperate out the view code into a view js file.
  // Routes
  app.get('/', function(req, res, next){
                     res.redirect('/login');
          });
  
  //These routes now reference a users controller file to make this neater
  app.get('/users/create', auth, users.create);
  app.post('/users/create', auth,users.save);//would like to remove this so that we only reference save , will need to update save method in users controller
  app.get('/users/update/:userId',auth, users.update);  
  app.post('/users/update', auth, users.save);
  
  app.get('/users/delete/:userId', auth, users.delete);
  

  app.get('/users', auth, users.list);
  app.get('/login', authentication.login);
  app.post('/loginAuthenticate',authentication.loginAuthenticate);
  
  
};
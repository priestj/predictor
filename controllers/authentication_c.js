/* controllers/authentication_c.js
 this file holds all control logic for authentication
 */

//did this offline
//TODO
// 1. Move mongoose reference our to common model object - done, db connection happens at app init
// 2. Merge the save and savecreated just put an if condition in 
// 3. Move out the view aspects (rendering into the views) - partial, see list as example - done now in user_v
var User = require('../models/user_m'); //used to find the user
var View = require('../views/authentication_v');
var Password = require('password');//nicked off web not brilliantly secure but will do for the moment

//below is how we might want the controller to typically behave, the list action shows the controller finding the user
//then calling the view (list) method to build the content, and then using the res.send to send it to the screen
//thi clearly show a nice separation of concerns, need to now update the rest of the controller actions and then
//consider how we might make this more dry....
exports.login = function (req, res, next) {
    View.create(res);
};

exports.loginAuthenticate = function (req, res) {
    User.findOne({
        userName: req.body.login.userName
    }, function (err, userFound) {
        if (err) {
            req.session.newUserName = "Failed to login";
            res.render(req.body.login.userName + " not found");
        }
        else {
            //hold the created user in a session variable so we could display
            //it on the next view (our redirect to users)
            if (userFound) {
               // if ( req.body.login.password == userFound.password){
                if (Password.validate(userFound.password, req.body.login.password)) {

                    req.session.newUserName = userFound.userName;
                    req.session.loggedIn = true;
                    res.redirect('/users');
                }
                else {
                    req.session.newUserName = "Failed to login with " + req.session.newUserName + " Password didn't match";
                    req.session.loggedIn = false;
                    res.redirect('/login');
                }
            }
            else {
                req.session.newUserName = "Failed to login with " + req.session.newUserName;
                req.session.loggedIn = false;
                res.redirect('/login');
            }
        }
    });

};
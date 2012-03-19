/* controllers/users.js
 this file holds all control logic
 */

//TODO

var User = require('../models/user_m');
var View = require('../views/user_v');

// list action
exports.list = function(req, res, next) {
    User.find({}, function(err, docs) {
        if (err) {
            res.send('Error - ' + err);
        }
        else {
            res.send(View.list(docs, req));
        }
    });
};

exports.create = function(req, res, next) {
    View.create(res);
};

exports.update = function(req, res, next) {
    User.findById(req.params.userId, function(err, p) {
        if (err) console.log(err);
        else {
            View.update(res, req, p);
            console.log(p.userName);
        } 
    });        
};

exports.delete = function(req, res, next) {
    User.findById(req.params.userId, function(err, existingUser) {
        if (err) console.log(err);
        else {
            existingUser.remove(function(err) { 
                if (err) {
                    console.log('utoh ' + err);
                }
                else {
                    console.log(existingUser.userName + ' has been deleted');
                    req.session.newUserName = existingUser.userName;
                    res.redirect('/users');
                }
            });
        }
    });
};

exports.save = function(req, res) {
    var postedUser = req.body.user;
    if (postedUser._id) { //if we have an id we must be updating
        User.findById(req.body.user._id, function(err, existingUser) {
            if (err) {
                console.log(err);
            }
            else {
                existingUser.userName = postedUser.userName;
                existingUser.firstName = postedUser.firstName;
                existingUser.secondName = postedUser.secondName;
                existingUser.password = postedUser.password;
                existingUser.email = postedUser.email;
                existingUser.role = postedUser.role;
                existingUser.save(function(err) {
                    if (err) {
                        console.log('utoh ' + err);
                    }
                    else {
                        req.session.newUserName = existingUser.userName;
                        res.redirect('/users');
                    }
                });
            }
        });
    }
    else {
        var webCreatedUser = new User(req.body.user); //create mongoose entitiy with contents from saved form
        webCreatedUser.save(function(err) { //save the user to mongodb
            if (err) {
                console.log('utoh ' + err);
            }
            else {
                console.log(webCreatedUser.userName + ' has been saved');
                req.session.newUserName = webCreatedUser.userName;
                res.redirect('/users');
            }
        });
    }
};
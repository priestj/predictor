/* controllers/users.js
 this file holds all control logic
 */

//TODO
// 1. Move mongoose reference our to common model object - done, db connection happens at app init
// 2. Merge the save and savecreated just put an if condition in 
// 3. Move out the view aspects (rendering into the views) - partial, see list as example - done now in user_v
var User = require('../models/user_m');
var View = require('../views/user_v');

//another library from the dojo team for oo JS with some aspect orientated decorators that is safer than
//dojo.declare see https://github.com/kriszyp/compose for docs
//var Compose = require('compose');
//below is how we might want the controller to typically behave, the list action shows the controller finding the user
//then calling the view (list) method to build the content, and then using the res.send to send it to the screen
//thi clearly show a nice separation of concerns, need to now update the rest of the controller actions and then
//consider how we might make this more dry....
// list action
exports.list = function (req, res, next) {
    User.find({}, function (err, docs) {
        if (err) {
            res.send('Error - ' + err);
        }
        else {
            res.send(View.list(docs, req));
        }
    });
};

exports.delete = function (req, res, next) {
    // req.params.userId
    User.findById(req.params.userId, function (err, p) {
        if (err) console.log(err);
        else {
            p.remove(function (err) { //save the user to mongodb
                if (err) {
                    console.log('utoh ' + err);
                }
                else {
                    console.log(p.userName + ' has been deleted');


                    //hold the created user in a session variable so we could display
                    //it on the next view (our redirect to users)
                    req.session.newUserName = p.userName;
                    res.redirect('/users');
                }
            });
        }
    });
};

exports.create = function (req, res, next) {
    View.create(res);
};


exports.update = function (req, res, next) {
    // req.params.userId
    User.findById(req.params.userId, function (err, p) {
        if (err) console.log(err);
        else {
            View.update(res, req, p);
            console.log(p.userName);
        } //End of else 
    }); //End of db search function call            
};

exports.save = function (req, res) {

if (req.body.user._id){
    
    User.findById(req.body.user._id, function (err, p) {
        if (err){
            console.log(err);
        }else {
            p.userName = req.body.user.userName;
            p.firstName = req.body.user.firstName;
            p.secondName = req.body.user.secondName;
            p.password = req.body.user.password;
            p.email = req.body.user.email;

            p.save(function (err) { //save the user to mongodb
                if (err) {
                    console.log('utoh ' + err);
                }
                else {
                    console.log('save:');
                    console.log(p.userName + ' has been saved');


                    //hold the created user in a session variable so we could display
                    //it on the next view (our redirect to users)
                    req.session.newUserName = p.userName;
                    res.redirect('/users');
                }
            });

        }
    });
}else{
 var webCreatedUser = new User(req.body.user); //create mongoose entitiy with contents from saved form
    webCreatedUser.save(function (err) { //save the user to mongodb
        if (err) {
            console.log('utoh ' + err);
        }
        else {
            console.log(webCreatedUser.userName + ' has been saved');
            //hold the created user in a session variable so we could display
            //it on the next view (our redirect to users)
            req.session.newUserName = webCreatedUser.userName;
            res.redirect('/users');
        }
    });

}
};
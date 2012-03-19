//Mongoose
var mongoose = require('mongoose');
//removed line below as we ant to point to a number of different mongodb instances,
//depending on the environment, dev, prod, test etc.
//mongoose.connect('mongodb://localhost/mydb');
var Password = require('password');

//set up schema and models
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
//Set up a user schema in mongodb
var user = new Schema({
                      userName: String,
                      firstName: String,
                      secondName: String,
                      email: String,
                      password: String,
                      role: {type: String,lowercase: true, enum: ["admin","user"]}});
                      
user.pre('save', function (next) {
  this.password = Password.hash(this.password);
  next();
})
user.pre('init', function (next){
  this.password = this.password;
  next();
})

//Create a model class off the user schema    
module.exports = mongoose.model('User',user);

//would also add triggers etc here (mongoose middleware)!

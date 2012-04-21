var mongoose = require('mongoose'), 
	User = new mongoose.Schema({
    	name : String,
    	joined : Date
	});

mongoose.model('User', User);
var User = mongoose.model('User');


function findAllUsers(callback) {
  User.find({}, function (err, users) {
    callback(users);
  });  
};

module.exports = 
{
    index : function index(req, res){
    	findAllUsers(function(users){
    		res.render("index", { users : users });
     	});
    },
    User : User
}